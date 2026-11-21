---
title: Updating
description: Update the main app and the service on GPU PCs.
---

:::caution
Update both together; machines with a different version can't connect.
:::

## Main app

**Desktop app**: when a new version is out, the tray menu shows **Update to vX.Y.Z**; click it to download and install, and it restarts afterwards.
If it doesn't show up, click **Check for updates** in the tray menu.

**Docker**: in the folder with `docker-compose.yml`:

```sh
docker compose pull && docker compose up -d
```

Data is kept and the database upgrades itself.

## GPU PC

**Windows (VideoTurbo Worker)**: like the desktop app, click **Update to vX.Y.Z** in the tray menu when it appears. The program environment is updated afterwards automatically.

**Linux**: download the new `video-turbo.zip`, **merge it over** the existing project folder, then run the install again (use `install all` if video restoration is installed):

```sh
bash deploy/worker/linux/worker.sh install asr
bash deploy/worker/linux/worker.sh start
```
