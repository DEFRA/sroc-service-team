# Request for Change (RfC)

Any service that is 'live' in Defra requires submitting a [Request for Change (RfC)](https://wiki.en.it-processmaps.com/index.php/Checklist_Request_for_Change_RFC) before changing anything in production.

> [..] formal request for the implementation of a Change. The RFC is a precursor to the 'Change Record' and contains all information required to approve a Change.

This applies to _all_ changes. Even something as small as changing the value of an environment variable requires an RfC!

Submit your RfC in [myIT](https://defra.service-now.com) (also known as **Service Now**). You'll need to be on the corporate network to access **myIT**. For those without a corporate laptop access from your phone is the only option 😞.

## Time frames

There are 4 types of RfC. The key differentiators are

- the lead time before you can apply the change
- the approval process it goes through

Expedited and emergency changes are used only as a last resort. Standard changes are pre-approved and based on evidence of having implemented the same 'change' via 3 previous `Normal` RfC's.

### Normal

Have a 10 working day lead time. Approvals are sought by email by the Change management team before approving the RfC.

### Expedited

For changes that need implementing in 4 to 10 days. The next Change Approval Board (CAB) will discuss the RfC. Someone from the team will need to attend to answer any questions before they grant approval.

### Emergency

For changes that need implementing in 1 to 3 days. An emergency CAB will convene to discuss the RfC. Someone from the team will need to attend to answer any questions before they grant approval.

These are really discouraged by Change management and you _will_ be challenged on why it is needed.

### Standard

Are pre-approved and can be implemented whenever the service team is ready.

Unfortunately, [myIT](https://defra.service-now.com) sometimes uses the term 'standard' to mean a `Normal` change. But a `Standard` change is a pre-approved RfC which is based on a **Standard Change Proposal**. If a service can demonstrate they have implemented the same 'change' without error on at least 3 occasions they can submit a standard change proposal. When approved the proposal becomes a template in myIT. Any RfC created from that template is pre-approved and does not have to wait 10 days before it can be implemented.

The key thing to understand is that it's pre-approval for a _specific_ kind of change to a service. If a service needs to make a different type of change they must still submit a `Normnal` RfC. For example, the Rules Service is allowed to carry out it's annual update to the regime rules under a `Standard` change (see standard change proposal `STDCHG0001214`). But if it needed to make a different kind of change, for example an upgrade to the rules service, this would need to be done as a `Normal` change with it's 10 working day waiting period.

## Submitting an RfC

### Permission to submit

To submit an RfC you'll need a higher access level in myIT than the standard provided to most staff. You can request this from the myIT home page by going to `Get Help -> Outdated Applications` and completing the form. Be sure to detail the need to raise all types of RfC (not just **normal**). The form does ask your line managers details and a cost code (there is a licensing cost involved) so double check first if you actually need it. Others on the team may already have responsibility for submitting RfC's covered.

### Filling in the form

The form is (currently) accessed from the menu `Change -> Create New`. It's here you'll select the type of change required (**normal**, **expedited** or **emergency**). The form is the same for each, though if you're not requesting a **normal** change be sure to add additional detail to justify the request.

We have provided examples of completed RfC's for each service which can also be used as the basis for new ones. Check out each for specific details on the form itself.

- [Rules Service](/rfc/rs.md)
- [SROC Charging Module API](/rfc/cha.md)
- [SROC Tactical Charging Module](/rfc/tcm.md)

> The examples are intended as refreshers for those who have experience of raising RfC's or who are doing it for a different service for the first time.

## When the RfC is completed

Though they'll have details on when the change will happen Change Management rely on teams letting them know when changes are complete and whether they were successful. Be sure to email `changeadministration@defra.gov.uk` once the change is applied.

```text
title: RfC CHG0049495 completed

Hello

This is to confirm RfC CHG0049495 for the Charging Module API was completed successfully with no downtime.

[email sign off]
```
