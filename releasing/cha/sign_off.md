# CHA - Sign off

This covers the sign off process for the [Charging Module API](https://github.com/DEFRA/sroc-charging-module-api).

This kicks in when the team feels thay have a 'release candidate'. Essentially a version of the app (code) they'd like to release to production.

We aim to have a release candidate each sprint. Even if the team have not made any direct changes it is rare for a project to not have received any dependency bumps. Plus, frequent releases ensures the process is reliable, repeatable and simple.

- [Agree version](#agree-version)
- [Check for outstanding dependency PRs](#check-for-outstanding-dependency-prs)
- [Check for missing labels](#check-for-missing-labels)
- [Update app version](#update-app-version)
- [Generate git tag](#generate-git-tag)
- [Wait for Docker push](#wait-for-docker-push)
- [Update the CHANGELOG](#update-the-changelog)
- [Update pre-production Jenkins job](#update-pre-production-jenkins-job)
- [Test sign-off](#test-sign-off)
  - [Approval to release](#approval-to-release)
  - [If issues are found](#if-issues-are-found)
- [Update INTEGRATION](#update-integration)
  - [Notify client teams on Slack](#notify-client-teams-on-slack)
  - [Deploy new version to INTEGRATION](#deploy-new-version-to-integration)

## Agree version

We use [semantic versioning](https://semver.org/) to differentiate between patch, minor and major releases. We track an app's releases using [GitHub releases](https://docs.github.com/en/github/administering-a-repository/about-releases). Check the repo to confirm what the last one was.

The development team will then review the changes made to decide whether a major, minor, or patch version bump is needed.

> The 'version' agreed is what any reference to version below is referring to.

## Check for outstanding dependency PRs

Don't worry about any draft feature or fix PR's. But any automated dependency PR's should be checked, approved and merged. These help ensure the app remains up to date and secure.

## Check for missing labels

Review the merged PR's for missing labels eg `ehancement`, `bug` etc. These labels are used by the tool we use to automatically generate our CHANGELOGs.

## Update app version

> IMPORTANT! Ensure you have checked out the `main` branch for the repo and performed a `git pull` to get the latest code first.

We need to update the version held in the app to match our new version. Update the version in the `package.json` then commit and push it.

```bash
git add package.json
git commit -m "Update VERSION"
git push
```

> You'll notice we don't create a PR. This and [updating the CHANGELOG](#update-the-changelog) are the only times we make an exception to the rule 'all changes on a branch'. We do this to avoid polluting our CHANGELOG with lots of `Update VERSION` and `Update CHANGELOG` entries.

## Generate git tag

We use [git annotated tags](https://git-scm.com/book/en/v2/Git-Basics-Tagging) to track our releases and control what Jenkins actually deploys.

Create a new version tag, for example

```bash
git tag -a v0.14.1 -m "Version 0.14.1"
```

Then push the tag to GitHub.

```bash
git push origin v0.14.1
```

**Do not** create the release in GitHub at this time. We record the release in GitHub _after_ the app is shipped to production.

## Wait for Docker push

Pushing of the Docker image _should_ automatically be handled by the [Jenkins](https://cha-jenkins.aws-int.defra.cloud/) `BLD_02_CMA_PULL_AND_PUSH` job. GitHub will have automatically built an image when the git tag was pushed. The Jenkins job `BLD_01_CMA_CHECK_FOR_CHANGES` will be triggered to pull down the image and then push it onto [Artifactory](https://artifactory-ops.aws-int.defra.cloud/artifactory/webapp/#/artifacts/browse/tree/General/sroc/sroc-charging-module-api).

Once you have confirmed the tagged image has been built by GitHub you can manually trigger `BLD_01_CMA_CHECK_FOR_CHANGES` rather than waiting for it if you prefer.

Once **Artifactory** lists the correct image you can continue with the rest of the steps.

## Update the CHANGELOG

We use [github-changelog-generator](https://github.com/github-changelog-generator/github-changelog-generator) to generate our CHANGELOGs. The following assumes you have the gem installed.

From the root of the project run this

```bash
github_changelog_generator
```

The generator will update the `CHANGELOG.md`. Open the file to confirm it has picked up the new tag and generated the changelog as expected. Then commit the update.

```bash
git add CHANGELOG.md
git commit -m "Update CHANGELOG"
git push
```

> You'll notice we don't create a PR. This and [updating the app version](#update-the-app-version) are the only times we make an exception to the rule 'all changes on a branch'. We do this to avoid polluting our CHANGELOG with lots of `Update VERSION` and `Update CHANGELOG` entries.

## Update pre-production Jenkins job

In [Jenkins](https://cha-jenkins.aws-int.defra.cloud/) the job is `PRE_01_CHA_DEPLOY`. Click _Configure_ and then update the `DEPLOY_TAG` param in the _General->Properties Content_ field.

```bash
DEPLOY_ENV=pre
DEPLOY_TAG=v0.14.1
```

Then click the _Build Now_ button and wait for it to succeed.

## Test sign-off

This stage is managed by QA & Test with support from development if needed. With the release candidate deployed to the pre-production environment it is the responsibility of the test analyst to 'sign it off'.

It involves running the full suite of regression tests, performance tests plus any additional manual testing felt necessary to confirm the expected functionality is included and still working. The release can then be given its 'test signoff'.

For reference our automated acceptance tests for the CHA can be found in

- [SROC Charging Module API Acceptance tests](https://github.com/DEFRA/sroc-cha-acceptance-tests)
- [SROC Charging Module API tests](https://github.com/DEFRA/sroc-charging-module-api-tests)

The performance tests are in [SROC Charging Module API Performance tests](https://github.com/DEFRA/sroc-cha-performance-tests).

### Approval to release

Once all testing phases are complete we just need confirmation from the team's QA that we are ok to [Update INTEGRATION](#update-integration) and then [schedule](/releasing/tcm/schedule.md) the release.

### If issues are found

We abort the sign off process if issues are found that will require code changes.

Those changes would be managed within the team as normal; logged, prioritised and planned into a sprint. Once implemented if the team feels the application is again ready for release we start the whole process again.

This includes creating a new tag (version) for the application. We **do not** reuse tags which have previously been generated.

## Update INTEGRATION

With the test sign-off we have a 'release' version. Unlike the TCM, where we immediately start scheduling a release, with the CHA we deploy the version to the `INTEGRATION` environment to allow client teams some time to test and prepare their systems.

### Notify client teams on Slack

Prepare a notification with approximately the following format and send to the [wrls-cm-charging Slack channel](https://defra-digital.slack.com/archives/GQD2TMN6N).

```markdown
@here Hello charging friends! `v0.14.1` of the CMA is available on Docker https://hub.docker.com/r/environmentagency/sroc-charging-module-api/tags

Key changes are the bug fixes. With this release customer changes and delete licence should be working 100% as expected and hopefully in a position they will unblock any work you have related to them. We'll be updating the `TRA (INT)` environment shortly to this version.

*_OPEN API SPEC_*

https://app.swaggerhub.com/apis-docs/sro/sroc-charging-module-api/v0.14.1

*_CHANGELOG_*

https://github.com/DEFRA/sroc-charging-module-api/blob/main/CHANGELOG.md#v0141-2021-10-12

*Implemented enhancements:*

* Replace existing proxy config with global-agent #572 (StuAA78)

*Fixed bugs:*

* Delete Licence additional summary fixes #581 (StuAA78)
* Fix pending status in delete licence #575 (Cruikshanks)
* Fix postcode should not be a required property #574 (Cruikshanks)
* Fix Delete Licence not correctly updating bill run summary #573 (StuAA78)

*Housekeeping updates:*

* Rename regimeId to regimeSlug #585 (StuAA78)

*Dependency updates:*

* Bump @hapi/hapi from 20.2.0 to 20.2.1 #584 (dependabot[bot])
* Bump hapi-pino from 8.4.0 to 8.5.0 #583 (dependabot[bot])
* Bump @aws-sdk/client-s3 from 3.35.0 to 3.36.0 #582 (dependabot[bot])
* Bump @aws-sdk/client-s3 from 3.34.0 to 3.35.0 #580 (dependabot[bot])
* Bump @airbrake/node from 2.1.5 to 2.1.7 #579 (dependabot[bot])
* Bump standard from 16.0.3 to 16.0.4 #578 (dependabot[bot])
* Bump objection from 2.2.16 to 2.2.17 #576 (dependabot[bot])
```

As you can see, most of the content can be taken from the [CHANGELOG](https://github.com/DEFRA/sroc-charging-module-api/blob/main/CHANGELOG.md)

### Deploy new version to INTEGRATION

In [Jenkins](https://cha-jenkins.aws-int.defra.cloud/) find the job `INT_01_CHA_DEPLOY`. Click _Configure_ and then update the `DEPLOY_TAG` param in the _General->Properties Content_ field.

```bash
DEPLOY_ENV=tra
DEPLOY_TAG=v0.14.1
```

Then click the _Build Now_ button and wait for it to succeed.
