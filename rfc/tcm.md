# TCM RfC example

The following is an example of a completed myIT RfC for a general update to the [TCM service](https://github.com/DEFRA/sroc-tcm-admin). You should be able to use it as the basis for new ones, copying most fields directly. The description will _always_ need to be specific to the change you are making.

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

### BAU or Project

> BAU

### Short description

> Deploy service update - Tactical Charging Module

### Description

> We need to update the service with the latest patches, fixes and features. A full CHANGELOG is provided below.
>
> Tactical Charging Module
> https://github.com/DEFRA/sroc-tcm-admin/blob/main/CHANGELOG.md
> v3.1.0
>
> Implemented enhancements:
> - Talk to the rules service directly #406 (Cruikshanks)
>
> Fixed bugs:
> - Remove dependence on mimemagic gem #405 (Cruikshanks)
>
> Dependency updates:
> - Bump webmock from 3.12.1 to 3.12.2 #407 (dependabot[bot])
> - Bump oauth2 from 1.4.4 to 1.4.7 #404 (dependabot[bot])
> - Bump rspec-rails from 5.0.0 to 5.0.1 #403 (dependabot[bot])

## Planning

The next section of the form has 6 tabs. The only ones we care about are 'Planning' and 'Schedule'.

### Business justification

> The Charging Module team maintains the Tactical Charging Module, which is used to generate invoices for the CFD, PAFS and WML charging regimes. This brings in millions of pounds of revenue for the Environment Agency. This update is required to ensure the service remains secure, reliable and fit for purpose.

### Implementation plan

> Execute the automated deployment job from Jenkins. This updates the AWS EC2 instances running the service and then carriers out a rolling restart which avoids the need for downtime.

### Downtime

> No

### Risk and impact analysis

> The automated deployment uses a multi-stage process. Should one stage fail the whole deployment will fail.
>
> All changes to the service are tested independently and the release version is checked using a suite of regression and performance tests.
>
> Failure to implement the change risks the live service running vulnerable, insecure code (lack of patching), additional workload and reputational risk to the dept. (not fixing bugs with charge calculations and invoicing), and failure to implement features needed by client services (inability to invoice customers).

### Backout plan

> The automated deployment has a rollback option, which allows it to revert to the previous version of the application, which is cached on the server.

### Test plan

> The automated deployments are the same process in all our environments and so are run numerous times each day. The specific version of the service being deployed has been tested in pre-production and signed of by the teams QA.

## Schedule

The form will default to the first available date and time. So, for example, if you opened it on `4 August at 12:37pm` it would default to `18 Aug at 13:52:44`. This is because it automatically adds a set number of hours (we think 337) to the current date and time when the form is started.

We aim to do deployments in the morning. This is to give us more time to rectify any issues. We also avoid Friday. Even if the change is small and low risk no one likes to tempt fate before the weekend!

So, typically we would select the next day (`19 August at approx 10:00` in our example) having checked the calendars of the web-ops team as well. As long as

- there are no other RfC's that AM/PM
- the change is something they've done before

You should be fine to go ahead and schedule it. If unsure contact web-ops first to agree a date and time before submitting.

### Planned start date

> 07/05/2021 09:30:00

### Planned end date

> 07/05/2021 10:30:00

## Risk assessment

This is a link in the form. Often it does not appear until you have completed the other sections and clicked the `Save for later` button. Once you have completed this (see fields below) you can then click `Validate`. This is what actually submits the RfC to Change Management.

### Does the change impact Application, Infrastructure or both?

> Applications

### Is this change impacting a Datacentre?

> No

### How many systems are impacted?

_Which we interpret as the application itself._

> 1-3

### How many services are impacted?

_Which we interpret as the number of client services using our system._

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

> < 100

### Select service classification

> N/A
