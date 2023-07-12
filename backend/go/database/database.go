package database

import (
	"log"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

type DbInstance struct {
	Db *gorm.DB
}

var Database DbInstance

func ConnectDb() {
	db, err := gorm.Open(postgres.Open("host=localhost port=5432 user=adm1n dbname=playground password=Passw0rd sslmode=disable"), &gorm.Config{})

	if err != nil {
		log.Fatal("Failed to connect to db! \n", err.Error())
		os.Exit(2)
	}

	log.Println("Connected to the db successfully")
	db.Logger = logger.Default.LogMode(logger.Info)

	Database = DbInstance{Db: db}
}
