# SROC Tactical Charging Module

This guide documents the **sign off** and **schedule** stages for the TCM. It also includes notes for the **release** day.

- [Sign off](/releasing/tcm/sign_off.md)
- [Schedule](/releasing/tcm/schedule.md)
- [Release](/releasing/tcm/release.md)

## Our responsibilities

Unlike the CHA the TCM is a web application used directly by EA teams who we support. We still have responsibilities to them. But, for example, should a breaking change be needed we can co-ordinate with them a suitable date and time for its release rather than maintain 2 versions of the same thing.

### Fixes first

The CM team has committed to fixing 'bugs' first before working on new features or improvements. Bugs have an adverse effect on the quality of a system and how it's perceived by its users. This will effect the team's velocity and the trust our users have in us and the system.

This is why, like with the CHA, we fix bugs first. For example, if the team were currently in Sprint 58 and a user raised an issue

- Initial investigation is immediately conducted
  - The CM team will then determine if the issue is a bug. The CM team have the final say on whether something is a bug.
- The bug is prioritised
  - Typically, any new bugs will automatically be assigned to the next sprint (Sprint 59 in our example). The team will already have made commitments on the work in the current sprint which they don't want to risk. However, if the team deem the issue a high priority it _will_ be brought into the current sprint. Again, the CM team have the final say.

## Release flow

Like the other services we maintain the release flow encompasses 3 stages

- Build
- Sign off
- Release (schedule)

Unlike the CHA we have more flexibility over when sign off and release is done as we have a direct relationship with the TCM's users. Any changes needed by them will be procedural and can be co-ordinated directly. There is no requirement to provide a predictable pattern or allow time for testing and preparation before a release.

So, no fancy graphic is needed for the TCM. Once sign of is complete we will typically schedule a release sraight away.
