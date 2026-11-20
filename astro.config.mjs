// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// 站点地址。定好自有域名后：SITE 改成 https://你的域名，BASE 改成 '/'，并在 public/ 下新建 CNAME 文件写入域名。
const SITE = 'https://videoturbo.github.io';
const BASE = '/website';

export default defineConfig({
	site: SITE,
	base: BASE,
	integrations: [
		starlight({
			title: 'VideoTurbo',
			description: '给影片库自动生成翻译字幕的自托管工具',
			logo: { src: './src/assets/logo.svg' },
			favicon: '/favicon.svg',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/VideoTurbo/VideoTurbo' }],
			editLink: { baseUrl: 'https://github.com/VideoTurbo/website/edit/main/' },
			lastUpdated: true,
			defaultLocale: 'root',
			locales: {
				root: { label: '简体中文', lang: 'zh-CN' },
				en: { label: 'English', lang: 'en' },
			},
			sidebar: [
				{
					label: '快速开始',
					translations: { en: 'Getting started' },
					items: [
						{ slug: 'guide/introduction' },
						{ slug: 'guide/install-server' },
						{ slug: 'guide/first-setup' },
						{ slug: 'guide/install-worker' },
						{ slug: 'guide/remote-network' },
						{ slug: 'guide/generate-subtitles' },
					],
				},
				{
					label: '进阶功能',
					translations: { en: 'More features' },
					items: [
						{ slug: 'features/recognition' },
						{ slug: 'features/restore' },
						{ slug: 'features/cloud-gpu' },
						{ slug: 'features/cloud-storage' },
						{ slug: 'features/plugins' },
					],
				},
				{
					label: '维护',
					translations: { en: 'Maintenance' },
					items: [{ slug: 'guide/update' }, { slug: 'guide/faq' }],
				},
			],
		}),
	],
});
