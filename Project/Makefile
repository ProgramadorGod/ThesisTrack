build:
	docker-compose build

up:
	docker-compose up

down: 
	docker-compose down

run:
	docker-compose up

bash:
	docker compose run --rm web bash

migrate:
	docker compose run --rm web python manage.py migrate

test:
	docker compose run --rm web coverage run manage.py test

coverage:
	docker compose run --rm web coverage html

shell:
	docker compose run --rm web python manage.py shell

startapp:
	@$(eval APP_NAME := $(word 2,$(MAKECMDGOALS)))
	docker compose run --rm web python manage.py startapp $(APP_NAME)

migrations:
	docker compose run --rm web python manage.py makemigrations

createsuperuser:
	docker compose run --rm web python manage.py createsuperuser

check:
	docker compose run --rm web python manage.py check
