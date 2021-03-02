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

## Instruction and example files

- [Version 1 of the API](/dockerhub/version_1)
- [Version 2 of the API](/dockerhub/version_2)

### README issue for Version 2

For version 2 we enabled the [auto build feature](https://docs.docker.com/docker-hub/builds/) of Docker Hub after first linking it to the [GitHub repo](https://hub.docker.com/r/environmentagency/charging-module-api).

This has proven to be very helpful. Not only can users of the API pull the latest build down as an image, as we tag (version) changes in the project Docker Hub automatically builds a matching image.

The downside is that each time an automated build runs, Docker Hub overwrites its README with the one in the linked GitHub repo. This was originally [raised as an issue 5 years ago](https://github.com/docker/hub-feedback/issues/325) but as yet nothing has been done about it.

This was actually the main driver for putting these files in this project; if we hadn't they really wouldn't have had a home anywhere else.
