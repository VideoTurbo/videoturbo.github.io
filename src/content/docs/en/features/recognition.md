---
title: Recognition mode
description: Switch between Qwen3-ASR and Faster-Whisper.
---

The default recognition mode uses Qwen3-ASR (with the [WhisperJAV](https://github.com/meizhong986/WhisperJAV) pipeline).
You can switch to [Faster-Whisper](https://github.com/SYSTRAN/faster-whisper) under **Settings → Subtitles**. Only new jobs are affected.

The two modes use separate models and dependencies. Their detailed settings live in `config/worker.yaml` on the GPU PC:

- `whisperjav`: model, speech segmentation and timeout of the default mode.
- `asr`: the Faster-Whisper mode. With 12 GB of VRAM or more use `large-v3` + `float16`; with 8 GB use `large-v3-turbo` + `int8_float16`.
