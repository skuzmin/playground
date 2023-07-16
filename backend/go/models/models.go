package models

type Item struct {
	ID   uint   `json:"id" gorm:"primaryKey"`
	Text string `json:"text"`
}

type MessageEvent struct {
	Time int64 `json:"time"`
}
