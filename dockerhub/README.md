# Docker Hub

To allow users of the API to work with it locally and not rely on a connection to our AWS `INTEGRATION` environment we produce Docker container images.

> A Docker image is a read-only template that contains a set of instructions for creating a container that can run on the Docker platform. It provides a convenient way to package up applications and preconfigured server environments, which you can use for your own private use or share publicly with other Docker users.
>
> [A Beginner’s Guide to Understanding and Building Docker Images](https://jfrog.com/knowledge-base/a-beginners-guide-to-understanding-and-building-docker-images/)

We make these accessible on [Docker Hub](https://hub.docker.com/).

- Images for [Version 1 of the API](https://github.com/defra/charging-module-api) are at [environmentagency/charging-module-api](https://hub.docker.com/r/environmentagency/charging-module-api)
- Images for [Version 2 of the API](https://github.com/defra/sroc-charging-module-api) are at [environmentagency/sroc-charging-module-api](https://hub.docker.com/r/environmentagency/sroc-charging-module-api)

Along with the images we provide instructions on how to get up and running with them using [Docker Compose](https://docs.docker.com/compose/) and a [makefile](https://en.wikipedia.org/wiki/Makefile).

This folder is where we store a copy of the instructions and example files for each version.
