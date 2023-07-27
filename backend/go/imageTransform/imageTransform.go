package imageTransform

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"image"
	"image/jpeg"
	"image/png"
	"os"
	"time"

	"github.com/minio/minio-go/v7"
	"github.com/minio/minio-go/v7/pkg/credentials"
	"github.com/streadway/amqp"
	"golang.org/x/image/draw"

	"playground/errorHandler"
	"playground/models"
)

const (
	QUEUE_NAME       = "images_queue"
	REPLY_QUEUE_NAME = "images_queue_reply"
	BUCKET_NAME      = "images"
)

func ListenForImages() {
	go func() {
		// Connect to RabbitMQ
		connection, err := amqp.Dial(os.Getenv("RABBIT_MQ_HOST"))
		errorHandler.FailOnError(err, "Failed to connect to RabbitMQ")
		defer connection.Close()

		// Create a channel
		channel, err := connection.Channel()
		errorHandler.FailOnError(err, "Failed to open a channel")
		defer channel.Close()

		// Declare the queue
		queue, err := channel.QueueDeclare(QUEUE_NAME, true, false, false, false, nil)
		errorHandler.FailOnError(err, "Failed to declare a queue")

		replyQueue, err := channel.QueueDeclare(REPLY_QUEUE_NAME, false, false, false, false, nil)
		errorHandler.FailOnError(err, "Failed to declare a reply queue")

		// Consume messages from the queue
		msgs, err := channel.Consume(queue.Name, "", true, false, false, false, nil)
		errorHandler.FailOnError(err, "Failed to register a consumer")

		// Loop to receive and print messages
		for msg := range msgs {
			var payload models.RabbitMQPayload
			err := json.Unmarshal(msg.Body, &payload)
			errorHandler.FailOnError(err, "Failed to parse message body")

			err = transformImage(BUCKET_NAME, payload.Data["name"])
			errorHandler.FailOnError(err, "Transform image error")

			// create response for nest, because its serializer will die
			response := models.RabbitMqResponse{Result: "done"}
			jsonResponse, err := json.Marshal(response)
			errorHandler.FailOnError(err, "Broken json")

			err = channel.Publish("", replyQueue.Name, false, false, amqp.Publishing{
				CorrelationId: msg.CorrelationId,
				Body:          jsonResponse,
			})
			errorHandler.FailOnError(err, "Failed to send response")
		}
	}()
}

func transformImage(bucketName string, fileName string) error {
	// Create a context with a timeout
	ctx, cancel := context.WithTimeout(context.Background(), 60*time.Second)
	defer cancel()

	// Create minio client
	client, err := minio.New(os.Getenv("MINIO_HOST"), &minio.Options{
		Creds: credentials.NewStaticV4(os.Getenv("MINIO_LOGIN"), os.Getenv("MINIO_PASSWORD"), ""),
	})
	if err != nil {
		return fmt.Errorf("failed to initialize MinIO client: %w", err)
	}

	// Get file from Minio
	file, err := client.GetObject(ctx, bucketName, fileName, minio.GetObjectOptions{})
	if err != nil {
		return fmt.Errorf("failed to get object from bucket: %w", err)
	}
	defer file.Close()

	// Read and resize image
	var buf bytes.Buffer
	if _, err := buf.ReadFrom(file); err != nil {
		return fmt.Errorf("failed to read file content: %w", err)
	}

	img, format, err := image.Decode(bytes.NewReader(buf.Bytes()))
	if err != nil {
		return fmt.Errorf("failed to decode image: %w", err)
	}

	resizedImg := resizeImage(img, 60, 60)
	buf.Reset()

	switch format {
	case "jpeg":
		if err := jpeg.Encode(&buf, resizedImg, nil); err != nil {
			return fmt.Errorf("failed to encode resized image as JPEG: %w", err)
		}
	case "png":
		if err := png.Encode(&buf, resizedImg); err != nil {
			return fmt.Errorf("failed to encode resized image as PNG: %w", err)
		}
	default:
		return fmt.Errorf("unsupported image format: %s", format)
	}

	// Upload image to Minio
	if _, err := client.PutObject(ctx, bucketName, fileName, &buf, int64(buf.Len()), minio.PutObjectOptions{}); err != nil {
		return fmt.Errorf("failed to upload resized image: %w", err)
	}

	fmt.Printf("Image resized and saved successfully to %s/%s\n", bucketName, fileName)
	return nil
}

func resizeImage(img image.Image, width int, height int) image.Image {
	resizedImg := image.NewRGBA(image.Rect(0, 0, width, height))
	draw.CatmullRom.Scale(resizedImg, resizedImg.Bounds(), img, img.Bounds(), draw.Over, nil)
	return resizedImg
}
