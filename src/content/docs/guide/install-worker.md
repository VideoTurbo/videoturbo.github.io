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

粘贴后会按主程序当前的识别模式勾选要下载的模型，可以改勾选；再选“连接并立即下载”或“连接，稍后下载”。它会下载运行环境和当前识别模式需要的模型（见[运行环境和模型](#运行环境和模型)）并自检，
之后开始接任务。之后开机自动启动，只在显卡空闲时接任务。托盘菜单里可以暂停接单、查看日志、关闭开机自启。

Windows 电脑只提供字幕识别服务；影片修复仅支持 Linux。

:::note[以前用 worker.ps1 安装过]
新版不再提供 `worker.ps1`。先在旧的项目文件夹里运行 `.\deploy\worker\windows\worker.ps1 stop`，
在“任务计划程序”里删除 `VideoTurbo-Worker` 任务，再安装 VideoTurbo Worker。旧的项目文件夹可以删除。
:::

## 运行环境和模型

VideoTurbo Worker 和主程序的本机识别第一次开启时要下载运行环境（Windows 约 3.6 GB），以及主程序当前识别模式需要的模型。
模型只下载当前模式要用的：

| 识别模式 | 要下载的模型 |
| --- | --- |
| Qwen3-ASR（默认，开启双遍补漏） | Qwen3-ASR + anime-whisper，约 7.2 GB |
| Qwen3-ASR（关闭双遍补漏） | Qwen3-ASR，约 4.4 GB |
| Faster-Whisper | Whisper large-v3，约 2.9 GB |

Qwen3-ASR 和 Whisper 有小版本可选，下载更快、占用更少，识别效果会差一些：Qwen3-ASR 0.6B（约 1.8 GB）；
Whisper large-v3-turbo（约 1.5 GB，效果接近 large-v3）、medium（约 1.4 GB）、small（约 0.45 GB，日语效果明显变差）。
版本在每台电脑的模型清单里选，只影响这台电脑。

窗口里的模型清单列出每个模型的用途、大小和是否已下载：当前模式需要的默认勾选，可以改勾选后点“下载所选”，
不用的模型可以删除。之后在控制台换了识别模式、缺新模式的模型时不会自动下载，窗口和控制台“云主机”页会提示，
点“下载”后才下载；下载好之前这台电脑不接这个模式的任务。

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
