import en from '~/i18n/locales/en.json'
import zh from '~/i18n/locales/zh-cn.json'
import ja from '~/i18n/locales/ja.json'

export default defineI18nConfig(() => ({
  legacy: false, // 是否兼容之前
  fallbackLocale: 'zh-cn', // 区配不到的语言就用en
  messages: {
    'en': en,
    'zh-cn': zh,
    'ja': ja,
  },
}))
