/*
 * 版权所有(c) Trih(HUA Haohui) 2025 - 2025
 * Copyright (c)Trih(HUA Haohui) 2025 - 2025, All Rights Reserved.
 */

// https://nuxt.com/docs/api/configuration/nuxt-config
// 引入unplugin-auto-import插件，用于naive-ui组件自动导入
import AutoImport from 'unplugin-auto-import/vite'
// 引入unplugin-vue-components插件，用于naive-ui组件自动导入
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { currentLocales } from './i18n/config'
import removeConsole from 'vite-plugin-remove-console'
export default defineNuxtConfig({
	plugins: [
		{
			src: '~/plugins/rich-text.ts',
			mode: 'client'
		},
		{ src: '~/plugins/solve-style.ts', mode: 'server' }
	],
	runtimeConfig: {
		public: {
			baseUrl: '/apikeyframe',
			imgUrl: 'https://cdn.checkpoint321.com'
		}
	},
	i18n: {
		locales: currentLocales,
		defaultLocale: 'zh-cn',
		strategy: 'no_prefix',
		// 启用浏览器语言检测，以便在访问者第一次访问您的站点时自动将其重定向到首选语言环境。
		detectBrowserLanguage: {
			// 启动 cookie
			useCookie: true,
			// 用于存储当前语言环境的变量名
			cookieKey: 'i18n_redirected',
			// (建议用于改进SEO) -仅检测站点根路径(/)上的浏览器区域设置。只有当使用策略而不是“no_prefix”时才有效。
			redirectOn: 'root'
		},
		vueI18n: './i18n.config.ts' // if you are using custom path, default
	},
	// vueuse
	vueuse: {
		ssrHandlers: true
	},
	build: {
		transpile: ['vueuc', 'naive-ui', '@nuxt/console'],
		analyze: false
	},
	nitro: {
		routeRules: {
			'/apikeyframe/**': {
				proxy: 'http://127.0.0.1:8888/v1/**'
			},
			'/proapi/**': {
				proxy: 'http://172.18.0.7:8888/v1/**'
			}
		},
		compressPublicAssets: true // 启动压缩
	},
	router: {},
	app: {
		head: {
			meta: [
				{
					name: 'keywords',
					content:
						'关键帧社区, 关键帧, keyframe ani, checkpoint321, checkpoint, 关键帧动画'
				},
				{
					name: 'description',
					content:
						'无论你是创作者还是爱好者，这里都是你的家'
				}
			],
			link: [
				{
					rel: 'icon',
					type: 'image/x-icon',
					href: 'favicon.ico'
				}
			],
			script: [
				{
					src: 'https://fe-static.xhscdn.com/biz-static/goten/xhs-1.0.1.js'
				}
			]
		}
	}, // SEO 配置
	site: {
		url: 'https://checkpoint321.com',
		name: '关键帧',
		description:
			'无论你是创作者还是爱好者，这里都是你的家',
		defaultLocale: 'zh-cn',
		exclude: ['/admin/**'], // 过滤不需要的 url
		cacheMaxAgeSeconds: 2 * 3600, // 缓存时间一天
		autoLastmod: true // 自动检测每个 URL 的 lastmod 日期
	},
	css: ['~/assets/main.css'],
	compatibilityDate: '2025-02-01',
	devtools: { enabled: true },
	// typescript 配置
	typescript: {
		// 启用项目启动运行或构建时自动类型检查
		typeCheck: true,
		// 开启严格模式
		strict: false
	},
	modules: [
		'@unocss/nuxt',
		'nuxtjs-naive-ui',
		'@pinia/nuxt',
		'pinia-plugin-persistedstate',
		'@vueuse/nuxt',
		'@nuxtjs/i18n',
		'@nuxtjs/seo'
	],
	pinia: {
		storesDirs: [
			'./stores/**',
			'./custom-folder/stores/**'
		]
	},
	// vite 构建工具配置
	vite: {
		ssr: {
			noExternal: ['naive-ui', 'vueuc', 'date-fns']
		},
		build: {
			sourcemap: true
		},
		// vite 插件配置
		plugins: [
			// 引入unplugin-auto-import插件，用于naive-ui组件自动导入
			AutoImport({
				imports: [
					{
						'naive-ui': [
							'useDialog',
							'useMessage',
							'useNotification',
							'useLoadingBar'
						]
					}
				]
			}),
			Components({
				resolvers: [NaiveUiResolver()]
			}),
			// 用于移除控制台输出
			removeConsole()
		]
	}
})
