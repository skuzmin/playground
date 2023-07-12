package models

type Item struct {
	ID   uint   `json:"id" gorm:"primaryKey"`
	Text string `json:"text"`
}
