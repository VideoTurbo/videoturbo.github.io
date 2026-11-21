---
title: Set up a GPU PC
description: Install the speech recognition service on a Windows or Linux GPU PC.
---

First copy a connection code from **Cloud hosts → Add GPU computer** in the dashboard. It contains the main app's connection address and access key.
If the GPU PC is on another network, change the address in that dialog to a public one; see [GPU PC on another network](../remote-network/).

If the main app is the desktop app on a Windows computer with an NVIDIA GPU, you don't need to install anything else: turn on the switch in its tray menu's **Local recognition…**.

## Windows

1. Install the NVIDIA driver first.
2. Download `VideoTurbo-Worker_<version>_x64-setup.exe` from [Releases](https://github.com/VideoTurbo/VideoTurbo/releases/latest) and install it.
3. Open VideoTurbo Worker, paste the connection code and click **Connect**.

It downloads the program environment (about 2 GB) and models (about 4 GB), runs a self-test, then starts taking jobs.
It starts with Windows and only takes jobs while the GPU is idle. The tray menu can pause jobs, open the logs and turn off starting at login.

Windows PCs only provide subtitle recognition; video restoration needs Linux.

:::note[Installed with worker.ps1 before]
`worker.ps1` is no longer provided. In the old project folder run `.\deploy\worker\windows\worker.ps1 stop`,
delete the `VideoTurbo-Worker` task in Task Scheduler, then install VideoTurbo Worker. You can delete the old project folder.
:::

## Linux

Tested with RTX 3090 / 4090 / 5090 on Ubuntu 24.04; driver 525 or newer, 570 or newer for RTX 5090.

Download `video-turbo.zip` from [Releases](https://github.com/VideoTurbo/VideoTurbo/releases/latest), unzip it on the GPU PC
and run the commands below in the unzipped project folder. When asked for the main app address, paste the connection code; the address and key are filled in for you.

```sh
bash deploy/worker/linux/worker.sh install asr
bash deploy/worker/linux/worker.sh start
```

## Check the connection

The first start downloads the models (several GB) and runs a self-test. The PC then shows up under **Connected machines** on the **Cloud hosts** tab.

## Linux commands

Run the script without arguments for an interactive menu, or with a command for automation. Run `help` for every command and option.

| Task | `worker.sh` |
| --- | --- |
| Install or update | `install asr\|restore\|all` |
| Start | `start [asr\|restore\|all]` |
| Stop | `stop [asr\|restore\|all]` |
| Restart | `restart [asr\|restore\|all]` |
| Status | `status` |
| Logs | `logs asr -f` |
| Self-test again | `self-test asr\|restore` |
| Clean up leftovers | `clean` (add `--yes` to delete) |

On Linux, `asr` is subtitle recognition (can run several in parallel) and `restore` is [video restoration](../../features/restore/) (one per machine).
Use `-n N` to set how many recognition workers run: 1–3 on 3090 / 4090, 1–4 on 5090.

## Linux config file

The first install creates `config/worker.yaml` (template: `config/worker.example.yaml` in the project). Common settings:

| Setting | Description |
| --- | --- |
| `server_url` | Main app address, required |
| `worker_token` | Access key, required. Filled in when you paste a connection code during install; also under **Settings → Cloud hosts → Access key** |
| `idle.enabled` | Idle detection: keep `false` on dedicated machines; set `true` on PCs shared with games or desktop work |
| `idle.min_free_memory_mb` | Minimum free VRAM (MB) before taking a job: 8500 suggested for 12 GB cards, 5500 for 8 GB |
| `cache_dir` | Cache folder, `<project>/cache` by default |

Restart the service after editing.
