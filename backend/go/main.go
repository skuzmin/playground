package main

import (
	"log"

	"github.com/gofiber/fiber/v2"

	"playground/crud"
	"playground/database"
)

func main() {
	// create app
	app := fiber.New()
	// connect to db
	database.ConnectDb()
	// init crud routes
	crud.SetupRoutes(app)
	// start server
	log.Fatal(app.Listen(":7002"))
}
