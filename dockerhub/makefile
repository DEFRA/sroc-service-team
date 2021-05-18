# Usage:
# make          # same as up
# make up       # pull the images (if not done so already) and start the containers
# make down     # will stop (if not already stopped) all running containers and remove them
# make clean    # same as clean but will also remove any custom images and the volumes we've created
# make open     # open a shell on the running API container
# make migrate  # run latest database migrations. You'll need to do this each time you pull a new image down
# make seed     # run latest database seeds. You may need to do this after pulling a new image down
# make run      # start a new container and open an interactive shell to it

.DEFAULT_GOAL := up

up:
	docker-compose up

down:
	docker-compose down

clean:
	docker-compose down --rmi local -v

open:
	docker-compose exec app /bin/sh

migrate:
	docker-compose exec app npm run migrate-db

seed:
	docker-compose exec app npm run seed-db

run:
	docker run -it --env-file .env environmentagency/sroc-charging-module-api:latest /bin/sh
