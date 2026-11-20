---
title: GPU PC on another network
description: How to connect a GPU PC that isn't on the same network as the main app.
---

This page only applies to [GPU PCs you set up yourself](../install-worker/). They connect to the main app, so they must be able to reach it.

[Cloud GPUs](../../features/cloud-gpu/) are installed by the main app over SSH and connect back through an SSH reverse tunnel, with no public IP or port forwarding, so this page doesn't apply to them.

## Recommended: Tailscale

Join the main app's machine and the GPU PC to the same [Tailscale](https://tailscale.com/) (or WireGuard) network,
and use the main app's Tailscale address when setting up the GPU PC.

## If you must go over the internet

:::danger
Never expose port 8765 to the internet.
:::

Expose only the machine port **8766**, behind an HTTPS reverse proxy, and use that HTTPS address when setting up the GPU PC.

## Linux machines can also join over SSH

If the main app can log in to the Linux GPU PC over SSH, you can add it as a cloud host with **Manual SSH** on the **Cloud hosts** tab.
The main app then installs the service and opens the tunnel itself, with no need to expose 8766. See [Cloud GPU · Manual SSH](../../features/cloud-gpu/#manual-ssh) for its limits.
