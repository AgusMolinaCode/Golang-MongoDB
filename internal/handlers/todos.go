package handlers

import (
	"context"
	"time"

	"github.com/AgusMolinaCode/Golang-MongoDB/internal/config"
	"github.com/AgusMolinaCode/Golang-MongoDB/internal/models"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func GetTodos(c *fiber.Ctx) error {
    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    userID := c.Locals("user").(*jwt.Token).Claims.(jwt.MapClaims)["id"].(string)

    cursor, err := config.Collection.Find(ctx, bson.M{"user_id": userID})
    if err != nil {
        return c.Status(500).SendString(err.Error())
    }
    defer cursor.Close(ctx)

    var todos []models.Todo
    if err := cursor.All(ctx, &todos); err != nil {
        return c.Status(500).SendString(err.Error())
    }

    return c.JSON(todos)
}

func GetTodo(c *fiber.Ctx) error {
    id := c.Params("id")
    objID, err := primitive.ObjectIDFromHex(id)
    if err != nil {
        return c.Status(400).SendString("Invalid ID format")
    }

    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    var todo models.Todo
    err = config.Collection.FindOne(ctx, bson.M{"_id": objID}).Decode(&todo)
    if err != nil {
        return c.Status(500).SendString(err.Error())
    }

    return c.JSON(todo)
}

func CreateTodo(c *fiber.Ctx) error {
    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    var todo models.Todo
    if err := c.BodyParser(&todo); err != nil {
        return c.Status(400).SendString(err.Error())
    }

    userID := c.Locals("user").(*jwt.Token).Claims.(jwt.MapClaims)["id"].(string)
    todo.UserID = userID
    todo.ID = primitive.NewObjectID()
    todo.CreatedAt = time.Now()
    todo.UpdatedAt = time.Now()

    _, err := config.Collection.InsertOne(ctx, todo)
    if err != nil {
        return c.Status(500).SendString(err.Error())
    }

    return c.Status(201).JSON(todo)
}

func UpdateTodo(c *fiber.Ctx) error {
    id := c.Params("id")
    objID, err := primitive.ObjectIDFromHex(id)
    if err != nil {
        return c.Status(400).SendString("Invalid ID format")
    }

    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    var todo models.Todo
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

    _, err = config.Collection.UpdateOne(ctx, bson.M{"_id": objID, "user_id": userID}, update)
    if err != nil {
        return c.Status(500).SendString(err.Error())
    }

    return c.SendStatus(200)
}

func DeleteTodo(c *fiber.Ctx) error {
    id := c.Params("id")
    objID, err := primitive.ObjectIDFromHex(id)
    if err != nil {
        return c.Status(400).SendString("Invalid ID format")
    }

    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    userID := c.Locals("user").(*jwt.Token).Claims.(jwt.MapClaims)["id"].(string)

    _, err = config.Collection.DeleteOne(ctx, bson.M{"_id": objID, "user_id": userID})
    if err != nil {
        return c.Status(500).SendString(err.Error())
    }

    return c.SendStatus(200)
}