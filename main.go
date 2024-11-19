package main

import (
    "context"
    "log"
    "os"
    "time"

    "github.com/gofiber/fiber/v2"
    "github.com/gofiber/fiber/v2/middleware/cors"
    "github.com/gofiber/fiber/v2/middleware/logger"
    jwtware "github.com/gofiber/jwt/v3"
    "github.com/joho/godotenv"
    "github.com/golang-jwt/jwt/v4"
    "golang.org/x/crypto/bcrypt"
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
    UserID    string             `json:"user_id" bson:"user_id"`
}

type User struct {
    ID       primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
    Username string             `json:"username" bson:"username"`
    Password string             `json:"password" bson:"password"`
}

var collection *mongo.Collection
var userCollection *mongo.Collection

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
    userCollection = client.Database("mydatabase").Collection("users")
}

func main() {
    initMongo()

    app := fiber.New()

    app.Use(cors.New(cors.Config{
        AllowOrigins: "http://localhost:3000",
        AllowHeaders: "Origin, Content-Type, Accept, Authorization",
    }))

    app.Use(logger.New())

    app.Post("/register", register)
    app.Post("/login", login)

    app.Use("/todos", jwtware.New(jwtware.Config{
        SigningKey: []byte("secret"),
    }))

    app.Get("/todos", getTodos)
    app.Get("/todos/:id", getTodo)
    app.Post("/todos", createTodo)
    app.Put("/todos/:id", updateTodo)
    app.Delete("/todos/:id", deleteTodo)

    log.Fatal(app.Listen(":8080"))
}

func register(c *fiber.Ctx) error {
    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    var user User
    if err := c.BodyParser(&user); err != nil {
        return c.Status(400).SendString(err.Error())
    }

    // Hash the password
    hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
    if err != nil {
        return c.Status(500).SendString(err.Error())
    }
    user.Password = string(hashedPassword)

    user.ID = primitive.NewObjectID()

    _, err = userCollection.InsertOne(ctx, user)
    if err != nil {
        return c.Status(500).SendString(err.Error())
    }

    return c.Status(201).JSON(user)
}

func login(c *fiber.Ctx) error {
    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    var input User
    if err := c.BodyParser(&input); err != nil {
        return c.Status(400).SendString(err.Error())
    }

    var user User
    err := userCollection.FindOne(ctx, bson.M{"username": input.Username}).Decode(&user)
    if err != nil {
        return c.Status(401).SendString("Invalid username or password")
    }

    // Compare the password
    if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password)); err != nil {
        return c.Status(401).SendString("Invalid username or password")
    }

    // Create JWT token
    token := jwt.New(jwt.SigningMethodHS256)
    claims := token.Claims.(jwt.MapClaims)
    claims["id"] = user.ID.Hex()
    claims["username"] = user.Username
    claims["exp"] = time.Now().Add(time.Hour * 5).Unix()

    t, err := token.SignedString([]byte("secret"))
    if err != nil {
        return c.Status(500).SendString(err.Error())
    }

    return c.JSON(fiber.Map{"token": t})
}

func getTodos(c *fiber.Ctx) error {
    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    userID := c.Locals("user").(*jwt.Token).Claims.(jwt.MapClaims)["id"].(string)

    cursor, err := collection.Find(ctx, bson.M{"user_id": userID})
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

    userID := c.Locals("user").(*jwt.Token).Claims.(jwt.MapClaims)["id"].(string)
    todo.UserID = userID
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

    userID := c.Locals("user").(*jwt.Token).Claims.(jwt.MapClaims)["id"].(string)
    todo.UpdatedAt = time.Now()

    update := bson.M{
        "$set": bson.M{
            "title":      todo.Title,
            "completed":  todo.Completed,
            "updated_at": todo.UpdatedAt,
            "user_id":    userID,
        },
    }

    _, err = collection.UpdateOne(ctx, bson.M{"_id": objID, "user_id": userID}, update)
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

    userID := c.Locals("user").(*jwt.Token).Claims.(jwt.MapClaims)["id"].(string)

    _, err = collection.DeleteOne(ctx, bson.M{"_id": objID, "user_id": userID})
    if err != nil {
        return c.Status(500).SendString(err.Error())
    }

    return c.SendStatus(200)
}