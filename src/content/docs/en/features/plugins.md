---
title: Plugins
description: Install cloud platform, media server, cloud storage and notification plugins, or write your own.
---

Install cloud platform, media server, cloud storage and notification plugins from a URL, a local file or a plugin repository under **Settings → Plugins**.

:::danger
Plugins can read every key the main app stores; only install plugins you trust.
:::

## A plugin stops the main app from starting

Add `VIDEO_TURBO_SAFE_MODE: "1"` under `environment` in `docker-compose.yml` and run `docker compose up -d`.
The main app then starts without the plugins installed from the dashboard, which can only be uninstalled. Remove the line after uninstalling the plugin.

## Writing plugins

See the `base.py` of each plugin type under [`src/video_turbo/`](https://github.com/VideoTurbo/VideoTurbo/tree/main/src/video_turbo) in the main repository,
and the examples in [VideoTurboPlugins](https://github.com/VideoTurbo/VideoTurboPlugins).
