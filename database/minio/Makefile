build:
	docker-compose build

dev: | build
	docker-compose up

run: | build
	docker-compose up -d

stop:
	docker-compose down

bash:
	docker-compose exec backend bash
