package database

import (
	"fmt"
	"log"
	"os"
	"time"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var Database *gorm.DB

func ConnectDb() {
	connectionString := getConnectionString()
	db, err := gorm.Open(postgres.Open(connectionString), &gorm.Config{
		PrepareStmt:            true,
		SkipDefaultTransaction: true,
	})
	if err != nil {
		log.Fatal("Failed to connect to db! \n", err.Error())
		os.Exit(2)
	}

	sqlDB, err := db.DB()
	if err != nil {
		log.Fatal("Failed to retrieve underlying SQL database! \n", err.Error())
		os.Exit(2)
	}
	// Set connection pool configuration
	maxIdleConnections := 100 // Maximum number of idle connections in the pool
	maxOpenConnections := 300 // Maximum number of open connections in the pool
	sqlDB.SetMaxIdleConns(maxIdleConnections)
	sqlDB.SetMaxOpenConns(maxOpenConnections)
	sqlDB.SetConnMaxLifetime(time.Hour)

	log.Println("Connected to the db successfully!")
	db.Logger = logger.Default.LogMode(logger.Info)

	Database = db
}

func getConnectionString() string {
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbUser := os.Getenv("DB_USER")
	dbName := os.Getenv("DB_NAME")
	dbPassword := os.Getenv("DB_PASSWORD")

	return fmt.Sprintf("host=%s port=%s user=%s dbname=%s password=%s sslmode=disable", dbHost, dbPort, dbUser, dbName, dbPassword)
}
