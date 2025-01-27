import Link from '~/components/menu/link.vue'
import {t} from '~/composables/i18n'
// 抽离 title 和 url 到一个数组中，方便添加内容
const linkData = [
	{ title: t('flink.qys'), url: 'http://www.pbanimation.club/' },
	{ title: t('flink.dhn'), url: 'http://www.kjjcg.com/' },
	{ title: t('flink.Macwk'), url: 'https://macwk.com.cn/' },
	{ title: t('flink.lys'), url: 'https://lolitalibrary.com/' },
	{ title: t('flink.ylm'), url: '/doc/socialrule' }
]

// 组装成 fLink
export const fLink = linkData.map(item => {
	return {
		type: 'render',
		render: () => {
			return h(Link, {
				title: item.title,
				icon: false,
				thin: false,
				url: item.url
			})
		},
		show: true
	}
})
// 组装成 fLinkThin 用于窄屏幕比例
export const fLinkThin = linkData.map(item => {
	return {
		type: 'render',
		render: () => {
			return h(Link, {
				title: item.title,
				icon: false,
				thin: true,
				url: item.url
			})
		},
		show: true
	}
})
