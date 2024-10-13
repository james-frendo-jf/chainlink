# Overview
The docker compose file creates postgres, chainlink, alert manager, prometheus and grafana.

The chainlink node has all the configuration in the config folder. Omitted out any password or URL webhooks.

The Alert manager has a webhook to a discord server which will send alerts there.