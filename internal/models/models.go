package models

import (
    "time"

    "go.mongodb.org/mongo-driver/bson/primitive"
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