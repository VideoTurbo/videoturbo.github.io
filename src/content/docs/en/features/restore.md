---
title: Video restoration
description: Restore video with Jasna.
---

Uses [Jasna](https://github.com/Kruk2/jasna) to restore video, on Linux GPU PCs only (driver 580 or newer).

## Install

In the project folder on the GPU PC:

```sh
bash deploy/worker/linux/worker.sh install restore
bash deploy/worker/linux/worker.sh start restore
```

The first start compiles the models, which takes about 15–60 minutes. Each machine runs one restoration service.

## Result

The restored video is named `Movie-U.mp4` and the original moves to the main app's backup folder (`/app/backups`, which must be outside your libraries).

## Notes

- The cache folder must be on a local disk with an ASCII-only path; each video needs about 3× its size, so move `cache_dir` in `config/worker.yaml` to a large disk if needed.
- LTX jobs require activating Jasna with a license and setting `jasna.ltx` to `true`. Activation data is stored in `<project>/jasna/config`; don't share that folder.
- If VRAM runs out, lower `jasna.max_clip_size`, e.g. to 60.
