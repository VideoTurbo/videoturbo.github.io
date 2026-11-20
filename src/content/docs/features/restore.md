---
title: 影片修复
description: 用 Jasna 修复影片画面。
---

用 [Jasna](https://github.com/Kruk2/jasna) 修复画面，仅支持 Linux 显卡电脑（驱动 580 以上）。

## 安装

在显卡电脑的项目文件夹里运行：

```sh
bash deploy/worker/linux/worker.sh install restore
bash deploy/worker/linux/worker.sh start restore
```

首次启动要编译模型，约 15–60 分钟。每台机器只运行一个影片修复服务。

## 结果

修复后的影片命名为 `原片名-U.mp4`，原片移到主程序的备份目录（`/app/backups`，必须在媒体库之外）。

## 注意事项

- 缓存目录要在本机磁盘且路径只含英文；每部影片约占 3 倍体积，空间不够时在 `config/worker.yaml` 里把 `cache_dir` 改到大容量磁盘。
- LTX 系列任务需要用许可证激活 Jasna 后，把 `jasna.ltx` 设为 `true`。许可证激活信息保存在 `<项目>/jasna/config`，不要分享该目录。
- 显存不足时调小 `jasna.max_clip_size`，例如 60。
