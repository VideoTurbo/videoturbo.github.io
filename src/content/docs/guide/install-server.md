---
title: 安装主程序
description: 用桌面版或 Docker Compose 安装 VideoTurbo 主程序。
---

主程序有两种装法：

- **桌面版**（Windows / macOS）：像普通软件一样安装，适合常开的电脑。有 NVIDIA 显卡的 Windows 电脑还能直接当显卡电脑用。
- **Docker**：适合 NAS，只需要一个 `docker-compose.yml` 文件。

## 桌面版

1. 从 [Releases](https://github.com/VideoTurbo/VideoTurbo/releases/latest) 下载安装包：
   Windows 用 `VideoTurbo_<版本>_x64-setup.exe`，Mac（Apple 芯片）用 `VideoTurbo_<版本>_aarch64.dmg`。
2. 安装后打开 VideoTurbo。它在托盘（Mac 是菜单栏）里常驻，并打开控制台窗口；关掉窗口不会停止处理，
   从托盘菜单“退出”才会停下。
3. 这台电脑上的控制台窗口不需要口令。要用手机或其他电脑打开控制台，先在控制台“系统设置 → 账户”设定管理口令，
   再在托盘菜单“设置…”里勾选“允许局域网里的其他设备打开控制台”。
4. 到控制台“系统设置 → 媒体库”添加影片文件夹：Windows 可以选任意盘，Mac 的外接硬盘和网络共享在 `/Volumes` 下。
5. 有 NVIDIA 显卡的 Windows 电脑，第一次启动时会弹窗询问是否开启本机识别，开启后就不用另装显卡电脑；
   也可以之后在托盘菜单“本机识别…”里打开开关。开启时先选要下载的模型（默认勾选当前识别模式需要的），再选立即下载或稍后下载。
   要下载的运行环境和模型见[运行环境和模型](../install-worker/#运行环境和模型)，在“本机识别…”窗口的模型清单里管理。
   Mac 上本机识别用 CPU，速度慢很多。

:::note[第一次打开被系统拦截]
安装包暂未做代码签名。Mac 提示“无法验证开发者”时，到“系统设置 → 隐私与安全性”点“仍要打开”；
Windows 弹出 SmartScreen 时点“更多信息 → 仍要运行”。
:::

端口、局域网访问、原片备份文件夹和安全模式都在托盘菜单“设置…”里改，其余设置在控制台里改。
数据保存在 Windows 的 `%LOCALAPPDATA%\VideoTurbo`、Mac 的 `~/Library/Application Support/VideoTurbo`。
有新版本时托盘菜单会出现“更新到 vX.Y.Z”，见[更新](../update/)。

## Docker

### 安装

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

### 端口

| 端口 | 用途 |
| --- | --- |
| `8765` | 网页控制台。左边是访问用的端口，可以改；右边不要改。 |
| `8766` | 机器接入端口，只给自己安装的显卡电脑用。见[显卡电脑不在同一局域网](../remote-network/)。 |

:::danger
不要把 8765 端口直接映射到公网。
:::

### 目录

| 容器内路径 | 内容 |
| --- | --- |
| `/app/data` | 数据库 |
| `/app/logs` | 主程序日志 `server.log`，满 10 MB 轮换，保留 5 个旧文件 |
| `/app/cache` | 字幕中间文件和海报缩略图 |
| `/app/backups` | 影片修复的原片备份。原片会整份复制过来，必须在媒体库之外，并选空间足够的盘 |
| `/media/...` | 影片目录，每个媒体库一行，右边必须以 `/media` 开头 |

写字幕和影片修复都要往影片文件夹里写文件，影片目录不要设成只读。加好后到控制台“系统设置 → 媒体库”添加。

### 可选环境变量

| 变量 | 说明 |
| --- | --- |
| `TZ` | 服务时区，例如 `Asia/Shanghai` |
| `VIDEO_TURBO_LANGUAGE` | 推送通知（Webhook 等）的语言，`zh-Hans`（默认）或 `en`。控制台界面跟随浏览器，可在设置里切换 |
| `VIDEO_TURBO_TRUSTED_PROXIES` | 控制台放在反向代理之后、且代理不在本机时，填写代理的 IP 或网段（逗号分隔） |
| `VIDEO_TURBO_SAFE_MODE` | 设为 `"1"` 时启动不加载控制台里装的插件，只能卸载。见[常见问题](../faq/#装了插件后主程序打不开) |

### 固定版本

镜像默认用 `ghcr.io/videoturbo/videoturbo:latest`，始终是最新正式版。想固定版本时写成版本号，例如 `ghcr.io/videoturbo/videoturbo:1.2`。
主程序和显卡电脑要用同一版本，见[更新](../update/)。
