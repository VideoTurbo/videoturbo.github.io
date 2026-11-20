---
title: 在显卡电脑上安装服务
description: 在 Windows 或 Linux 显卡电脑上安装语音识别服务。
---

从 [Releases](https://github.com/VideoTurbo/VideoTurbo/releases/latest) 下载 `video-turbo.zip` 解压到显卡电脑，
在解压出的项目文件夹里运行下面的命令，按提示填写主程序地址和接入密钥。

主程序地址是主程序的控制台地址（不是 Emby 地址），局域网示例：`http://192.168.1.10:8765`。
显卡电脑和主程序不在同一局域网时，见[显卡电脑不在同一局域网](../remote-network/)。

## Windows

在 PowerShell 中运行：

```powershell
Set-ExecutionPolicy -Scope Process Bypass
.\deploy\worker\windows\worker.ps1
```

在菜单里选“安装”，再选“启动”。没有 Python 3.11 时运行 `worker.ps1 install -InstallPython` 自动安装。
装好后登录 Windows 会自动在后台启动，并且只在显卡空闲时接任务。

Windows 电脑只提供字幕识别服务；影片修复仅支持 Linux。

## Linux

适配 RTX 3090 / 4090 / 5090，推荐 Ubuntu 24.04，驱动 525 以上，5090 需要 570 以上。

```sh
bash deploy/worker/linux/worker.sh install asr
bash deploy/worker/linux/worker.sh start
```

## 确认连上

第一次启动会下载模型（几个 GB）并自检。控制台“云主机”页的“已接入的机器”里出现这台电脑就说明连上了。

## 常用命令

不带参数运行脚本会进入交互式菜单；带命令运行适合自动化。运行 `help` 可查看全部命令和选项。

| 命令 | Windows `worker.ps1` | Linux `worker.sh` |
| --- | --- | --- |
| 安装或更新 | `install` | `install asr\|restore\|all` |
| 启动 | `start` | `start [asr\|restore\|all]` |
| 停止 | `stop` | `stop [asr\|restore\|all]` |
| 重启 | `restart` | `restart [asr\|restore\|all]` |
| 查看状态 | `status` | `status` |
| 查看日志 | `logs -Follow` | `logs asr -f` |
| 重新自检 | `self-test` | `self-test asr\|restore` |
| 清理残留 | `clean`（加 `-Yes` 删除） | `clean`（加 `--yes` 删除） |
| 卸载 | `uninstall`（保留模型、配置和日志） | — |

Linux 上 `asr` 是字幕识别（可多路并行），`restore` 是[影片修复](../../features/restore/)（每台一个）。
用 `-n N` 指定字幕并行路数：3090 / 4090 为 1～3，5090 为 1～4。

## 配置文件

安装脚本首次安装时会生成 `config/worker.yaml`（模板见项目里的 `config/worker.example.yaml`），常用项：

| 配置项 | 说明 |
| --- | --- |
| `server_url` | 主程序地址，必填 |
| `worker_token` | 接入密钥，从控制台“系统设置 → 云主机 → 接入密钥”复制，必填 |
| `idle.enabled` | 空闲检测：专用机器保持 `false`；和游戏、桌面共用的电脑改为 `true`。Windows 脚本首次创建配置时会自动改为 `true` |
| `idle.min_free_memory_mb` | 至少剩余这些显存（MB）才接单：12 GB 显卡建议 8500，8 GB 显卡建议 5500 |
| `cache_dir` | 缓存目录，默认 `<项目>/cache` |

改完后重启服务生效。
