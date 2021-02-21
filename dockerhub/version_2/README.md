# SROC Charging module API

> A work in progress version 2 of the original [Charging Module API](https://github.com/DEFRA/charging-module-api)

This API provides an interface for calculating charges, queuing transactions and generating transaction files used to produce invoices.

The images are built from [sroc-charging-module-api](https://github.com/defra/sroc-charging-module-api) automatically. They are provided here to allow teams wishing to develop clients for the API to run it locally.

You can find more details about the SROC delivery team which maintain the API at <https://github.com/DEFRA/sroc-service-team>.

## How to use this image

The following is an example [docker-compose](https://docs.docker.com/compose/) you can use to bring up an environment

```yml
version: '3.8'

services:
  db:
    image: postgres:12-alpine
    volumes:
      - cma_api_db_volume:/var/lib/postgresql/data
    ports:
      - "54322:5432"
    environment:
      POSTGRES_USER: "${POSTGRES_USER}"
      POSTGRES_PASSWORD: "${POSTGRES_PASSWORD}"
      POSTGRES_DB: "${POSTGRES_DB}"

  app:
    image: environmentagency/sroc-charging-module-api:latest
    ports:
      - "3006:3000"
    env_file:
      - .env
    depends_on:
      - db

volumes:
  cma_api_db_volume:
```

You will need to create a [.env file](https://docs.docker.com/compose/env-file/) with the correct values before you first attempt to build the environment. The project's repo has an [example](https://github.com/DEFRA/sroc-charging-module-api/blob/main/.env.example). But you will need to contact the SROC delivery team to obtain the necessary credentials you'll need to actually make it work.

> ***NEVER*** commit the `.env` to source control. The credentials the SROC delivery team provide _must_ remain secret.

With the `.env` file in place, you can tell compose to grab the images and start the environment for the first time with `docker-compose up`.

## Helper file

It's common to see a script file with docker environments to provide quick access to common commands. To get folks started here is an example [makefile](https://en.wikipedia.org/wiki/Makefile) we have put together.

```makefile
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
	docker-compose exec app npm run migratedb

seed:
	docker-compose exec app npm run seeddb

run:
	docker run -it --env-file .env environmentagency/sroc-charging-module-api:latest /bin/sh

```

To use drop it in the same folder as your `docker-compose.yml` and then from your terminal call `make up` (or whatever command you need).

> make ❤️'s tabs! The actions [must be indented with a tab](https://stackoverflow.com/a/16945143/6117745). Spaces won't cut it. Make sure you don't lose the tabs when copying and pasting.

## Getting started

To get everything up, assuming you have created the `docker-compose.yml` and `makefile`, run the following commands in this order

1. `make up` _You are probably going to want to open another terminal for the remaining commands_
1. `make migrate`
1. `make seed`

The environment should now be ready to use.

## Authentication

With the `.env` provided by the SROC team, and having run `make seed` the authorised systems (users) you'll need to access the API will automatically have been created.

We encourage all users of this API to check out our [JSON Web Keys readme](https://github.com/DEFRA/sroc-charging-module-api/tree/main/keys) which goes into detail about how requests are authenticated.

In short, all requests to the API must have a bearer token

- that is properly signed
- that contains a `client_id` which matches one saved against an `authorised_system` in the database

We do have a config setting that disables checking whether a token is expired. If this is not disabled you also need to ensure the bearer token has not expired.

## Further information

You can find _in progress_ documentation about the API on [SwaggerHub](https://app.swaggerhub.com/apis-docs/sro/sroc-charging-module-api/draft). This version of the API is a _work in progress_. As such the documentation remains in `draft`, though we continually update it to reflect new features and changes made to the API.

We have also [provided guidance](https://github.com/DEFRA/sroc-service-team/tree/main/postman) on how you can set up [Postman](https://www.postman.com/product/api-client/) to interact with an API.
