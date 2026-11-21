---
title: 工作方式
description: VideoTurbo 由主程序和显卡电脑两部分组成。
---

VideoTurbo 由两部分组成：

- **主程序**：用 Docker 装在 NAS 上，或用桌面版装在常开的 Windows / Mac 电脑上，负责扫描、翻译、写字幕和网页控制台。
- **显卡电脑**：有 NVIDIA 显卡的 Windows 或 Linux 电脑，负责语音识别。主程序只发压缩后的音频过去，不用共享影片文件夹。

两者可以是同一台机器：桌面版主程序在有 NVIDIA 显卡的 Windows 电脑上可以直接开启“本机识别”。你还需要一个大模型翻译接口的 API Key（OpenAI 兼容接口或 Google Vertex AI）。

## 显卡电脑的两种接入方式

| | 自己安装的显卡电脑 | 云主机 |
| --- | --- | --- |
| 怎么装 | Windows 安装 VideoTurbo Worker；Linux 运行 `worker.sh` | 主程序在“云主机”页租用或通过 SSH 接入后自动安装 |
| 怎么连主程序 | 显卡电脑主动连主程序的机器接入端口 8766 | 主程序用 SSH 登录云主机，建立反向隧道，云主机经隧道连回主程序 |
| 是否需要网络互通 | 显卡电脑要能访问主程序 | 只需要主程序能 SSH 登录云主机，不需要公网 IP 或端口转发 |

## 安装步骤

1. [安装主程序](../install-server/)
2. [首次设置](../first-setup/)
3. [在显卡电脑上安装服务](../install-worker/)，或在控制台[租用云 GPU](../../features/cloud-gpu/)
4. [生成字幕](../generate-subtitles/)
