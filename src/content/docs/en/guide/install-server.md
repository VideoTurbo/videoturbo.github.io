---
title: Install the main app
description: Install the VideoTurbo main app as a desktop app or with Docker Compose.
---

There are two ways to install the main app:

- **Desktop app** (Windows / macOS): installs like any other program, good for an always-on computer. A Windows computer with an NVIDIA GPU can also act as the GPU PC.
- **Docker**: good for a NAS; only needs one `docker-compose.yml` file.

## Desktop app

1. Download the installer from [Releases](https://github.com/VideoTurbo/VideoTurbo/releases/latest):
   `VideoTurbo_<version>_x64-setup.exe` for Windows, `VideoTurbo_<version>_aarch64.dmg` for Macs with Apple silicon.
2. Open VideoTurbo after installing. It stays in the tray (the menu bar on a Mac) and opens the dashboard window.
   Closing the window doesn't stop processing; choose **Quit** in the tray menu to stop it.
3. The dashboard window on this computer needs no password. To open the dashboard from a phone or another computer,
   set an admin password under **Settings → Account**, then tick **Allow other devices on the local network to open the console** in the tray menu's **Settings…**.
4. Add video folders under **Settings → Libraries**: any drive on Windows; external drives and network shares are under `/Volumes` on a Mac.
5. On a Windows computer with an NVIDIA GPU, the first start asks whether to turn on local recognition; with it on, you don't need a separate GPU PC.
   You can also turn it on later with the switch in the tray menu's **Local recognition…**. When turning it on, pick the models to download (those the current recognition mode needs are ticked), then download now or later.
   What gets downloaded is listed under [Program environment and models](../install-worker/#program-environment-and-models); manage it in the model list of the **Local recognition…** window.
   On a Mac, local recognition uses the CPU and is much slower.

:::note[Blocked the first time you open it]
The installers aren't code-signed yet. If macOS says the developer can't be verified, click **Open Anyway** under **System Settings → Privacy & Security**;
if Windows SmartScreen appears, click **More info → Run anyway**.
:::

Ports, local network access, the restoration backup folder and safe mode are in the tray menu's **Settings…**; everything else is in the dashboard.
Data is kept in `%LOCALAPPDATA%\VideoTurbo` on Windows and `~/Library/Application Support/VideoTurbo` on a Mac.
When a new version is out, the tray menu shows **Update to vX.Y.Z**; see [Update](../update/).

## Docker

### Install

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

### Ports

| Port | Purpose |
| --- | --- |
| `8765` | Web dashboard. The left side is the port you open in the browser and can be changed; don't change the right side. |
| `8766` | Machine port, only for GPU PCs you set up yourself. See [GPU PC on another network](../remote-network/). |

:::danger
Never expose port 8765 to the internet.
:::

### Folders

| Path in the container | Contents |
| --- | --- |
| `/app/data` | Database |
| `/app/logs` | Main app log `server.log`, rotated at 10 MB with 5 old files kept |
| `/app/cache` | Intermediate subtitle files and poster thumbnails |
| `/app/backups` | Backups of originals from video restoration. Whole files are copied here, so it must be outside your libraries on a disk with enough space |
| `/media/...` | Video folders, one line per library; the right side must start with `/media` |

Subtitles and video restoration both write into the video folders, so don't mount them read-only. Then add them under **Settings → Media libraries**.

### Optional environment variables

| Variable | Description |
| --- | --- |
| `TZ` | Time zone, e.g. `Asia/Shanghai` |
| `VIDEO_TURBO_LANGUAGE` | Language of pushed notifications (webhooks etc.), `zh-Hans` (default) or `en`. The dashboard follows your browser and can be switched in settings |
| `VIDEO_TURBO_TRUSTED_PROXIES` | When the dashboard sits behind a reverse proxy on another host, the proxy's IPs or ranges (comma-separated) |
| `VIDEO_TURBO_SAFE_MODE` | Set to `"1"` to start without the plugins installed from the dashboard, so they can only be uninstalled. See the [FAQ](../faq/#the-main-app-wont-start-after-installing-a-plugin) |

### Pinning a version

The image defaults to `ghcr.io/videoturbo/videoturbo:latest`, always the newest release. To pin a version, use a version tag such as `ghcr.io/videoturbo/videoturbo:1.2`.
The main app and GPU PCs must run the same version; see [Updating](../update/).
