# VideoTurbo 官网

[VideoTurbo](https://github.com/VideoTurbo/VideoTurbo) 的文档站 <https://videoturbo.github.io/>，用 [Astro Starlight](https://starlight.astro.build/) 搭建，推送到 `main` 后由 GitHub Actions 部署到 GitHub Pages。

## 本地预览

```sh
npm install
npm run dev
```

## 目录

- `src/content/docs/`：简体中文页面（默认语言）
- `src/content/docs/en/`：英文页面，和中文页面一一对应，改一边时同步改另一边
- `src/assets/`：截图和图标
- `astro.config.mjs`：站点地址、侧边栏和语言配置

## 换成自有域名

1. 在 `astro.config.mjs` 里把 `SITE` 改成 `https://你的域名`。
2. 新建 `public/CNAME`，内容是域名。
3. 在仓库 Settings → Pages 填写自定义域名，并在域名服务商处配置 DNS。
