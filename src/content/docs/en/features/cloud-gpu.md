---
title: Cloud GPU
description: Rent cloud GPUs on demand, or join any Linux GPU host over SSH.
---

Rent GPUs on demand from the **Cloud hosts** tab; the main app installs the service on the host for you.

## How it connects

The main app logs in to the host over SSH to install the service and keeps an SSH reverse tunnel open: the service on the host connects to its own `127.0.0.1:8766`, and the traffic travels back to the main app through the tunnel.
The main app only needs SSH access to the host, with **no public IP or port forwarding**.

The main app records the host's SSH host key on first connection and refuses to connect if it later changes. If the host's system was reinstalled, choose to trust the new identity and reinstall on the job.

## Billing and shutdown

:::caution
Billing starts as soon as a host is rented.
:::

Hosts rented through a platform plugin can be bound to shut down automatically when jobs finish.

## Manual SSH

The built-in **Manual SSH** joins any Linux GPU host that offers SSH login, without a platform API: start the host on the platform's website,
enter its address, port, user and password in the main app, and the main app installs the service and opens the tunnel over SSH.

- The login user doesn't have to be root; missing system packages are installed with root or passwordless sudo.
- Without a platform API it **can't start, stop, destroy or snapshot** the host and has no automatic shutdown; do that on the platform yourself.
- If the platform restarts the host and its address or port changes, add it again.

## More platforms

Other cloud platforms are added with [plugins](../plugins/).
