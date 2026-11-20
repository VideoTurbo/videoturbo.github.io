---
title: 更新
description: 更新主程序和显卡电脑上的服务。
---

:::caution
主程序和显卡电脑要一起更新，版本不一致时机器无法接入。
:::

## 主程序

在 `docker-compose.yml` 所在的文件夹运行：

```sh
docker compose pull && docker compose up -d
```

数据会保留，数据库自动升级。

## 显卡电脑

下载新版 `video-turbo.zip`，**合并覆盖**到原来的项目文件夹，再运行一次安装。

**Windows**（项目文件夹的 PowerShell 中）：

```powershell
.\deploy\worker\windows\worker.ps1 install
.\deploy\worker\windows\worker.ps1 start
```

**Linux**（装了影片修复时用 `install all`）：

```sh
bash deploy/worker/linux/worker.sh install asr
bash deploy/worker/linux/worker.sh start
```
