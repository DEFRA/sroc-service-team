# TCM - Sign off

This covers the sign off process for the [Tactical Charging Module](https://github.com/DEFRA/sroc-tcm-admin).

This kicks in when the team feels thay have a 'release candidate'. Essentially a version of the app (code) they'd like to release to production.

We aim to have a release candidate each sprint. Even if the team have not made any direct changes it is rare for a project to not have received any dependency bumps. Plus, frequent releases ensures the process is reliable, repeatable and simple.

- [Agree version](#agree-version)
- [Check for outstanding dependency PRs](#check-for-outstanding-dependency-prs)
- [Check for missing labels](#check-for-missing-labels)
- [Generate git tag](#generate-git-tag)
- [Update the CHANGELOG](#update-the-changelog)
- [Update pre-production Jenkins job](#update-pre-production-jenkins-job)
- [Test sign-off](#test-sign-off)
  - [Approval to release](#approval-to-release)
  - [If issues are found](#if-issues-are-found)

## Agree version

We use [semantic versioning](https://semver.org/) to differentiate between patch, minor and major releases. We track an app's releases using [GitHub releases](https://docs.github.com/en/github/administering-a-repository/about-releases). Check the repo to confirm what the last one was.

The development team will then review the changes made to decide whether a major, minor, or patch version bump is needed.

> The 'version' agreed is what any reference to version below is referring to.

## Check for outstanding dependency PRs

Don't worry about any draft feature or fix PR's. But any automated dependency PR's should be checked, approved and merged. These help ensure the app remains up to date and secure.

## Check for missing labels

> Caveat - we only care about PR's created during the current team's tenure. We don't have the capacity to work through all the previous PR's trying to determine what labels to assign

Review the merged PR's for missing labels eg `ehancement`, `bug` etc. These labels are used by the tool we use to automatically generate our CHANGELOGs.

## Generate git tag

We use [git annotated tags](https://git-scm.com/book/en/v2/Git-Basics-Tagging) to track our releases and control what Jenkins actually deploys.

Create a new version tag, for example

```bash
git tag -a v3.1.0 -m "Version 3.1.0"
```

Then push the tag to GitHub.

```bash
git push origin v3.1.0
```

**Do not** create the release in GitHub at this time. We record the release in GitHub _after_ the app is shipped to production.

## Update the CHANGELOG

We use [github-changelog-generator](https://github.com/github-changelog-generator/github-changelog-generator) to generate our CHANGELOGs. The following assumes you have the gem installed (it can also be run [using Docker](https://github.com/github-changelog-generator/github-changelog-generator#running-with-docker)).

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

> You'll notice we don't create a PR. This is the one time we make an exception to the rule 'all changes on a branch'. We do this to avoid polluting our CHANGELOGs with lots of `Update CHANGELOG` entries.

## Update pre-production Jenkins job

In [Jenkins](https://tcm-jenkins.aws-int.defra.cloud) the job is `PRE_03_TCM_DEPLOY`. Click _Configure_ and then update the `DEPLOY_BRANCH` param in the _General->Properties Content_ field.

```bash
DEPLOY_BRANCH=v3.1.0
```

Then click the _Build Now_ button and wait for it to succeed.

## Test sign-off

This stage is managed by QA & Test with support from development if needed. With the release candidate deployed to the pre-production environment it is the responsibility of the test analyst to 'sign it off'.

It involves running the full suite of regression tests plus any additional manual testing felt necessary to confirm the expected functionality is included and still working. The release can then be given its 'test signoff'.

For reference our automated acceptance tests for the TCM can be found in

- [SROC TCM Acceptance tests](https://github.com/DEFRA/sroc-tcm-acceptance-tests)
- [SROC acceptance tests](https://github.com/DEFRA/sroc-acceptance-tests)

### Approval to release

Once all testing phases are complete we just need confirmation from the team's QA that we are ok to [schedule](/releasing/tcm/schedule.md) the release.

### If issues are found

We abort the sign off process if issues are found that will require code changes.

Those changes would be managed within the team as normal; logged, prioritised and planned into a sprint. Once implemented if the team feels the application is again ready for release we start the whole process again.

This includes creating a new tag (version) for the application. We **do not** reuse tags which have previously been generated.
