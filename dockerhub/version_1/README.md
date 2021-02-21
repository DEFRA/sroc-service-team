# Charging module API

The API provides an interface for calculating charges, creating and queuing transactions, and generating transaction and customer files used to produce Environment Agency invoices.

The images are built from [charging-module-api](https://github.com/defra/charging-module-api) each time we tag and generate a release version. They are provided here to allow teams wishing to develop clients for the API to run it locally.

You can find more details about the SROC delivery team which maintain the API at <https://github.com/DEFRA/sroc-service-team>.

## How to use this image

The following is an example [docker-compose](https://docs.docker.com/compose/) you can use to bring up a working environment

```yml
version: '3.8'

services:
  db:
    image: postgres:10-alpine
    volumes:
      - cha_api_db_volume:/var/lib/postgresql/data
    ports:
      - "54321:5432"
    environment:
      POSTGRES_USER: "${PGUSER}"
      POSTGRES_PASSWORD: "${PGPASSWORD}"
      POSTGRES_DB: "${PGDATABASE}"

  app:
    image: environmentagency/charging-module-api:latest
    ports:
      - "3005:3000"
    env_file:
      - .env
    depends_on:
      - db

volumes:
  cha_api_db_volume:
```

You will need to create a [.env file](https://docs.docker.com/compose/env-file/) with the correct values before you first attempt to build the environment. The project's repo has an [example](https://github.com/DEFRA/charging-module-api/blob/main/.env.example). But you will need to contact the SROC delivery team to obtain the necessary credentials you'll need to actually make it work.

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

.DEFAULT_GOAL := up

up:
	docker-compose up

down:
	docker-compose down

clean:
	docker-compose down --rmi local -v

open:
	docker-compose exec app /bin/sh

```

To use drop it in the same folder as your `docker-compose.yml` and then from your terminal call `make up` (or whatever command you need).

## Known issues

We have noted the app will often fail on the first `docker-compose up`. This seems to be caused when it attempts to run database migrations for the first time. Currently, the workaround is to stop the containers, count to 5, then call `docker-compose up` (or `make up`) again. We're sorry for any confusion this causes 😢

## Further information

You can find documentation about the API on [SwaggerHub](https://app.swaggerhub.com/apis-docs/sro/charging-module_api/v0.3.0). We generate documentation for each version of the API. For example

- `v0.3.0` - <https://app.swaggerhub.com/apis-docs/sro/charging-module_api/v0.3.0>
- `v0.2.0` - <https://app.swaggerhub.com/apis-docs/sro/charging-module_api/v0.2.0>
- `v0.1.0` - <https://app.swaggerhub.com/apis-docs/sro/charging-module_api/v0.1.0>

To see what the API will look like for the next release check out the [draft version](https://app.swaggerhub.com/apis-docs/sro/charging-module_api/draft)

We have also [provided guidance](https://github.com/DEFRA/sroc-service-team/tree/main/postman) on how you can set up [Postman](https://www.postman.com/product/api-client/) to interact with the API.
