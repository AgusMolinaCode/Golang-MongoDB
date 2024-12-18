package main

import (
	"log"

	"github.com/AgusMolinaCode/Golang-MongoDB/internal/config"
	"github.com/AgusMolinaCode/Golang-MongoDB/internal/handlers"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	jwtware "github.com/gofiber/jwt/v3"
)

func main() {
	config.InitMongo()

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:3000, https://next-js-todo-list-frontend.vercel.app, https://nextjs-todolist-frontend-production.up.railway.app",
		AllowHeaders: "Origin, Content-Type, Accept, Authorization",
	}))

	app.Use(logger.New())

	app.Post("/register", handlers.Register)
	app.Post("/login", handlers.Login)

	app.Use("/todos", jwtware.New(jwtware.Config{
		SigningKey: []byte("secret"),
	}))

	app.Get("/todos", handlers.GetTodos)
	app.Get("/todos/:id", handlers.GetTodo)
	app.Post("/todos", handlers.CreateTodo)
	app.Put("/todos/:id", handlers.UpdateTodo)
	app.Delete("/todos/:id", handlers.DeleteTodo)

	log.Fatal(app.Listen(":8080"))
}
