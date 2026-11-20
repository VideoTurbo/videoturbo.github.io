---
title: 常见问题
description: 忘记口令、任务卡住、插件问题和日志查看。
---

## 忘记管理口令？

停止主程序，在 `docker-compose.yml` 所在的文件夹运行下面的命令，再启动主程序重新设置：

```sh
sqlite3 data/app.db "DELETE FROM runtime_settings WHERE key = 'admin_auth';"
```

## 任务一直停在“等待翻译”？

没有可用的翻译模型。到“大模型”页检查 Key、“接收任务”开关和连接测试，修好后自动继续。

## 显卡电脑和主程序不在同一个局域网？

见[显卡电脑不在同一局域网](../remote-network/)。租用的云 GPU 通过 SSH 隧道连接，不受影响。

## 装了插件后主程序打不开？

在 `docker-compose.yml` 的 `environment` 里加 `VIDEO_TURBO_SAFE_MODE: "1"` 重启，卸载这个插件后再删掉这一行。

## 查看日志

```sh
docker compose logs -f orchestrator                 # 主程序（也保存在 logs/server.log）
bash deploy/worker/linux/worker.sh logs asr -f      # Linux 显卡电脑
.\deploy\worker\windows\worker.ps1 logs -Follow     # Windows 显卡电脑
```

## 还有问题？

到 [GitHub Issues](https://github.com/VideoTurbo/VideoTurbo/issues) 提问。安全漏洞请按[安全策略](https://github.com/VideoTurbo/VideoTurbo/security/policy)私密报告。
