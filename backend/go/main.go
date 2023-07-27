package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"

	"playground/crud"
	"playground/database"
	"playground/errorHandler"

	"playground/imageTransform"
	"playground/sse"
	"playground/ws"
)

func init() {
	err := godotenv.Load()
	errorHandler.FailOnError(err, "Error loading .env file")
}

func main() {
	// create app
	app := fiber.New()
	// connect to db
	database.ConnectDb()
	// init crud routes
	crud.SetupRoutes(app)
	// init sse
	sse.SetupSee(app)
	// init ws
	ws.SetupWs(app)
	// image transform (minio + rabbitmq)
	imageTransform.ListenForImages()
	log.Fatal(app.Listen(":7002"))
}
