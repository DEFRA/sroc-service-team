# OpenAPI documentation

This folders contains an [OpenAPI](https://github.com/OAI/OpenAPI-Specification) documented version of the [Charging Module API](https://github.com/DEFRA/charging-module-api) for use as a reference or with tools like [Postman](https://www.postman.com/) and [SwaggerHub](https://swagger.io/tools/swaggerhub/).

As changes are made to the **Charging Module API** the development team is expected to update this spec to match. See [Maintaing the Draft version](#maintaing-the-draft-version) for more details.

We use [SwaggerHub](https://swagger.io/tools/swaggerhub/) to publish the spec in a form that all interested parties can interact with to learn about the API.

The `draft` version is available at <https://app.swaggerhub.com/apis-docs/sro/charging-module_api/draft>.

Other versions available are

- [v0.3.0](https://app.swaggerhub.com/apis-docs/sro/charging-module_api/v0.3.0)
- [v0.2.0](https://app.swaggerhub.com/apis-docs/sro/charging-module_api/v0.2.0)

## Working on the documents

Any editor or tool that supports OpenAPI should be able to work with the documents as found. As [VSCode](https://code.visualstudio.com/) users we favour it and the [open-api designer](https://marketplace.visualstudio.com/items?itemName=philosowaffle.openapi-designer) extension.

> Unlike the more popular [OpenAPI (Swagger) Editor](https://marketplace.visualstudio.com/items?itemName=42Crunch.vscode-openapi) extension, it properly supports relative JSON references which we rely on to split up the main file. The Swagger editor unfortunately continues to [struggle with them](https://github.com/swagger-api/swagger-editor/issues/1409).

### Understanding OpenAPI v3

As the OpenAPI spec is just version 3 of the [Swagger spec](https://swagger.io/docs/specification/2-0/what-is-swagger/) the [Swagger site](https://swagger.io/docs/specification/about/) is the best source for understanding how to work on OpenAPI documents.

You can also access the [full spec](https://github.com/OAI/OpenAPI-Specification) on GitHub.

## Maintaing the Draft version

An issue was noted with our Open API workflow. As we make changes to the API we update the spec ready for the next release. But the delivery team and any interested parties can't see those changes till we release the next version.

So now we maintain a [draft version](/openapi/versions/draft.yml) which we publish to [SwaggerHub](https://app.swaggerhub.com/apis-docs/sro/charging-module_api/draft) alongside our release versions.

Anyone making a change to the spec is expected to also regenerate the [draft version](/openapi/versions/draft.yml).

### Generate draft.yml

In order to upload our specs to SwaggerHub we need to create a unified version of the schema i.e. a single file.

The **open-api designer** includes a feature that will compile a unified schema and dereferences all `$refs` into a single JSON file (`openapi/openapi.json`).

As `yml` is still the prefered option by most tools, including **SwaggerHub**, we use an online tool like [JSON2YAML](https://www.json2yaml.com/) to convert the JSON to yml. Copy the contents of `openapi/openapi.json` to **JSON2YAML**. Once converted replace the contents of [draft.yml](/openapi/versions/draft.yml) with the generated YAML.

### Updating SwaggerHub

Because we have no money, we are having to take advantage of the free version of SwaggerHub! This means only [@cruikshanks](https://github.com/Cruikshanks) can update it. When this needs doing, give him a poke.

## Publishing a release version

For each release of the Charging Module API we

- ensure the spec is up to date
- tag and save a unified version of the spec to [versions](openapi/versions)
- create a new version in SwaggerHub and copy the contents of the file into it

There's a few steps we have to go through to do this.

### Update the spec

Ensure the OpenAPI spec is up to date with any changes made to the **Charging Module API**. This might be documenting changes in how endpoints behave, the schema because an endpoint has amended how it responds etc.

If final changes are required follow [Maintaing the Draft version](#maintaing-the-draft-version).

### Tag and save version of the spec

With [draft.yml](/openapi/versions/draft.yml) updated duplicate the file then rename the copy to match the release version of the API, for example `v0-3-0.yml`.

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

When we find errors we will endeavour to update the spec and re-publish it.

## GDS Standards

GDS and the Open standards board [recommends that government organisations use OpenAPI v3](https://www.gov.uk/government/publications/recommended-open-standards-for-government/describing-restful-apis-with-openapi-3) to document their API's.

They do also expect a lot of other information in the documentation. What we have here we think gives our team and our users a good introduction to the Charging Module API.

But it is our aim is to build on this to improve what we provide.
