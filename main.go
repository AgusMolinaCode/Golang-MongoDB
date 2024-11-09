package main

import (
    "context"
    "log"
    "os"
    "time"

    "github.com/gofiber/fiber/v2"
    "github.com/joho/godotenv"
    "github.com/gofiber/fiber/v2/middleware/logger"
    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"
    "go.mongodb.org/mongo-driver/mongo/readpref"
)

type Todo struct {
    ID        string `json:"id,omitempty" bson:"_id,omitempty"`
    Title     string `json:"title"`
    Completed bool   `json:"completed"`
}

var collection *mongo.Collection

func initMongo() {
    err := godotenv.Load()
    if err != nil {
        log.Fatal("Error loading .env file")
    }

    clientOptions := options.Client().ApplyURI(os.Getenv("MONGO_URI"))
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

    collection = client.Database(os.Getenv("MONGO_DB")).Collection("todos")
}

func main() {
    initMongo()

    app := fiber.New()
    app.Use(logger.New())

    app.Get("/todos", getTodos)
    app.Get("/todos/:id", getTodo)
    app.Post("/todos", createTodo)
    app.Put("/todos/:id", updateTodo)
    app.Delete("/todos/:id", deleteTodo)

    log.Fatal(app.Listen(":3000"))
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
    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    var todo Todo
    err := collection.FindOne(ctx, bson.M{"_id": id}).Decode(&todo)
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

    result, err := collection.InsertOne(ctx, todo)
    if err != nil {
        return c.Status(500).SendString(err.Error())
	}

    return c.Status(201).JSON(result)
}

func updateTodo(c *fiber.Ctx) error {
    id := c.Params("id")
    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    var todo Todo
    if err := c.BodyParser(&todo); err != nil {
        return c.Status(400).SendString(err.Error())
    }

    update := bson.M{
        "$set": todo,
    }

    _, err := collection.UpdateOne(ctx, bson.M{"_id": id}, update)
    if err != nil {
        return c.Status(500).SendString(err.Error())
    }

    return c.SendStatus(200)
}

func deleteTodo(c *fiber.Ctx) error {
    id := c.Params("id")
    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    _, err := collection.DeleteOne(ctx, bson.M{"_id": id})
    if err != nil {
        return c.Status(500).SendString(err.Error())
    }

    return c.SendStatus(200)
}