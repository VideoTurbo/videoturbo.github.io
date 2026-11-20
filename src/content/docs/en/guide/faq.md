---
title: FAQ
description: Forgotten password, stuck jobs, plugin problems and logs.
---

## Forgot the admin password?

Stop the main app, run this in the folder with `docker-compose.yml`, then start it again and set a new password:

```sh
sqlite3 data/app.db "DELETE FROM runtime_settings WHERE key = 'admin_auth';"
```

## Jobs stuck at “Waiting for translation”?

No translation model is available. On the **Models** tab check the key, the **Accepting jobs** switch and **Test connection**; jobs continue once it works.

## GPU PC and main app on different networks?

See [GPU PC on another network](../remote-network/). Rented cloud GPUs connect through an SSH tunnel and aren't affected.

## The main app won't start after installing a plugin?

Add `VIDEO_TURBO_SAFE_MODE: "1"` under `environment` in `docker-compose.yml`, restart, uninstall the plugin, then remove the line.

## Logs

```sh
docker compose logs -f orchestrator                 # main app (also saved to logs/server.log)
bash deploy/worker/linux/worker.sh logs asr -f      # Linux GPU PC
.\deploy\worker\windows\worker.ps1 logs -Follow     # Windows GPU PC
```

## Still stuck?

Ask on [GitHub Issues](https://github.com/VideoTurbo/VideoTurbo/issues). Report security issues privately as described in the [security policy](https://github.com/VideoTurbo/VideoTurbo/security/policy).
