---
title: 更新
description: 更新主程序和显卡电脑上的服务。
---

:::caution
主程序和显卡电脑要一起更新，版本不一致时机器无法接入。
:::

## 主程序

**桌面版**：有新版本时托盘菜单会出现“更新到 vX.Y.Z”，点它即可下载安装，装完自动重启。
没出现时可以点托盘菜单“检查更新”。

**Docker**：在 `docker-compose.yml` 所在的文件夹运行：

```sh
docker compose pull && docker compose up -d
```

数据会保留，数据库自动升级。

## 显卡电脑

**Windows（VideoTurbo Worker）**：和桌面版一样，托盘菜单出现“更新到 vX.Y.Z”时点它。更新后会自动更新运行环境。

**Linux**：下载新版 `video-turbo.zip`，**合并覆盖**到原来的项目文件夹，再运行一次安装（装了影片修复时用 `install all`）：

```sh
bash deploy/worker/linux/worker.sh install asr
bash deploy/worker/linux/worker.sh start
```
