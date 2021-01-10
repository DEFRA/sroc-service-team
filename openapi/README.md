# OpenAPI documentation

This folder contains everything we use to maintain an [OpenAPI specification](https://github.com/OAI/OpenAPI-Specification) for both [Version 1](https://github.com/DEFRA/charging-module-api) and [Version 2](https://github.com/DEFRA/sroc-charging-module-api) of our API's.

These specs serve both as a reference for us and our users. They can also be used with tools like [Postman](https://www.postman.com/) and [SwaggerHub](https://swagger.io/tools/swaggerhub/).

As changes are made to the APIs the development team is expected to update the specs to match. See [Maintaing the Draft versions](#maintaing-the-draft-versions) for more details.

We use [SwaggerHub](https://swagger.io/tools/swaggerhub/) to publish the specs in a form that all interested parties can interact with to learn about the API.

## Versions of the API

For reasons covered below the team is currently maintaining and working on 2 versions of the API.

### Version 1

This represents the current 'released' (available to users but not yet 'live') version of the API and is based on the [charging-module-api project](https://github.com/DEFRA/charging-module-api). User testing has exposed serious issues with performance so this version has been superceded. But because we have external users using and developing against it still we treat it as a 'live' system. This is why we continue to maintain and make available the Open API spec for it.

The `draft` version is available at <https://app.swaggerhub.com/apis-docs/sro/charging-module_api/draft>.

Other versions available are

- [v0.4.0](https://app.swaggerhub.com/apis-docs/sro/charging-module_api/v0.4.0)
- [v0.3.0](https://app.swaggerhub.com/apis-docs/sro/charging-module_api/v0.3.0)
- [v0.2.0](https://app.swaggerhub.com/apis-docs/sro/charging-module_api/v0.2.0)

### Version 2

This represents the latest version of the API and is based on the [sroc-charging-module-api project](https://github.com/DEFRA/sroc-charging-module-api). It is intended to resolve the quality and performance issues in version 1. It has also been designed to provide more flexibility and less duplication as new regimes are added.

It is not yet available to users and the team is still working on what endpoints will be available on release, and how they will behave. At this time only the `draft` version is available at <https://app.swaggerhub.com/apis-docs/sro/sroc-charging-module_api/draft>.

## Working on the documents

Any editor or tool that supports OpenAPI should be able to work with the documents as found. As [VSCode](https://code.visualstudio.com/) users we favour it and the [open-api designer](https://marketplace.visualstudio.com/items?itemName=philosowaffle.openapi-designer) extension.

> Unlike the more popular [OpenAPI (Swagger) Editor](https://marketplace.visualstudio.com/items?itemName=42Crunch.vscode-openapi) extension, it properly supports relative JSON references which we rely on to split up the main file. The Swagger editor unfortunately continues to [struggle with them](https://github.com/swagger-api/swagger-editor/issues/1409).

### Cache issues with the extension

The **open-api designer** does suffer with a [caching issue](https://github.com/philosowaffle/vs-openapi-designer/issues/36) when it comes to working with multiple Open API files. First, it expects the file to be previewed or compiled to be called `openapi.yml`. Second, if you open the [version 1 file](/openapi/version_1/openapi.yml) first and preview it, you'll find if you then open the [version 2 file](/openapi/version_2/openapi.yml) the preview won't update. No amount of closing the pane seems and trying again solves it.

We have found make a couple of edits, saving after each one, it will cause the preview to start showing the file being worked on. If all else fails, close VSCode completely and stick to just working on 1 file at a time 🥺😩 !

### Understanding OpenAPI v3

As the OpenAPI spec is just version 3 of the [Swagger spec](https://swagger.io/docs/specification/2-0/what-is-swagger/) the [Swagger site](https://swagger.io/docs/specification/about/) is the best source for understanding how to work on OpenAPI documents.

You can also access the [full spec](https://github.com/OAI/OpenAPI-Specification) on GitHub.

## Maintaing the Draft versions

We maintain 'draft' specs of each version of the API, which we publish to SwaggerHub alongside our release versions.

Anyone making a change to the specs is expected to also regenerate the relevant draft version.

- [version 1 draft spec](/openapi/version_1/openapi.yml)
- [version 1 generated draft](/openapi/versions/draft_v1.yml)

- [version 2 draft spec](/openapi/version_2/openapi.yml)
- [version 2 generated draft](/openapi/versions/draft_v2.yml)

### Generate draft.yml

In order to upload our specs to SwaggerHub we need to create a unified version of the schema i.e. a single file.

The **open-api designer** includes a feature that will compile a unified schema and dereferences all `$refs` into a single JSON file (`openapi/openapi.json`).

As `yml` is still the prefered option by most tools, including **SwaggerHub**, we use an online tool like [JSON2YAML](https://www.json2yaml.com/) to convert the JSON to yml. Copy the contents of `openapi/openapi.json` to **JSON2YAML**. Once converted replace the contents of the relevant generated draft version with the generated YAML.

### Updating SwaggerHub

Because we have no money, we are having to take advantage of the free version of SwaggerHub! This means only [@cruikshanks](https://github.com/Cruikshanks) can update it. When this needs doing, give him a poke.

## Publishing a release version

> Currently only **Version 1** is 'released'. **Version 2** is still undergoing design and development

For each release of the Charging Module API V1 we

- ensure the spec is up to date
- tag and save a unified version of the spec to [versions](openapi/versions)
- create a new version in SwaggerHub and copy the contents of the file into it

There's a few steps we have to go through to do this.

### Update the spec

Ensure the OpenAPI spec is up to date with any changes made to the **Charging Module API V1**. This might be documenting changes in how endpoints behave, the schema because an endpoint has amended how it responds etc.

If final changes are required follow [Maintaing the Draft version](#maintaing-the-draft-version).

### Tag and save version of the spec

With [draft_v1.yml](/openapi/versions/draft_v1.yml) updated duplicate the file then rename the copy to match the release version of the API, for example `v0-3-0.yml`.

You then need to make 2 small tweaks to the new file (both are at the top so you won't get lost!)

- remove the opening statement `> This 'draft' version represents the next release of the API.` from `description:`
- update `version:` to match the release version of the API, for example `v0-3-0`

### Add to SwaggerHub

Just like [Updating SwaggerHub](#updating-swaggerhub) for the `draft` version only [@cruikshanks](https://github.com/Cruikshanks) can add new versions of the spec to it. When this needs doing, give him a poke.

He'll create a new version in SwaggerHub and copy the contents of the file into it.

## Not currently included

As a first pass we have tried to capture as much as we can. But time and resource is limited so we know this does not capture everything. Things not covered are

- all possible permutations of requests and responses across the regimes supported
- all possible [4xx](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) error responses
- any [5xx](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) error responses

We also expect to find examples where a query param does not match what is actually used, or where the schema does not match the actual response.

When we find errors we will endeavour to update the specs and re-publish them.

## GDS Standards

GDS and the Open standards board [recommends that government organisations use OpenAPI v3](https://www.gov.uk/government/publications/recommended-open-standards-for-government/describing-restful-apis-with-openapi-3) to document their API's.

They do also expect a lot of other information in the documentation. What we have here we think gives our team and our users a good introduction to the Charging Module API.

But it is our aim is to build on this to improve what we provide.
