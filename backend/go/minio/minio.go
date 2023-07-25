package minio

import (
	"bytes"
	"context"
	"fmt"
	"image"
	"image/jpeg"
	"image/png"
	"os"
	"time"

	"github.com/minio/minio-go/v7"
	"github.com/minio/minio-go/v7/pkg/credentials"
	"golang.org/x/image/draw"
)

func Run() {
	err := transformImage("images", "1.png")
	if err != nil {
		fmt.Println(err)
	}
}

func transformImage(bucketName string, fileName string) error {
	// Create a context with a timeout
	ctx, cancel := context.WithTimeout(context.Background(), 60*time.Second)
	defer cancel()

	// create minio client
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
