package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"

	"playground/crud"
	"playground/database"

	// "playground/imageTransform"
	"playground/minio"
	"playground/sse"
	"playground/ws"
)

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
}

func main() {
	log.Println("MAIN")
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
	//
	// imageTransform.SetupImageTransform()
	//
	minio.Run()
	// start server
	log.Fatal(app.Listen(":7002"))
}
