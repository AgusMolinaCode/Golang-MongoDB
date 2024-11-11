package main

import (
	"context"
	"log"
	"os"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

type Todo struct {
    ID        primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
    Title     string             `json:"title"`
    Completed bool               `json:"completed"`
    CreatedAt time.Time          `json:"created_at" bson:"created_at"`
    UpdatedAt time.Time          `json:"updated_at" bson:"updated_at"`
}

var collection *mongo.Collection

func initMongo() {
    err := godotenv.Load()
    if err != nil {
        log.Fatal("Error loading .env file")
    }

    clientOptions := options.Client().ApplyURI(os.Getenv("MONGO_DB"))
    client, err := mongo.Connect(context.TODO(), clientOptions)
    if err != nil {
        log.Fatal(err)
    }

    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    err = client.Ping(ctx, readpref.Primary())
    if err != nil {
        log.Fatal(err)
    }

    collection = client.Database("mydatabase").Collection("todos")
}

func main() {
    initMongo()

    app := fiber.New()

    app.Use(cors.New(cors.Config{
        AllowOrigins: "http://localhost:3000",
        AllowHeaders: "Origin, Content-Type, Accept",
    }))

    app.Use(logger.New())

    app.Get("/todos", getTodos)
    app.Get("/todos/:id", getTodo)
    app.Post("/todos", createTodo)
    app.Put("/todos/:id", updateTodo)
    app.Delete("/todos/:id", deleteTodo)

    log.Fatal(app.Listen(":8080"))
}

func getTodos(c *fiber.Ctx) error {
    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    cursor, err := collection.Find(ctx, bson.M{})
    if err != nil {
        return c.Status(500).SendString(err.Error())
    }
    defer cursor.Close(ctx)

    var todos []Todo
    if err := cursor.All(ctx, &todos); err != nil {
        return c.Status(500).SendString(err.Error())
    }

    return c.JSON(todos)
}

func getTodo(c *fiber.Ctx) error {
    id := c.Params("id")
    objID, err := primitive.ObjectIDFromHex(id)
    if err != nil {
        return c.Status(400).SendString("Invalid ID format")
    }

    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    var todo Todo
    err = collection.FindOne(ctx, bson.M{"_id": objID}).Decode(&todo)
    if err != nil {
        return c.Status(500).SendString(err.Error())
    }

    return c.JSON(todo)
}

func createTodo(c *fiber.Ctx) error {
    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    var todo Todo
    if err := c.BodyParser(&todo); err != nil {
        return c.Status(400).SendString(err.Error())
    }

    todo.ID = primitive.NewObjectID()
    todo.CreatedAt = time.Now()
    todo.UpdatedAt = time.Now()

    result, err := collection.InsertOne(ctx, todo)
    if err != nil {
        return c.Status(500).SendString(err.Error())
    }

    return c.Status(201).JSON(result)
}

func updateTodo(c *fiber.Ctx) error {
    id := c.Params("id")
    objID, err := primitive.ObjectIDFromHex(id)
    if err != nil {
        return c.Status(400).SendString("Invalid ID format")
    }

    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    var todo Todo
    if err := c.BodyParser(&todo); err != nil {
        return c.Status(400).SendString(err.Error())
    }

    todo.UpdatedAt = time.Now()

    update := bson.M{
        "$set": todo,
    }

    _, err = collection.UpdateOne(ctx, bson.M{"_id": objID}, update)
    if err != nil {
        return c.Status(500).SendString(err.Error())
    }

    return c.SendStatus(200)
}

func deleteTodo(c *fiber.Ctx) error {
    id := c.Params("id")
    objID, err := primitive.ObjectIDFromHex(id)
    if err != nil {
        return c.Status(400).SendString("Invalid ID format")
    }

    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    _, err = collection.DeleteOne(ctx, bson.M{"_id": objID})
    if err != nil {
        return c.Status(500).SendString(err.Error())
    }

    return c.SendStatus(200)
}