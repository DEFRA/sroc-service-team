# Releasing

Though we have [Continuous Integration](https://www.atlassian.com/continuous-delivery/continuous-integration) we do not have [Continuous Deployment](https://www.atlassian.com/continuous-delivery/continuous-deployment). Defra's formal process uses [ITIL](https://wiki.en.it-processmaps.com/index.php/History_of_ITIL) and as such all changes to a production, _no matter how small_, must be submitted first as a [Request for Change](https://wiki.en.it-processmaps.com/index.php/Checklist_Request_for_Change_RFC).

The release processes for the [TCM](https://github.com/DEFRA/sroc-tcm-admin) and the [CHA](https://github.com/DEFRA/sroc-charging-module-api) share a number of similarities because they are based on packaging up a 'release' ready to be submitted for approval to deploy via the RfC process.

For each release of a service to production there are 4 stages to the process

- **Prepare**
- **Assure**
- **Approve**
- **Ship**

The following documents go into detail about each one for each of the services

- [SROC Tactical Charging Module](/releasing/tcm.md)
- [SROC Charging Module API](/releasing/cha.md)
