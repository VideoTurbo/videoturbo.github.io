---
title: Install the main app
description: Install the VideoTurbo main app with Docker Compose.
---

The main app only needs one `docker-compose.yml` file.

## Install

1. Download `docker-compose.example.yml` from [Releases](https://github.com/VideoTurbo/VideoTurbo/releases/latest), put it in a new folder and rename it to `docker-compose.yml`.
2. Replace `/path/to/your/media` with your video folder, and set the time zone `TZ` if needed.
3. Start it in that folder:

   ```sh
   docker compose up -d
   ```

4. Open `http://<main-app-ip>:8765` and set an admin password (at least 8 characters).

:::caution
Whoever opens the dashboard first sets the password, so do this right after installing.
:::

Everything else (libraries, translation models, media servers, notifications, plugins, access keys) is set in the dashboard, stored in the database under `./data`, and takes effect immediately.

## Ports

| Port | Purpose |
| --- | --- |
| `8765` | Web dashboard. The left side is the port you open in the browser and can be changed; don't change the right side. |
| `8766` | Machine port, only for GPU PCs you set up yourself. See [GPU PC on another network](../remote-network/). |

:::danger
Never expose port 8765 to the internet.
:::

## Folders

| Path in the container | Contents |
| --- | --- |
| `/app/data` | Database |
| `/app/logs` | Main app log `server.log`, rotated at 10 MB with 5 old files kept |
| `/app/cache` | Intermediate subtitle files and poster thumbnails |
| `/app/backups` | Backups of originals from video restoration. Whole files are copied here, so it must be outside your libraries on a disk with enough space |
| `/media/...` | Video folders, one line per library; the right side must start with `/media` |

Subtitles and video restoration both write into the video folders, so don't mount them read-only. Then add them under **Settings → Media libraries**.

## Optional environment variables

| Variable | Description |
| --- | --- |
| `TZ` | Time zone, e.g. `Asia/Shanghai` |
| `VIDEO_TURBO_LANGUAGE` | Language of pushed notifications (webhooks etc.), `zh-Hans` (default) or `en`. The dashboard follows your browser and can be switched in settings |
| `VIDEO_TURBO_TRUSTED_PROXIES` | When the dashboard sits behind a reverse proxy on another host, the proxy's IPs or ranges (comma-separated) |
| `VIDEO_TURBO_SAFE_MODE` | Set to `"1"` to start without the plugins installed from the dashboard, so they can only be uninstalled. See the [FAQ](../faq/#the-main-app-wont-start-after-installing-a-plugin) |

## Pinning a version

The image defaults to `ghcr.io/videoturbo/videoturbo:latest`, always the newest release. To pin a version, use a version tag such as `ghcr.io/videoturbo/videoturbo:1.2`.
The main app and GPU PCs must run the same version; see [Updating](../update/).
