# CHA - Release

This covers everything on the day of release and after. All being well and for the majority of releases this should be short and simple.

- [Deploy release](#deploy-release)
- [Smoke test release](#smoke-test-release)
- [Confirm release successful](#confirm-release-successful)
  - [Change management](#change-management)
  - [Client team leads](#client-team-leads)
- [Record release in GitHub](#record-release-in-github)
- [In the event of errors](#if-issues-are-found)
  - [Deployment fails](#deployment-fails)
  - [Service fails](#service-fails)
  - [Rollback](#rollback)

## Deploy release

We typically have no direct involvement as all changes to production are done by web-ops. At least one person from the development team should be on hand to answer any questions or deal with any issues that arise.

Unlike the TCM, the new version is not immediately 'live' once the Jenkins deployment job completes. Monitor [LogicMonitor](https://eauk.logicmonitor.com/santaba/uiv3/dashboard/index.jsp#dashboard=152), specifically 'Running Containers' to confirm the containers have been replaced.

## Smoke test release

Once web-ops and LogicMonitor confirm the changes have been applied, the test analyst will perform a series of [smoke tests](https://en.wikipedia.org/wiki/Smoke_testing_(software)) to confirm the service is still up and running.

## Confirm release successful

We need to send 2 emails; one to change management to confirm the RfC was successful and the other to the client team delivery managers and product owners and the rest of the CM team.

### Change management

Create an email with approximately the following format and send to **SM-Defra-Change Adminstration**. In `CC` add web-ops shared email (**SM-Defra-ddts-aws-webops**).

```text
Subject: [RfC reference] completed successfully

Hello

This is to let you know [RfC reference] for the Charging Module API service was completed successfully.

[Sign off]
```

### Client team leads

Create an email with approximately the following format and send to the client team delivery managers and product owners (check with the team who they are as we don't want to include their emails in a public document). In `CC` add the members of the CM team.

```text
Subject: Charging Module API v0.14.1 release - successful

Hello

This is just to confirm the latest release of the Charging Module API v0.14.1 was completed successfully this morning.

[Sign off]
```

## Record release in GitHub

We use [GitHub's release](https://docs.github.com/en/github/administering-a-repository/about-releases) functionality to track our releases to production. They form a quick and handy reference as to what versions of the code got released to production and when.

Go to the relevant GitHib project and select the 'Releases' tab then click the _Draft a new release_ button. Complete fields as per the example below

<img src="cha_github_release.png" alt="Screenshot of drafting a new release in GitHub" style="width: 600px;"/>

The link for the changelog can be found in `CHANGELOG.md`. Look for the heading which matches the version just released.

## In the event of errors

If any errors occur the next steps will depend on where and when they happen, and their severity. In principle we aim for a 'fix-forward' approach; stick with the release but aim to roll out another expedited/emergency release as soon as possible.

### Deployment fails

The TCM uses a deployment tool called [Capistrano](https://capistranorb.com/). It coupled with the Ruby framework supports automatic rollback of failed deployments. If something fails during deployment, you can be confident no changes have been made.

With the CHA there is no such tool. The deployment is based on telling [AWS ECS](https://aws.amazon.com/ecs/) to

- update its [task definition](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definitions.html) (basically a config file which details which image to run and with what config values)
- stop any existing containers (running instances of the app) and replace them with ones based on what's in the updated task definition

This means its highly unlikely a deployment will fail but if it does, which stage it failed at will determine what you need to do.

<img src="cha_stage_view.png" alt="Screenshot of deployment stages in Jenkins" style="width: 800px;"/>

- If it fails on or before `Update ADM cluster` then nothing has changed
- If it fails on `Run migrations` then the ADM cluster has been updated to use the new Docker image and possibly some changes have been made to the database
- If it fails on `Update BES cluster` then not only does the above apply, but the main BES cluster has been updated to use the new Docker image

Investigate the issue with deployment and determine the fault. If it can be fixed quickly without changes to the app code and web-ops are happy, try the deployment again.

If the failure was _before_ `Update BES cluster` and you can't get the deployment green, test the service to see if it's still working using the old version. If it is report back to **SM-Defra-Change Administration** the RfC was unsuccessful. Log the issue in the backlog and prioritise and implement as normal.

If it isn't, or it failed _during_ `Update BES cluster` treat it as a [Service fails](#service-fails).

### Service fails

If the deployment was successful but smoke testing raises an issue with the service, convene an urgent team call.

The issue and its impact to client systems needs to be discussed; are there workarounds, how many systems affected, how often will the issue occur etc?

Accepting you're in the middle of the crisis, the team should use its best judgement whether the issue can be diagnosed and fixed in the change window or if a new RfC will be needed.

If [rolling back](#rollback) see the section below.

If _fixing-forward_ on a new RfC confirm the release as completed to **SM-Defra-Change Administration** but alter the email to let them know an issue was found and another RfC will need to be raised to deal with it.

> Note; the quickest you can get a fix in place under an emergency RfC is 3 days. You will also be _strongly_ challenged on the severity of the issue and its impact on the agency and its reputation.

### Rollback

Only use rollback if the only option to return a service to stable operation is to return to the previous deployed version.

The rollback process is

- in Jenkins web-ops update `DEPLOY_TAG` in `PRD_01_CHA_DEPLOY` to use the previous version and click the _Build Now_ button
- the development team and / or web-ops monitor LogicMonitor to confirm the containers have been replaced
- test engineer carries out smoke testing to confirm return of service
- send email to **SM-Defra-Change Administration** reporting the RfC as unsuccessful
- log the issue in the backlog and prioritise and implement as normal
