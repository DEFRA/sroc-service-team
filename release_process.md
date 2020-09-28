# Release process

This covers the release process for the [tactical-charging-module (TCM)](https://github.com/DEFRA/sroc-tcm-admin) and the [charging-module-api (CMA)](https://github.com/DEFRA/charging-module-api).

> Currently it is only possible to deploy `master` for the charging-service. This is an issue the current team is aiming to resolve.

For each release of an app to **production** there are 4 stages to the process

- Prepare
  - [Check for outstanding dependency PRs](#check-for-outstanding-dependency-prs)
  - [Check for missing labels](#check-for-missing-labels)
  - [Agree version](#agree-version)
  - [Update app version](#update-app-version)
  - [Generate git tag](#generate-git-tag)
  - [Update the CHANGELOG](#update-the-changelog)
  - [Build Docker image](#build-docker-image)
  - [Update pre-production Jenkins job](#update-pre-production-jenkins-job)
- Assure
  - [Test sign-off](#test-sign-off)
  - [User sign-off](#user-sign-off)
  - [Approval to release](#approval-to-release)
  - [If issues are found](#if-issues-are-found)
- Approve
  - [Agree date and time for release](#agree-date-and-time-for-release)
  - [Submit RfC](#submit-rfc)
  - [Prepare a release note](#prepare-a-release-note)
  - [Create calendar appointment](#create-calendar-appointment)
- Ship
  - [Deploy release](#deploy-release)
  - [Smoke test release](#smoke-test-release)
  - [Record release in GitHub](#record-release-in-github)
  - [If issues are found](#if-issues-are-found)
  - [Rollback](#rollback)

Key to this is Defra's current assurance and approval processes prevent us adopting a [continuous deployment](https://www.atlassian.com/continuous-delivery/continuous-deployment) approach. This is why we talk about things like 'release candidates', 'test signoff', and 'request for change' approvals.

## Prepare

This kicks in when the team feels thay have a 'release candidate'. Essentially a version of the app (code) they'd like to release to production.

### Check for outstanding dependency PRs

Don't worry about any draft feature or fix PR's. But any automated dependency PR's should be checked, approved and merged. These help ensure the app remains up to date and secure.

### Check for missing labels

> Caveat - we only care about PR's created during the current team's tenure. We don't have the capacity to work through all the previous PR's trying to determine what labels to assign

Review the merged PR's for missing labels eg `ehancement`, `bug` etc. These labels are used by the tool we use to automatically generate our CHANGELOGs.

### Agree version

We use [semantic versioning](https://semver.org/) to differentiate between patch, minor and major releases. We track an app's releases using [GitHub releases](https://docs.github.com/en/github/administering-a-repository/about-releases). Check the repo to confirm what the last one was.

The development team will then review the changes made to decide whether a major, minor, or patch version bump is needed.

> The 'version' agreed is what any reference to version below is referring to.

### Update app version

> IMPORTANT! Ensure you have checked out the main branch for the repo and performed a `git pull` to get the latest code first.

We need to update the version held in the app to match our new version. This does mean changing a code file but you'll notice we don't create a PR. This and [updating the CHANGELOG](#update-the-changelog) are the exceptions.

We do this to avoid polluting our CHANGELOGS with lots of `Update VERSION` and `Update CHANGELOG` entries.

#### charging-module-api

For the [CMA](https://github.com/DEFRA/charging-module-api/) update the version in the `package.json`.

Make the change and then commit and push it.

```bash
git add package.json
git commit -m "Update VERSION"
git push
```

#### tactical-charging-module

There is no specific place where version is specified in a Rails app. Though there are ways to do it, we choose not to record a version in the app itself when Rails is used.

### Generate git tag

We use [git annotated tags](https://git-scm.com/book/en/v2/Git-Basics-Tagging) to track our releases and control what Jenkins actually deploys.

Create a new version tag, for example

```bash
git tag -a v0.2.0 -m "Version 0.2.0"
```

Then push the tag to GitHub.

```bash
git push origin v0.2.0
```

**Do not** create the release in GitHub at this time. We record the release in GitHub *after* the app is shipped to production.

### Update the CHANGELOG

We use [github-changelog-generator](https://github.com/github-changelog-generator/github-changelog-generator) to generate our CHANGELOGs. The following assumes you have the gem installed (it can be run [using Docker](https://github.com/github-changelog-generator/github-changelog-generator#running-with-docker)) and uses the charging-module-api as an example.

From the root of the project run this

```bash
github_changelog_generator -u DEFRA -p charging-module-api
```

The generator will update the `CHANGELOG.md`. Open the file to confirm it has picked up the new tag and generated the changelog as expected. Then commit the update.

```bash
git add CHANGELOG.md
git commit -m "Update CHANGELOG"
git push
```

### Build Docker image

> Currently this step only applies to the CMA. Ignore for the TCM.

In the Jenkins instance for the service find the `BLD_03_API_BUILD_AND_PUSH_RELEASES` job. Click the *Build Now* button and wait for it to succeed. Then confirm a new image with the version tag has been pushed to Artifactory.

### Update pre-production Jenkins job

In the Jenkins instance for the service find the pre-production deployment job, update the env var used to control the version deployed, then click the *Build Now* button.

#### charging-module-api

For the CMA the job is `PRE_01_API_DEPLOY`. Click *Configure* and then update the `DEPLOY_TAG` env var in the *Properties Content* field.

```bash
DEPLOY_ENV=pre
DEPLOY_TAG=v0.2.0
```

#### tactical-charging-module

For the TCM the job is `TCM_PRE_10_TCM_ADMIN_DEPLOY`. Click *Configure* and then update `CAPISTRANO_BRANCH` param in the *Build->Execute shell->Command* field.

```bash
# Set values for capistrano

export CAPISTRANO_BRANCH=v2.8

export CAPISTRANO_SERVERS="PRETCMBESSRV001 PRETCMBESSRV002"
```

## Assure

The next stage is managed by QA & Test with support from development if needed. With the release candidate deployed to the pre-production environment it is the responsibility of the test analyst to 'sign it off'.

### Test sign-off

Normally this would involve running the full suite of regression tests plus any additional manual testing felt necessary to confirm the expected functionality is included and still working. The release can then be given its 'test signoff'.

### User sign-off

> Currently this step only applies to the CMA. Ignore for the TCM.

After being confirmed as **ready** by test, we need to deploy the CMA to our integration environment. This is to allow users of the API time to confirm existing functionality isn't broken, and make changes to their apps to take advantage of any feature changes made.

#### Update integration Jenkins job

In the Jenkins instance for the service find the `INT_01_API_DEPLOY` job. Click *Configure* and then update the `DEPLOY_TAG` env var in the *Properties Content* field.

```bash
DEPLOY_ENV=tra
DEPLOY_TAG=v0.2.0
```

#### Send release ready email to WRLS team

Create an email with approximately the following format and send to the WRLS development and test team leads. In `CC` add from the SROC team

- project manager
- test manager
- test analyst
- dev team

```text
Subject: Charging Module API - v0.2.0 ready for release to INTEGRATION

Hello

This is to let you know we are ready to release v0.2.0 of the Charging Module API to the INTEGRATION environment.

The CHANGELOG for v0.2.0 is below. You can find the full CHANGELOG at https://github.com/DEFRA/charging-module-api/blob/master/CHANGELOG.md

[Copy and paste contents of CHANGELOG for version about to be released]

We just need to confirm with you a suitable date and time to update the environment.

[Sign off]
```

#### Create calendar appointment

Once a date and time has been agreed create a calendar appointment with approximately the following format in your Defra Outlook. Invite the WRLS development and test team leads. In `optional` add from the SROC team

- project manager
- test manager
- test analyst
- dev team

```text
Title: Charging Module API - Release v0.2.0 to INTEGRATION

No actual meeting will take place!

This is just a reminder to all that the Charging Module API INTEGRATION environment will be updated at this time.
```

This will serve as both a confirmation and reminder to all of the agreed date and time.

#### Deploy new version to integration

At the agreed time and date, find the `INT_01_API_DEPLOY` job in the Jenkins instance for the service. Then click the *Build Now* button and wait for it to succeed.

#### Send release done email to WRLS team

Create an email with approximately the following format and send to the WRLS development and test team leads. In `CC` add from the SROC team

- project manager
- test manager
- test analyst
- dev team

```text
Subject: Charging Module API - v0.2.0 released to INTEGRATION

Hello

This is to let you know that v0.2.0 of the Charging Module API has been released to the INTEGRATION environment.

Any issues or questions please let us know.

[Sign off]
```

### Approval to release

Once all testing phases are complete we just need confirmation from the team's test manager that we are ok to proceed to the [approval phase](#approve) of the release.

### If issues are found

We abort the release process if issues are found that will require code changes.

Those changes would be managed within the team as normal; logged, prioritised and planned into a sprint. Once implemented if the team feels the application is again ready for release we start the whole process again.

This includes creating a new tag (version) for the application. We **do not** reuse tags which have previously been generated.

## Approve

Any service that is 'live' in Defra requires submitting a [Request for Change (RfC)](https://wiki.en.it-processmaps.com/index.php/Checklist_Request_for_Change_RFC) before changing anything in production.

This applies to _all_ changes. Even something as small as changing the value of an environment variable requires an RfC!

The RfC needs to be approved by DDTS Change Management before you can proceed with the release.

### Agree date and time for release

We need to co-ordinate the date and time for the release with these stakeholders.

- our team, specifically the product owner on behalf of the business
- teams that use the service
- web-ops as they perform all releases and updates to production environments

This should also take into account the type of change being requested.

- **Normal** - release in 2 weeks' time or later
  - Approvals are sought by email by the Change management team before approving the RfC
- **Expedited** - release in 4-10 working days
  - The next Change Approval Board (CAB) will discuss the RfC . Someone from the team will need to attend to answer any questions before they grant approval
- **Emergency** - release within 3 working days
  - An emergency CAB will convene to discuss the RfC. Someone from the team will need to attend to answer any questions before they grant approval. These are _really_ discouraged by Change management and you _will_ be challenged on why it is needed.

### Submit RfC

> Currently handled by the project manager

Submit the RfC in [myIT](https://defra.service-now.com) (also known as **Service Now**). You'll need to be on the corporate network to access **myIT**. For those without a corporate laptop access from your phone is the only option 😞.

### Prepare a release note

To ensure everyone involved in shipping the release is clear on what actions are needed, prepare a [release note](https://gitlab-dev.aws-int.defra.cloud/open/release-notes).

There are plenty of existing ones to base it on covering a number of different types of 'release'. As an example, a simple update to an the CMA would be

```markdown
# 25 December 2020

- CHG0012345
- No downtime required
- Scheduled 10am

## Release process

### Prior to release

- **web-ops** - Update property `DEPLOY_TAG=v0.2.0` in `PRD_01_API_DEPLOY` job in Jenkins

### Release day

- **web-ops** - `PRD_01_API_DEPLOY` job ran in Jenkins
- **delivery team** - Smoke test that service is up and operating as expected
```

### Create calendar appointment

Once a date and time has been agreed create a calendar appointment with approximately the following format in your Defra Outlook. Invite the appointed web-ops and tester carrying out the release. In `optional` add from the SROC team

- project manager
- test manager
- dev team

```text
title: [service name] - Release [version] to PRODUCTION

[Copy of release note content]

[Link to release note]
```

This will serve as both a confirmation and reminder to all of the agreed date and time.

## Ship

This covers everything on the day of release and after. All being well and for the majority of releases this should be the shortest and simplest phase.

### Deploy release

We typically have no direct involvement as all changes to production are done by web-ops. At least one person from the development team should be on hand to answer any questions or deal with any issues that arise.

### Smoke test release

Once web-ops confirm the changes have been applied, the test analyst will perform a series of [smoke tests](https://en.wikipedia.org/wiki/Smoke_testing_(software)) to confirm the service is still up and running.

### Confirm release successful

Create an email with approximately the following format and send to **SM-Defra-Change Management**. In `CC` add web-ops lead plus from the SROC team

- project manager
- test manager
- test analyst
- dev team

```text
Subject: [RfC reference] completed successfully

Hello

This is to let you know [RfC reference] for the [service name] was completed successfully.

[Sign off]
```

### Record release in GitHub

We use [GitHub's release](https://docs.github.com/en/github/administering-a-repository/about-releases) functionality to track our releases to production. They form a quick and handy reference as to what versions of the code got released to production and when.

Go to the relevant GitHib project and select the 'Releases' tab then click the *Draft a new release* button. Complete fields as per the example below

<img src="release.png" alt="Screenshot of draft a new release" style="width: 600px;"/>

The link for the changelog can be found in `CHANGELOG.md`. Look for the heading which matches the version just released.

> Both the TCM and the CMA do not currently have a history of doing this. So checkout projects like [waste-carriers-back-office](https://github.com/DEFRA/waste-carriers-back-office/releases) and [waste-exemptions-back-office](https://github.com/DEFRA/waste-exemptions-back-office/releases) for examples.

### If issues are found

If issues are found next steps will depend on where and when they happen, and their severity. In principle we aim for a 'fix-forward' approach; stick with the release but aim to roll out another expedited/emergency release as soon as possible.

#### Deployment fails

If deployment has failed first confirm the currently running version of the service has not changed. As long as it hasn't then nothing has changed. Investigate the issue and determine the fault. If it can be fixed quickly without changes to the app code and web-ops are happy, try the deployment again.

Else report back to **SM-Defra-Change Management** the RfC was unsuccessful. Log the issue in the backlog and prioritise and implement as normal.

#### Service fails

If the deployment was successful but smoke testing raises an issue with the service, convene an urgent team call. Key folks needed are

- representation from the business
- representation from development
- representation from test
- project manager

The issue and its impact to users needs to be discussed; are there workarounds, how many users affected, how often will the issue occur etc?

Accepting you're in the middle of the crisis, the team should use its best judgement whether to prioritise an urgent fix or roll-back to a previous version.

A rule of thumb is if an emergency RfC would be needed to *fix-forward*, then you don't! The service version should be rolled back instead.

If [rolling back](#rollback)

- web-ops will need to run the roll-back deployment for the service
- send email to **SM-Defra-Change Management** reporting the RfC as unsuccessful
- log the issue in the backlog and prioritise and implement as normal

If *fixing-forward* confirm the release as completed to **SM-Defra-Change Management** but alter the email to let them know an issue was found and another RfC will need to be raised to deal with it.

### Rollback

Only use rollback if the only option to return a service to stable operation is to return to the previous deployed version.

The rollback process for the CMA and the TCM differ.

#### charging-module-api

- web-ops will need to update property `DEPLOY_TAG` in the `PRD_01_API_DEPLOY` job in Jenkins to the previous version
- web-ops run `PRD_01_API_DEPLOY` job in Jenkins
- test engineer carries out smoke testing to confirm return of service

#### tactical-charging-module

- web-ops run `TCM_PRD_90_CHARGE_SERVICE_ROLLBACK` job in Jenkins (if `TCM_PRD_10_CHARGE_SERVICE_DEPLOY` had been run as part of release)
- web-ops run `TCM_PRD_90_TCM_ADMIN_ROLLBACK` job in Jenkins (if `TCM_PRD_10_TCM_ADMIN_DEPLOY` had been run as part of release)
- test engineer carries out smoke testing to confirm return of service
