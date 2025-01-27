// https://nuxt.com/docs/api/configuration/nuxt-config
// 引入unplugin-auto-import插件，用于naive-ui组件自动导入
import AutoImport from 'unplugin-auto-import/vite'
// 引入unplugin-vue-components插件，用于naive-ui组件自动导入
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { currentLocales } from './i18n/config'
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
			baseUrl: '/apikeyframe'
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
		transpile: ['vueuc','naive-ui'],
		analyze: true,
		sourcemap: {
			server: true,
			client: true
		}
	},
	nitro: {
		routeRules: {
			'/apikeyframe/**': {
				proxy: 'http://apix.checkpoint321.com:8888/v1/**'
			}
		},
		compressPublicAssets: true // 启动压缩
	},
	router: {},
	app: {
		head: {
			title: '关键帧丨每一秒都是关键帧',
			meta: [
				{ charset: 'utf-8' },
				{
					name: 'viewport',
					content:
						'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover'
				}
			],
			link: [],
			script: []
		}
	},
	css: ['~/assets/main.css'],
	compatibilityDate: '2024-11-01',
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
			})
		]
	}
})
