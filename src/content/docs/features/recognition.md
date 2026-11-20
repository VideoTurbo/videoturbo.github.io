---
title: 识别模式
description: 在 Qwen3-ASR 和 Faster-Whisper 之间切换。
---

默认识别模式使用 Qwen3-ASR（基于 [WhisperJAV](https://github.com/meizhong986/WhisperJAV) 的识别流程），
也可以在“系统设置 → 字幕生成”换成 [Faster-Whisper](https://github.com/SYSTRAN/faster-whisper)。切换只影响新任务。

两种模式使用独立的模型与依赖，各自的细节参数在显卡电脑的 `config/worker.yaml` 里：

- `whisperjav` 一节：默认模式的模型、语音切分和超时时间。
- `asr` 一节：Faster-Whisper 模式。12 GB 及以上显存推荐 `large-v3` + `float16`；8 GB 显存改用 `large-v3-turbo` + `int8_float16`。
