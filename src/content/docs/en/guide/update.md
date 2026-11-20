---
title: Updating
description: Update the main app and the service on GPU PCs.
---

:::caution
Update both together; machines with a different version can't connect.
:::

## Main app

In the folder with `docker-compose.yml`:

```sh
docker compose pull && docker compose up -d
```

Data is kept and the database upgrades itself.

## GPU PC

Download the new `video-turbo.zip`, **merge it over** the existing project folder, then run the install again.

**Windows** (PowerShell in the project folder):

```powershell
.\deploy\worker\windows\worker.ps1 install
.\deploy\worker\windows\worker.ps1 start
```

**Linux** (use `install all` if video restoration is installed):

```sh
bash deploy/worker/linux/worker.sh install asr
bash deploy/worker/linux/worker.sh start
```
