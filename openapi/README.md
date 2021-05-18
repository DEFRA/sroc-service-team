# OpenAPI documentation

This folder contains everything we use to maintain an [OpenAPI specification](https://github.com/OAI/OpenAPI-Specification) for [SROC Charging Module API](https://github.com/DEFRA/sroc-charging-module-api).

The spec serves both as a reference for us and our users. It can also be used with tools like [Postman](https://www.postman.com/) and [SwaggerHub](https://swagger.io/tools/swaggerhub/).

As changes are made to the API the development team is expected to update the spec to match. See [Maintaining the Draft version](#maintaing-the-draft-version) for more details.

We use [SwaggerHub](https://swagger.io/tools/swaggerhub/) to publish the spec in a form that all interested parties can interact with to learn about the API.

## Working on the documents

Any editor or tool that supports OpenAPI should be able to work with the documents as found. As [VSCode](https://code.visualstudio.com/) users we favour it and the [open-api designer](https://marketplace.visualstudio.com/items?itemName=philosowaffle.openapi-designer) extension.

> Unlike the more popular [OpenAPI (Swagger) Editor](https://marketplace.visualstudio.com/items?itemName=42Crunch.vscode-openapi) extension, it properly supports relative JSON references which we rely on to split up the main file. The Swagger editor unfortunately continues to [struggle with them](https://github.com/swagger-api/swagger-editor/issues/1409).

### Cache issues with the extension

The **open-api designer** does suffer with a [caching issue](https://github.com/philosowaffle/vs-openapi-designer/issues/36) when it comes to working with the main `openapi.yml`. First, it expects the file to be previewed or compiled to be called `openapi.yml`. Anything else and it won't work.

Second, if you open the file and preview it, then do something like move it and makes changes, you'll find when you open the preview again it won't update. No amount of closing the pane and trying again solves this. If this happens just restart VSCode 🥺😩 !

### Understanding OpenAPI v3

As the OpenAPI spec is just version 3 of the [Swagger spec](https://swagger.io/docs/specification/2-0/what-is-swagger/) the [Swagger site](https://swagger.io/docs/specification/about/) is the best source for understanding how to work on OpenAPI documents.

You can also access the [full spec](https://github.com/OAI/OpenAPI-Specification) on GitHub.

## Maintaing the Draft version

We maintain a 'draft' spec of the API, which we publish to SwaggerHub alongside our release versions at <https://app.swaggerhub.com/apis-docs/sro/sroc-charging-module-api/draft>.

Anyone making a change to the spec is expected to also regenerate the [draft version](/openapi/versions/draft_v2.yml).

### Generate draft.yml

In order to upload our spec to SwaggerHub we need to create a unified version of the schema i.e. a single file.

The **open-api designer** includes a feature that will compile a unified schema that dereferences all `$refs` into a single JSON file (`openapi/openapi.json`).

As `yml` is still the prefered option by most tools, including **SwaggerHub**, we use an online tool like [JSON2YAML](https://www.json2yaml.com/) to convert the JSON to yml. Copy the contents of `openapi/openapi.json` to **JSON2YAML**. Once converted replace the contents of the draft version with the generated YAML.

### Updating SwaggerHub

Because we have no money, we are having to take advantage of the free version of SwaggerHub! This means only [@cruikshanks](https://github.com/Cruikshanks) can update it. When this needs doing, give him a poke.

## Publishing a release version

For each release of the API we

- ensure the spec is up to date
- tag and save a unified version of the spec to [versions](openapi/versions)
- create a new version in SwaggerHub and copy the contents of the file into it

There's a few steps we have to go through to do this.

### Update the spec

Ensure the OpenAPI spec is up to date with any changes made to the API. This might be documenting changes in how endpoints behave, the schema because an endpoint has amended how it responds etc.

If final changes are required follow [Maintaing the Draft version](#maintaing-the-draft-version).

### Tag and save version of the spec

With [draft.yml](/openapi/versions/draft_v1.yml) updated duplicate the file then rename the copy to match the release version of the API, for example `v0-3-0.yml`.

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

They do also expect a lot of other information in the documentation. What we have here we think gives our team and our users a good introduction to the SROC Charging Module API.

But it is our aim is to build on this to improve what we provide.

## Note about versions

If you go digging through the commit history you will find references to **Version 1** and **Version 2** of the API. Version 1 was the original project the current delivery team were handed when joining the team. You can see the initial version specs we created for it here

- [v0.4.0](https://app.swaggerhub.com/apis-docs/sro/charging-module_api/v0.4.0)
- [v0.3.0](https://app.swaggerhub.com/apis-docs/sro/charging-module_api/v0.3.0)
- [v0.2.0](https://app.swaggerhub.com/apis-docs/sro/charging-module_api/v0.2.0)

User testing however exposed serious issues with its performance. Plus, it was overloaded with features and endpoints that our current users confirmed would never be used. So, we quickly moved to replacing it with the current [SROC Charging Module API](https://github.com/DEFRA/sroc-charging-module-api), often referred to as **Version 2**.
