---
title: Generate subtitles
description: Scan videos and submit subtitle jobs.
---

1. Click **Scan videos** at the top. Scanning never starts jobs by itself.
2. Tick videos under **Subtitles → Pending** and click **Generate subtitles**. Try a single video first.
3. The subtitle is saved next to the video, e.g. `Movie.zh.default.srt`. Configured media servers are refreshed automatically.

Videos that already have a target-language subtitle are marked completed; videos with source-language text subtitles are translated without speech recognition.

## Supported languages

| Language | Source | Target | Subtitle file |
| --- | --- | --- | --- |
| Japanese | ✓ | ✓ | `Movie.ja.default.srt` |
| English | ✓ | ✓ | `Movie.en.default.srt` |
| Korean | ✓ | ✓ | `Movie.ko.default.srt` |
| Simplified Chinese | | ✓ | `Movie.zh.default.srt` |
| Traditional Chinese | | ✓ | `Movie.zh-TW.default.srt` |

Each library has its own video and subtitle language, set under **Settings → Media libraries**.
