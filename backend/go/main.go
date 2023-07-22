package main

import (
	"log"

	"github.com/gofiber/fiber/v2"

	"playground/crud"
	"playground/database"
	"playground/imageTransform"
	"playground/sse"
	"playground/ws"
)

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
	//
	imageTransform.SetupImageTransform()
	// start server
	log.Fatal(app.Listen(":7002"))
}
