package config

import (
    "context"
    "log"
    "os"
    "time"

    "github.com/joho/godotenv"
    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"
    "go.mongodb.org/mongo-driver/mongo/readpref"
)

var Collection *mongo.Collection
var UserCollection *mongo.Collection

func InitMongo() {
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

    Collection = client.Database("mydatabase").Collection("todos")
    UserCollection = client.Database("mydatabase").Collection("users")
}