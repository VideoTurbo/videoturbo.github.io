---
title: 安装主程序
description: 用 Docker Compose 安装 VideoTurbo 主程序。
---

主程序只需要一个 `docker-compose.yml` 文件。

## 安装

1. 从 [Releases](https://github.com/VideoTurbo/VideoTurbo/releases/latest) 下载 `docker-compose.example.yml`，放进一个新建的文件夹，改名为 `docker-compose.yml`。
2. 把里面的 `/path/to/your/media` 改成影片所在的文件夹，并按需修改时区 `TZ`。
3. 在该文件夹里启动：

   ```sh
   docker compose up -d
   ```

4. 浏览器打开 `http://主程序的IP:8765`，设置管理口令（至少 8 位）。

:::caution
谁先打开控制台谁设置管理口令，装好后请马上完成。
:::

其余设置（媒体库、翻译模型、媒体服务器、通知、插件、接入密钥等）都在控制台里修改，保存在 `./data` 的数据库中，立即生效。

## 端口

| 端口 | 用途 |
| --- | --- |
| `8765` | 网页控制台。左边是访问用的端口，可以改；右边不要改。 |
| `8766` | 机器接入端口，只给自己安装的显卡电脑用。见[显卡电脑不在同一局域网](../remote-network/)。 |

:::danger
不要把 8765 端口直接映射到公网。
:::

## 目录

| 容器内路径 | 内容 |
| --- | --- |
| `/app/data` | 数据库 |
| `/app/logs` | 主程序日志 `server.log`，满 10 MB 轮换，保留 5 个旧文件 |
| `/app/cache` | 字幕中间文件和海报缩略图 |
| `/app/backups` | 影片修复的原片备份。原片会整份复制过来，必须在媒体库之外，并选空间足够的盘 |
| `/media/...` | 影片目录，每个媒体库一行，右边必须以 `/media` 开头 |

写字幕和影片修复都要往影片文件夹里写文件，影片目录不要设成只读。加好后到控制台“系统设置 → 媒体库”添加。

## 可选环境变量

| 变量 | 说明 |
| --- | --- |
| `TZ` | 服务时区，例如 `Asia/Shanghai` |
| `VIDEO_TURBO_LANGUAGE` | 推送通知（Webhook 等）的语言，`zh-Hans`（默认）或 `en`。控制台界面跟随浏览器，可在设置里切换 |
| `VIDEO_TURBO_TRUSTED_PROXIES` | 控制台放在反向代理之后、且代理不在本机时，填写代理的 IP 或网段（逗号分隔） |
| `VIDEO_TURBO_SAFE_MODE` | 设为 `"1"` 时启动不加载控制台里装的插件，只能卸载。见[常见问题](../faq/#装了插件后主程序打不开) |

## 固定版本

镜像默认用 `ghcr.io/videoturbo/videoturbo:latest`，始终是最新正式版。想固定版本时写成版本号，例如 `ghcr.io/videoturbo/videoturbo:1.2`。
主程序和显卡电脑要用同一版本，见[更新](../update/)。
