// https://nuxt.com/docs/api/configuration/nuxt-config
// 引入unplugin-auto-import插件，用于naive-ui组件自动导入
import AutoImport from 'unplugin-auto-import/vite';
// 引入unplugin-vue-components插件，用于naive-ui组件自动导入
import {NaiveUiResolver} from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';

// 运行或构建项目时，能够自动执行 ESLint 代码检查和修复的插件
export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            baseUrl: 'https://api.checkpoint321.com/v1'
        }
    },
    build: {
        transpile: ['vueuc'],
        analyze: false
    },
    nitro: {
        compressPublicAssets: true // 启动压缩
    },
    // ssr: true,
    router: {},
    app: {
        head: {
            title: '关键帧丨每一秒都是关键帧',
            meta: [{charset: 'utf-8'},
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover'
                }],
            link: [],
            script: []
        }
    },
    css: ['~/assets/main.css'],
    // srcDir: 'src/',
    compatibilityDate: '2024-11-01',
    devtools: {enabled: true},
    // typescript 配置
    typescript: {
        // 启用项目启动运行或构建时自动类型检查
        typeCheck: true,
        // 开启严格模式
        strict: true
    },
    modules: [
        '@unocss/nuxt',
        'nuxtjs-naive-ui',
        '@nuxt/eslint',
        '@pinia/nuxt',
        'pinia-plugin-persistedstate',
        '@vueuse/nuxt'
    ],
    pinia: {
        storesDirs: ['./stores/**', './custom-folder/stores/**']
    },
    // vite 构建工具配置
    vite: {
        // vite 插件配置
        plugins: [
            // 引入unplugin-auto-import插件，用于naive-ui组件自动导入
            AutoImport({
                imports: [
                    {
                        'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar']
                    }
                ]
            }),
            Components({
                resolvers: [NaiveUiResolver()]
            })
        ]
    }
});
