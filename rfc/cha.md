# CHA RfC example

The following is an example of a completed myIT RfC for a general update to the [CHA service](https://github.com/DEFRA/sroc-charging-module-api). You should be able to use it as the basis for new ones, copying most fields directly. The description will _always_ need to be specific to the change you are making.

Below the sub-headings refer to fields. Quoted content represents an example of what to enter.

## Top section

Most are drop-downs. Anything not mentioned will either have a default or update based on what you enter.

### Department

> Defra

### Category

> Software

### Environment

> Production

### Configuration item

> CM_Charging Module

### Sponsor

> James Kelly

### Short description

> Deploy service update - Charging Module API

### Description

> We need to update the service with the latest patches, fixes and features. A full CHANGELOG is provided below.
>
> Charging Module API
> https://github.com/DEFRA/sroc-charging-module-api/blob/main/CHANGELOG.md
> v0.11.1
> - Create table export service #480 (StuAA78)
> - Create TransformTableToFile service #477 (StuAA78)
> - Create table body presenter #476 (StuAA78)
> - Fix - Rebilling for same customer causes error #475 (Cruikshanks)
> - Fix broken Docker build #471 (Cruikshanks)
> - Bump @hapi/lab from 24.2.1 to 24.3.1 #484 (dependabot[bot])
> - Bump joi from 17.4.0 to 17.4.1 #483 (dependabot[bot])
> - Bump @aws-sdk/client-s3 from 3.20.0 to 3.21.0 #482 (dependabot[bot])
> - Bump nodemon from 2.0.9 to 2.0.12 #481 (dependabot[bot])
> - Bump @aws-sdk/client-s3 from 3.19.0 to 3.20.0 #474 (dependabot[bot])
> - Bump nock from 13.1.0 to 13.1.1 #473 (dependabot[bot])
> - Bump nodemon from 2.0.8 to 2.0.9 #472 (dependabot[bot])
> - Bump nodemon from 2.0.7 to 2.0.8 #470 (dependabot[bot])

## Planning

The next section of the form has 6 tabs. The only ones we care about are 'Planning' and 'Schedule'.

### Business justification

> The Charging Module team maintains the Charging Module API, which is used to generate invoices for Water abstraction customers. This brings in millions of pounds of revenue for the Environment Agency. This update is required to ensure the service remains secure, reliable and fit for purpose for the client systems that use it.

### Implementation plan

> Execute the automated deployment job from Jenkins. This updates the AWS ECS task definition that determines which version of the service to run and then tells AWS to perform a rolling update of running containers to the new version.

### Downtime

> No

### Risk and impact analysis

> The automated deployment uses a multi-stage process. Should one stage fail the whole deployment will fail.
>
> All changes to the service are tested independently and the release version is checked using a suite of regression and performance tests.
>
> Failure to implement the change risks the live service running vulnerable, insecure code (lack of patching), additional workload and reputational risk to the dept. (not fixing bugs with charge calculations and invoicing), and failure to implement features needed by client services (inability to invoice customers).

### Blackout plan

> Should any stage of the deployment fail the whole deployment will fail.
>
> If deployment succeeds but another issue is found that can't immediately be rectified by the team or web-ops, the previous version will be re-deployed.

### Test plan

> The automated deployments are the same process in all our environments and so are run numerous times each day. The specific version of the service being deployed has been tested in pre-production and signed of by the teams QA.

## Schedule

Avoid Friday's if you can. Even if the change is small and low risk no one likes to tempt fate before the weekend!

Check the calendars of the web-ops team before hand as well. As long as

- there are no other RfC's that AM/PM
- the change is something they've done before

You should be fine to go ahead and schedule it. If unsure contact web-ops first to agree a date and time.

### Planned start date

> 07/05/2021 09:30:00

### Planned end date

> 07/05/2021 10:00:00

## Risk assessment

This is a link in the form. Often it does not appear until you have completed the other sections and clicked the `Save for later` button. Once you have completed this (see fields below) you can then click `Validate`. This is what actually submits the RfC to Change Management.

### Does the change impact Application, Infrastructure or both?

> Applications

### Is this change impacting a Datacentre?

> No

### How many systems are impacted?

> 1-3

### How many services are impacted?

> 1-3

### At what level will the service be affected

> None

### Is new infrastructure hardware or application software being introduced by this change?

> No

### Are there multiple parties involved in the implementation of this change?

> 1 person

### Is these a single coordinator for the change?

> Yes

### Are there any other critical changes dependent on this implementation?

> N/A

### Change frequency

> Change is actioned on a regular basis

### Does this change have a high VIP visibility?

> No

### How many users are affected?

> Internal & External customers

### Select service classification

> N/A
