package models

import (
	"errors"
	"log"

	"github.com/gofiber/contrib/websocket"
	"golang.org/x/exp/slices"
)

// RABBITMQ

type RabbitMQPayload struct {
	Data map[string]string `json:"data"`
}

// CRUD
type Item struct {
	ID   uint   `json:"id" gorm:"primaryKey"`
	Text string `json:"text"`
}

type MessageEvent struct {
	Time int64 `json:"time"`
}

// WS
const (
	COLOR  = "color"
	NUMBER = "number"
	CANCEL = "cancel"
)

type WsPayload struct {
	Event string `json:"event"`
	Data  string `json:"data"`
}

type PubSub struct {
	Topics map[string][]*websocket.Conn
}

func (pubSub PubSub) AddClientToTopic(topic string, client *websocket.Conn) {
	// check if client not added to the list to avoid message duplicates
	index := slices.IndexFunc(pubSub.Topics[topic], func(c *websocket.Conn) bool { return c == client })
	if index == -1 {
		pubSub.Topics[topic] = append(pubSub.Topics[topic], client)
	}
}

func (pubSub PubSub) RemoveClientFromAllTopics(client *websocket.Conn) {
	for topic := range pubSub.Topics {
		pubSub.RemoveClientFromTopic(topic, client)
	}
}

func (pubSub PubSub) RemoveClientFromTopic(topic string, client *websocket.Conn) error {
	topics, ok := pubSub.Topics[topic]
	if !ok {
		return errors.New("topic not found")
	}

	index := slices.IndexFunc(topics, func(c *websocket.Conn) bool { return c == client })
	if index == -1 {
		return errors.New("client in the current topic not found")
	}

	pubSub.Topics[topic] = slices.Delete(topics, index, index+1)
	return nil
}

func (pubSub PubSub) Publish(topic string, msg string) error {
	topics, ok := pubSub.Topics[topic]
	if !ok {
		return errors.New("topic not found")
	}

	for _, client := range topics {
		err := client.WriteMessage(websocket.TextMessage, []byte(msg))
		if err != nil {
			log.Println("Write to socket: ", err)
		}
	}

	return nil
}
