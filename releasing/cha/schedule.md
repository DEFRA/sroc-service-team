# CHA - Schedule

This covers the schedule process for the [Charging Module API](https://github.com/DEFRA/sroc-charging-module-api).

It covers

- [Agree date and time for release](#agree-date-and-time-for-release)
- [Submit RfC](#submit-rfc)
- [Prepare a release note](#prepare-a-release-note)
- [Create calendar appointment](#create-calendar-appointment)
- [Send email](#send-email)

## Agree date and time for release

For a standard release which does not require any downtime, makes no major changes to functionality, and just requires web-ops to click a button you can determine the date and time with little to no collaboration. Things to note

- avoid Fridays (web-ops and Change Management don't like them!)
- go for an AM release (this gives more time should something go wrong)
- pre-check the calendar for the web-ops and QA leads

This should also take into account the type of change being requested.

- **Normal** - release in 10 working days time or later
  - Approvals are sought by email by the Change management team before approving the RfC
- **Expedited** - release in 4-10 working days
  - The next Change Approval Board (CAB) will discuss the RfC . Someone from the team may need to attend to answer any questions before they grant approval
- **Emergency** - release within 3 working days
  - An emergency CAB will convene to discuss the RfC. Someone from the team *will* need to attend to answer any questions before they grant approval. These are _really_ discouraged by Change management and you _will_ be challenged on why it is needed.

If you need to co-ordinate the date and time for the release you will need to collaborate with these stakeholders.

- our team, specifically the product owner on behalf of the business
- teams that use the service
- web-ops as they perform all releases and updates to production environments

## Submit RfC

Any service that is 'live' in Defra requires submitting a [Request for Change (RfC)](https://wiki.en.it-processmaps.com/index.php/Checklist_Request_for_Change_RFC) before changing anything in production.

This applies to _all_ changes. Even something as small as changing the value of an environment variable requires an RfC!

The RfC needs to be approved by DDTS Change Management before you can proceed with the release.

Submit the RfC in [myIT](https://defra.service-now.com) (also known as **Service Now**). You'll need to be on the corporate network to access **myIT**. For those without a corporate laptop access from your phone is the only option 😞.

Check out [our RfC guide](/rfc/README.md) for help with doing this.

### Prepare a release note

To ensure everyone involved in shipping the release is clear on what actions are needed, prepare a [release note](https://gitlab-dev.aws-int.defra.cloud/open/release-notes).

There are plenty of existing ones to base it on covering a number of different types of 'release'. As an example, a simple update to the CHA would be

```markdown
# 20 October 2021

- CHG0053450
- No downtime required
- Scheduled 9:30am to 10:30am

## About this release

General patches and important bug fixes.

## Release process

This covers the steps involved for this release.

### Prior to release

- **web-ops** - Update property `DEPLOY_TAG=v0.14.1` in production `PRD_01_CHA_DEPLOY` job in Jenkins

### Release day

- **web-ops** - Production `PRD_01_CHA_DEPLOY` job ran in Jenkins
- **delivery team** - Smoke test that service is up and operating as expected
```

### Create calendar appointment

Once a date and time has been confirmed create a calendar appointment and add the shared web-ops account **SM-Defra-ddts-aws-webops** and CM team's QA as `required`. Add the rest of the tech team as `optional`. Use the following template for the title and content

```text
title: CHA RFC CHG0053450 v0.14.1

[Copy of release note content]

[Link to release note]
```

This will serve as both a confirmation and reminder to all of the agreed date and time.

## Send email

Create an email with approximately the following format and send to the client team delivery managers and product owners (check with the team who they are as we don't want to include their emails in a public document). In `CC` add the members of the CM team.

```text
Subject: Charging Module API - Release v0.14.1 to production

Hello

This is just to let you know at approximately **9:30 on Wednesday 20 October**, we'll be releasing the latest version of the CHA to production. There will be no downtime.

Key changes are

- [List bug fixes]
- [List features changes]

In the meantime, if you have any questions or issues do not hesitate to contact me.

[Sign off]
```

Don't bother listing dependency changes. If that's all there is replace the key changes section with

```text
There are no key changes or fixes in this version. The release just contains general patches and updates to the tools that we use.
```
