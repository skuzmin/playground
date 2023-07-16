package main

import (
	"log"

	"github.com/gofiber/fiber/v2"

	"playground/crud"
	"playground/database"
	"playground/sse"
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
	// start server
	log.Fatal(app.Listen(":7002"))
}
