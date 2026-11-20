---
title: How it works
description: VideoTurbo has two parts, the main app and GPU PCs.
---

VideoTurbo has two parts:

- **Main app**: runs in Docker on a NAS or an always-on machine. It scans, translates, writes subtitles and serves the dashboard.
- **GPU PC**: a Windows or Linux PC with an NVIDIA GPU that does the speech recognition. It only receives compressed audio, so it doesn't need access to your video folders.

Both can be the same machine. You also need an API key for an LLM translation service (any OpenAI-compatible API, or Google Vertex AI).

## Two ways to connect a GPU machine

| | GPU PC you set up yourself | Cloud host |
| --- | --- | --- |
| Setup | Run `worker.ps1` / `worker.sh` on the PC | The main app installs the service after you rent a host or add one over SSH on the **Cloud hosts** tab |
| Connection | The PC connects to the main app's machine port 8766 | The main app logs in over SSH and opens a reverse tunnel; the host connects back through it |
| Network needs | The PC must be able to reach the main app | The main app only needs SSH access to the host; no public IP or port forwarding |

## Steps

1. [Install the main app](../install-server/)
2. [First-time setup](../first-setup/)
3. [Set up a GPU PC](../install-worker/), or [rent a cloud GPU](../../features/cloud-gpu/) from the dashboard
4. [Generate subtitles](../generate-subtitles/)
