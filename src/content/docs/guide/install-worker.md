---
title: 在显卡电脑上安装服务
description: 在 Windows 或 Linux 显卡电脑上安装语音识别服务。
---

先在控制台“云主机 → 添加显卡电脑”复制接入串，里面包含主程序的接入地址和接入密钥。
显卡电脑和主程序不在同一局域网时，在弹窗里把地址改成外网地址，见[显卡电脑不在同一局域网](../remote-network/)。

主程序用桌面版装在有 NVIDIA 显卡的 Windows 电脑上时，不用另外安装：在主程序的托盘菜单“本机识别…”里打开开关即可。

## Windows

1. 先装好 NVIDIA 显卡驱动。
2. 从 [Releases](https://github.com/VideoTurbo/VideoTurbo/releases/latest) 下载 `VideoTurbo-Worker_<版本>_x64-setup.exe` 并安装。
3. 打开 VideoTurbo Worker，粘贴接入串，点“连接”。

它会自动下载运行环境（约 2 GB）和识别模型（约 4 GB）并自检，之后开始接任务。之后开机自动启动，
只在显卡空闲时接任务。托盘菜单里可以暂停接单、查看日志、关闭开机自启。

Windows 电脑只提供字幕识别服务；影片修复仅支持 Linux。

:::note[以前用 worker.ps1 安装过]
新版不再提供 `worker.ps1`。先在旧的项目文件夹里运行 `.\deploy\worker\windows\worker.ps1 stop`，
在“任务计划程序”里删除 `VideoTurbo-Worker` 任务，再安装 VideoTurbo Worker。旧的项目文件夹可以删除。
:::

## Linux

适配 RTX 3090 / 4090 / 5090，推荐 Ubuntu 24.04，驱动 525 以上，5090 需要 570 以上。

从 [Releases](https://github.com/VideoTurbo/VideoTurbo/releases/latest) 下载 `video-turbo.zip` 解压到显卡电脑，
在解压出的项目文件夹里运行下面的命令。询问主程序地址时直接粘贴接入串，地址和密钥都会自动填好。

```sh
bash deploy/worker/linux/worker.sh install asr
bash deploy/worker/linux/worker.sh start
```

## 确认连上

第一次启动会下载模型（几个 GB）并自检。控制台“云主机”页的“已接入的机器”里出现这台电脑就说明连上了。

## Linux 常用命令

不带参数运行脚本会进入交互式菜单；带命令运行适合自动化。运行 `help` 可查看全部命令和选项。

| 命令 | `worker.sh` |
| --- | --- |
| 安装或更新 | `install asr\|restore\|all` |
| 启动 | `start [asr\|restore\|all]` |
| 停止 | `stop [asr\|restore\|all]` |
| 重启 | `restart [asr\|restore\|all]` |
| 查看状态 | `status` |
| 查看日志 | `logs asr -f` |
| 重新自检 | `self-test asr\|restore` |
| 清理残留 | `clean`（加 `--yes` 删除） |

Linux 上 `asr` 是字幕识别（可多路并行），`restore` 是[影片修复](../../features/restore/)（每台一个）。
用 `-n N` 指定字幕并行路数：3090 / 4090 为 1～3，5090 为 1～4。

## Linux 配置文件

安装脚本首次安装时会生成 `config/worker.yaml`（模板见项目里的 `config/worker.example.yaml`），常用项：

| 配置项 | 说明 |
| --- | --- |
| `server_url` | 主程序地址，必填 |
| `worker_token` | 接入密钥，必填。安装时粘贴接入串会自动填好；也可以从控制台“系统设置 → 云主机 → 接入密钥”复制 |
| `idle.enabled` | 空闲检测：专用机器保持 `false`；和游戏、桌面共用的电脑改为 `true` |
| `idle.min_free_memory_mb` | 至少剩余这些显存（MB）才接单：12 GB 显卡建议 8500，8 GB 显卡建议 5500 |
| `cache_dir` | 缓存目录，默认 `<项目>/cache` |

改完后重启服务生效。
