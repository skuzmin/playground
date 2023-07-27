package ws

import (
	"encoding/json"
	"fmt"
	"log"
	"math/rand"
	"playground/errorHandler"
	"playground/models"
	"time"

	"github.com/gofiber/contrib/websocket"
	"github.com/gofiber/fiber/v2"
)

var pubSub = models.PubSub{
	Topics: make(map[string][]*websocket.Conn),
}

func SetupWs(app *fiber.App) {
	app.Get("/ws", websocket.New(handleWebSocket))
	// init pubsub topics
	pubSub.Topics[models.COLOR] = []*websocket.Conn{}
	pubSub.Topics[models.NUMBER] = []*websocket.Conn{}
	// start broadcasting data in all topics
	broadcast(pubSub)
}

func handleWebSocket(client *websocket.Conn) {
	var payload models.WsPayload

	defer func() {
		// Notify when the client disconnects
		fmt.Println("Client disconnected")
		client.Close()
		pubSub.RemoveClientFromAllTopics(client)
	}()

	for {
		// read and convert data []byte to struct and validate all annoying cases
		msgType, msg, err := client.ReadMessage()
		errorHandler.FailOnError(err, "Read error")

		err = json.Unmarshal(msg, &payload)
		errorHandler.FailOnError(err, "Wrong payload")

		if msgType != websocket.TextMessage {
			log.Printf("Not supported message type")
			return
		}
		// subscribe to topic: color, number, cancel
		switch payload.Data {
		case models.COLOR:
			pubSub.AddClientToTopic(payload.Data, client)
		case models.NUMBER:
			pubSub.AddClientToTopic(payload.Data, client)
		case models.CANCEL:
			pubSub.RemoveClientFromAllTopics(client)
		}

	}
}

func broadcast(pubSub models.PubSub) {
	// broadcast an infinite number of times to all topics that were defined in the SetupWs function at a 2-second interval
	go func() {
		for {
			color := getRandomColor()
			err := pubSub.Publish(models.COLOR, color)
			errorHandler.FailOnError(err, "Publish (color)")

			number := getRandomNumber()
			err = pubSub.Publish(models.NUMBER, number)
			errorHandler.FailOnError(err, "Publish (number)")

			time.Sleep(2 * time.Second)
		}
	}()
}

func getRandomColor() string {
	rand.Seed(time.Now().UnixNano())
	r := rand.Intn(256)
	g := rand.Intn(256)
	b := rand.Intn(256)
	return fmt.Sprintf("%02X%02X%02X", r, g, b)
}

func getRandomNumber() string {
	rand.Seed(time.Now().UnixNano())
	randomNumber := rand.Intn(100) + 1
	return fmt.Sprint(randomNumber)
}
