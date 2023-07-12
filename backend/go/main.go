package main

import (
	"log"

	"github.com/gofiber/fiber/v2"

	"playground/database"
	"playground/models"
)

func main() {
	app := fiber.New()
	database.ConnectDb()

	app.Get("api/v1/main", func(context *fiber.Ctx) error {
		items := []models.Item{}
		database.Database.Db.Find(&items)
		return context.Status(fiber.StatusOK).JSON(items)
	})

	app.Post("api/v1/main", func(context *fiber.Ctx) error {
		text := string(context.Body())
		if text == "" {
			return context.SendStatus(fiber.StatusBadRequest)
		}
		newItem := models.Item{Text: text}
		database.Database.Db.Create(&newItem)

		return context.Status(fiber.StatusOK).JSON(newItem)
	})

	app.Put("api/v1/main/:id", func(context *fiber.Ctx) error {
		id := context.Params("id")
		item := models.Item{}
		var newItem models.Item

		if err := context.BodyParser(&newItem); err != nil {
			return context.SendStatus(fiber.StatusBadRequest)
		}
		database.Database.Db.Find(&item, "id = ?", id)
		item.Text = newItem.Text

		database.Database.Db.Save(&item)

		return context.Status(fiber.StatusOK).JSON(item)
	})

	app.Delete("api/v1/main/:id", func(context *fiber.Ctx) error {
		id := context.Params("id")
		database.Database.Db.Delete(&models.Item{}, "id = ?", id)
		return context.SendStatus(fiber.StatusNoContent)
	})

	log.Fatal(app.Listen(":7002"))
}
