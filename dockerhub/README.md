# Docker Hub

To allow users of the API to work with it locally and not rely on a connection to our AWS `INTEGRATION` environment we produce Docker container images.

> A Docker image is a read-only template that contains a set of instructions for creating a container that can run on the Docker platform. It provides a convenient way to package up applications and preconfigured server environments, which you can use for your own private use or share publicly with other Docker users.
>
> [A Beginner’s Guide to Understanding and Building Docker Images](https://jfrog.com/knowledge-base/a-beginners-guide-to-understanding-and-building-docker-images/)

We make these accessible on [Docker Hub](https://hub.docker.com/r/environmentagency/sroc-charging-module-api).

Along with the images we provide instructions on how to get up and running with them using [Docker Compose](https://docs.docker.com/compose/) and a [makefile](https://en.wikipedia.org/wiki/Makefile).

This folder is where we store a copy of the instructions and example files for each version.

## How to use the image

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
	docker-compose exec app npm run migrate-db

seed:
	docker-compose exec app npm run seed-db

run:
	docker run -it --env-file .env environmentagency/sroc-charging-module-api:latest /bin/sh

```

To use it, drop it in the same folder as your `docker-compose.yml` and then from your terminal call `make up` (or whatever command you need).

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

You can find documentation about the API on [SwaggerHub](https://app.swaggerhub.com/apis-docs/sro/sroc-charging-module-api/draft).

We have also [provided guidance](/postman) on how you can set up [Postman](https://www.postman.com/product/api-client/) to interact with an API.

## DockerHub README issue

For version 2 we enabled the [auto build feature](https://docs.docker.com/docker-hub/builds/) of Docker Hub after first linking it to the [GitHub repo](https://hub.docker.com/r/environmentagency/charging-module-api).

This has proven to be very helpful. Not only can users of the API pull the latest build down as an image, as we tag (version) changes in the project Docker Hub automatically builds a matching image.

The downside is that each time an automated build runs, Docker Hub overwrites its README with the one in the linked GitHub repo. This was originally [raised as an issue 5 years ago](https://github.com/docker/hub-feedback/issues/325) but as yet nothing has been done about it.

This was actually the main driver for putting these files in this project; if we hadn't they really wouldn't have had a home anywhere else.
