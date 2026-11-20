---
title: Set up a GPU PC
description: Install the speech recognition service on a Windows or Linux GPU PC.
---

Download `video-turbo.zip` from [Releases](https://github.com/VideoTurbo/VideoTurbo/releases/latest), unzip it on the GPU PC,
and run the commands below in the unzipped project folder. The installer asks for the main app address and the access key.

The main app address is the dashboard address (not your Emby address), e.g. `http://192.168.1.10:8765` on a LAN.
If the GPU PC and the main app are on different networks, see [GPU PC on another network](../remote-network/).

## Windows

In PowerShell:

```powershell
Set-ExecutionPolicy -Scope Process Bypass
.\deploy\worker\windows\worker.ps1
```

Choose “Install”, then “Start”. If Python 3.11 is missing, run `worker.ps1 install -InstallPython`.
It then starts in the background whenever you sign in to Windows and only takes jobs while the GPU is idle.

Windows PCs only provide subtitle recognition; video restoration needs Linux.

## Linux

Tested with RTX 3090 / 4090 / 5090 on Ubuntu 24.04; driver 525 or newer, 570 or newer for RTX 5090.

```sh
bash deploy/worker/linux/worker.sh install asr
bash deploy/worker/linux/worker.sh start
```

## Check the connection

The first start downloads the models (several GB) and runs a self-test. The PC then shows up under **Connected machines** on the **Cloud hosts** tab.

## Common commands

Run the script without arguments for an interactive menu, or with a command for automation. Run `help` for every command and option.

| Task | Windows `worker.ps1` | Linux `worker.sh` |
| --- | --- | --- |
| Install or update | `install` | `install asr\|restore\|all` |
| Start | `start` | `start [asr\|restore\|all]` |
| Stop | `stop` | `stop [asr\|restore\|all]` |
| Restart | `restart` | `restart [asr\|restore\|all]` |
| Status | `status` | `status` |
| Logs | `logs -Follow` | `logs asr -f` |
| Self-test again | `self-test` | `self-test asr\|restore` |
| Clean up leftovers | `clean` (add `-Yes` to delete) | `clean` (add `--yes` to delete) |
| Uninstall | `uninstall` (keeps models, config and logs) | — |

On Linux, `asr` is subtitle recognition (can run several in parallel) and `restore` is [video restoration](../../features/restore/) (one per machine).
Use `-n N` to set how many recognition workers run: 1–3 on 3090 / 4090, 1–4 on 5090.

## Config file

The first install creates `config/worker.yaml` (template: `config/worker.example.yaml` in the project). Common settings:

| Setting | Description |
| --- | --- |
| `server_url` | Main app address, required |
| `worker_token` | Access key from **Settings → Cloud hosts → Access key**, required |
| `idle.enabled` | Idle detection: keep `false` on dedicated machines; set `true` on PCs shared with games or desktop work. The Windows script sets it to `true` when it first creates the config |
| `idle.min_free_memory_mb` | Minimum free VRAM (MB) before taking a job: 8500 suggested for 12 GB cards, 5500 for 8 GB |
| `cache_dir` | Cache folder, `<project>/cache` by default |

Restart the service after editing.
