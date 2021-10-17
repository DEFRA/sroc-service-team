# Releasing

Though we have [Continuous Integration](https://www.atlassian.com/continuous-delivery/continuous-integration) we do not have [Continuous Deployment](https://www.atlassian.com/continuous-delivery/continuous-deployment). Defra's formal process uses [ITIL](https://wiki.en.it-processmaps.com/index.php/History_of_ITIL) and as such all changes to a production, _no matter how small_, must be submitted first as a [Request for Change](https://wiki.en.it-processmaps.com/index.php/Checklist_Request_for_Change_RFC).

The release processes for the [TCM](https://github.com/DEFRA/sroc-tcm-admin) and the [CHA](https://github.com/DEFRA/sroc-charging-module-api) share a number of similarities because they are based on packaging up a 'release' ready to be submitted for approval to deploy via the RfC process.

The team splits the process into 2

- **Sign off** we version [tag](https://git-scm.com/book/en/v2/Git-Basics-Tagging) the project, deploy that version to the `pre-prod` environment and run our regression and performance tests. Meantime we are generating the [CHANGELOG](https://keepachangelog.com/en/1.0.0/) and updating any relevant documentation.
- **Schedule** submit the RfC and arrange for the signed off version to be deployed to `production`.

The guides also contain notes about what we need to do on the day of release and if issues should arise.

Because there are slight differences across the two systems, we have separate guidance for each.

- [SROC Charging Module API](/releasing/cha/README.md)
- [SROC Tactical Charging Module](/releasing/tcm/README.md)
