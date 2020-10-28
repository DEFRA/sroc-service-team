# OpenAPI documentation

This folders contains an [OpenAPI](https://github.com/OAI/OpenAPI-Specification) documented version of the [Charging Module API](https://github.com/DEFRA/charging-module-api) for use as a reference or with tools like [Postman](https://www.postman.com/) and [SwaggerHub](https://swagger.io/tools/swaggerhub/).

## Working on the documents

Any editor or tool that supports OpenAPI should be able to work with the documents as found. As [VSCode](https://code.visualstudio.com/) users we favour it and the [open-api designer](https://marketplace.visualstudio.com/items?itemName=philosowaffle.openapi-designer) extension.

> Unlike the more popular [OpenAPI (Swagger) Editor](https://marketplace.visualstudio.com/items?itemName=42Crunch.vscode-openapi) extension, it properly supports relative JSON references which we rely on to split up the main file. The Swagger editor unfortunately continues to [struggle with them](https://github.com/swagger-api/swagger-editor/issues/1409).

### Understanding OpenAPI v3

As the OpenAPI spec is just version 3 of the [Swagger spec](https://swagger.io/docs/specification/2-0/what-is-swagger/) the [Swagger site](https://swagger.io/docs/specification/about/) is the best source for understanding how to work on OpenAPI documents.

You can also access the [full spec](https://github.com/OAI/OpenAPI-Specification) on GitHub.

## Publishing the spec

We use [SwaggerHub](https://swagger.io/tools/swaggerhub/) to publish the spec in a form that all interested parties can interact with to learn about the API.

For each release of the Charging Module API we

- update the main spec
- generate a new unified schema
- tag and save the unified schema to [versions](openapi/versions)
- create a new version in SwaggerHub and copy the contents of the file into it

For example, you can access the published spec for [v0.2.0](https://github.com/DEFRA/charging-module-api/releases/tag/v0.2.0) at <https://app.swaggerhub.com/apis-docs/sro/charging-module_api/v0.2.0>

There's a few steps we have to go through to do this.

### Update the main spec

Update [openapi.yml](openapi/openapi.yml) with any changes made to the API in the new version. This might be documenting changes in how endpoints behave, the schema because an endpoint has amended how it responds etc.

Create the changes on a branch and raise a PR for review by another member of the dev team.

### Convert to a single file

Once approved we need to create a unified version of the schema i.e. a single file.

Some tools require a single file. The **open-api designer** includes a feature that will compile a unified schema and dereferences all `$refs` into a single JSON file. As `yml` is still the prefered option by most tools, including **SwaggerHub**, we use an online tool like [JSON2YAML](https://www.json2yaml.com/) to convert the file back to a single `*.yml` file.

Rename the generated file based on the version, for example, [swagger_v0-2-0.yml](openapi/versions/swagger_v0-2-0.yml) then move it to the [versions](openapi/versions) folder.

### Updating SwaggerHub

Because we have no money, we are having to take advantage of the free version of SwaggerHub! This means only [@cruikshanks](https://github.com/Cruikshanks) can update it. When this needs doing, give him a poke.

He'll create a new version in SwaggerHub and copy the contents of the file into it. The SwaggerHub version will match the Charging Module API version so it should be possible to work out how to access the published spec. For example

- `v0.2.0` is available at <https://app.swaggerhub.com/apis-docs/sro/charging-module_api/v0.2.0>
- `v0.3.0` will be available at <https://app.swaggerhub.com/apis-docs/sro/charging-module_api/v0.3.0>

## Not currently included

As a first pass we have tried to capture as much as we can. But time and resource is limited so we know this does not capture everything. Things not covered are

- all possible permutations of requests and responses across the regimes supported
- all possible [4xx](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) error responses
- any [5xx](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) error responses

We also expect to find examples where a query param does not match what is actually used, or where the schema does not match the actual response.

When we find errors we will endeavour to update the spec and re-publish it.

## GDS Standards

GDS and the Open standards board [recommends that government organisations use OpenAPI v3](https://www.gov.uk/government/publications/recommended-open-standards-for-government/describing-restful-apis-with-openapi-3) to document their API's.

They do also expect a lot of other information in the documentation. What we have here we think gives our team and our users a good introduction to the Charging Module API.

But it is our aim is to build on this to improve what we provide.
