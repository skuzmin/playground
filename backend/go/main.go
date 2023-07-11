package main

import (
	"log"
	"math/rand"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"golang.org/x/exp/slices"
)

type GridItem struct {
	ID   string `json:"id"`
	Text string `json:"text"`
}

var mock = []GridItem{
	{ID: "1", Text: "test 1"},
	{ID: "2", Text: "test 2"},
}

func main() {
	app := fiber.New()

	app.Get("api/v1/main", func(context *fiber.Ctx) error {
		return context.JSON(mock)
	})

	app.Post("api/v1/main", func(context *fiber.Ctx) error {
		var text string
		if err := context.BodyParser(&text); err != nil {
			return fiber.NewError(fiber.StatusBadRequest, err.Error())
		}
		newItem := GridItem{
			ID:   strconv.Itoa(rand.Intn(100)),
			Text: text,
		}
		mock = append(mock, newItem)
		return context.JSON(newItem)
	})

	app.Put("api/v1/main/:id", func(context *fiber.Ctx) error {
		id := context.Params("id")
		data := GridItem{}
		if err := context.BodyParser(&data); err != nil {
			return context.SendStatus(400)
		}

		index := slices.IndexFunc(mock, func(item GridItem) bool { return item.ID == id })
		if index != -1 {
			return context.SendStatus(400)
		}

		mock[index] = data
		return context.JSON(mock[index])
	})

	app.Delete("api/v1/main/:id", func(context *fiber.Ctx) error {
		id := context.Params("id")
		index := slices.IndexFunc(mock, func(item GridItem) bool { return item.ID == id })
		mock = slices.Delete(mock, index, index+1)
		return context.Send(nil)
	})

	log.Fatal(app.Listen(":7002"))
}
