package crud

import (
	"context"
	"playground/db/models"

	"github.com/gofiber/fiber/v2"
	"github.com/volatiletech/sqlboiler/v4/boil"
)

func SetupRoutes(app *fiber.App) {
	app.Get("api/v1/main", getItems)
	app.Post("api/v1/main", createItem)
	app.Put("api/v1/main/:id", updateItem)
	app.Delete("api/v1/main/:id", deleteItem)
}

func getItems(ctx *fiber.Ctx) error {
	// create structure for items
	// items := []models.Item{}
	// get items from db and put them into scructure
	// database.Database.Find(&items)
	items, err := models.Items().All(context.Background(), boil.GetContextDB())
	if err != nil {
		return ctx.SendStatus(fiber.StatusBadRequest)
	}
	// return response with items
	return ctx.Status(fiber.StatusOK).JSON(items)
}

func createItem(ctx *fiber.Ctx) error {
	// get text for new item from request body
	text := string(ctx.Body())
	// check if request is not empty
	if text == "" {
		return ctx.SendStatus(fiber.StatusBadRequest)
	}
	// create new structure/ new empty item
	newItem := models.Item{Text: text}
	// create record in db and put it into newItem
	// database.Database.Create(&newItem)
	// return response with new item
	return ctx.Status(fiber.StatusOK).JSON(newItem)
}

func updateItem(ctx *fiber.Ctx) error {
	// get item ID from url
	// id := ctx.Params("id")
	// create item update from body and validate it
	var newItem models.Item
	if err := ctx.BodyParser(&newItem); err != nil {
		return ctx.SendStatus(fiber.StatusBadRequest)
	}
	// create empty item/structure and fill it with data from db(find item for update by id)
	item := models.Item{}
	// database.Database.Find(&item, "id = ?", id)
	// update item fields
	item.Text = newItem.Text
	// save item to db (update)
	// database.Database.Save(&item)
	// return response with updated item
	return ctx.Status(fiber.StatusOK).JSON(item)
}

func deleteItem(ctx *fiber.Ctx) error {
	// get item ID from url
	// id := ctx.Params("id")
	// delete item from db dy id
	// database.Database.Delete(&models.Item{}, "id = ?", id)
	// send successful response (item deleted)
	return ctx.SendStatus(fiber.StatusNoContent)
}
