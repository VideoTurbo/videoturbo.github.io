---
title: 插件
description: 安装云平台、媒体服务器、网盘和通知插件，或自己编写插件。
---

在“系统设置 → 插件”按地址、本地文件或插件仓库安装云平台、媒体服务器、网盘和通知插件。

:::danger
插件能读取主程序保存的所有密钥，只安装你信任的插件。
:::

## 插件导致主程序打不开

在 `docker-compose.yml` 的 `environment` 里加 `VIDEO_TURBO_SAFE_MODE: "1"` 并运行 `docker compose up -d`，
启动时不加载控制台里装的插件，只能卸载。卸载这个插件后再删掉这一行。

## 编写插件

接口说明见主仓库 [`src/video_turbo/`](https://github.com/VideoTurbo/VideoTurbo/tree/main/src/video_turbo) 下各类插件的 `base.py`，
示例见 [VideoTurboPlugins](https://github.com/VideoTurbo/VideoTurboPlugins)。
