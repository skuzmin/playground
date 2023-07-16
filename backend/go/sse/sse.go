package sse

import (
	"bufio"
	"encoding/json"
	"fmt"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/valyala/fasthttp"

	"playground/models"
)

func SetupSee(app *fiber.App) {
	app.Get("api/v1/sse", sseHandler)
}

func sseHandler(ctx *fiber.Ctx) error {
	// set necessary headers for SSE
	ctx.Set("Content-Type", "text/event-stream")
	ctx.Set("Cache-Control", "no-cache")
	ctx.Set("Connection", "keep-alive")
	ctx.Set("Transfer-Encoding", "chunked")

	// create stream with writer
	ctx.Context().SetBodyStreamWriter(fasthttp.StreamWriter(func(writer *bufio.Writer) {
		for {
			// create message and stringify it
			msg := models.MessageEvent{Time: time.Now().UnixMilli()}
			jsonData, jsonErr := json.Marshal(msg)

			if jsonErr != nil {
				fmt.Println("Error marshaling JSON:", jsonErr)
				return
			}

			// send message to writter in SSE format {data: MSG}
			fmt.Fprintf(writer, "data: %s\n\n", jsonData)
			// flush writter (to send msg immediately)
			flushErr := writer.Flush()
			if flushErr != nil {
				fmt.Printf("Error while flushing: %v. Closing http connection.\n", flushErr)
				break
			}
			// sleep for 1 second (to send data every second)
			time.Sleep(1 * time.Second)
		}
	}))

	return nil
}
