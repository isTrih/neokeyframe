// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  // typescript 配置
  typescript: {
    // 启用项目启动运行或构建时自动类型检查
    typeCheck: true,
    // 开启严格模式
    strict: true
  },
  modules: [
    '@unocss/nuxt',
  ],
})
