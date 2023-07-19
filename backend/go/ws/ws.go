package ws

import (
	"log"

	"github.com/gofiber/contrib/websocket"
	"github.com/gofiber/fiber/v2"
)

func SetupWs(app *fiber.App) {
	app.Get("/ws", websocket.New(handleWebSocket))
}

func handleWebSocket(connection *websocket.Conn) {
	for {
		msgType, msg, err := connection.ReadMessage()
		if err != nil {
			log.Println("Read: ", err)
			break
		}
		log.Println("Message type: ", msgType)
		err = connection.WriteMessage(msgType, msg)
		if err != nil {
			log.Println("Write: ", err)
			break
		}
	}
}
