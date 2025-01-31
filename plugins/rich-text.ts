// plugins/rich-text.ts
import type {DirectiveBinding} from 'vue'
import {h, render} from 'vue'
import {NuxtLink} from '#components'

export default defineNuxtPlugin(nuxtApp => {
	const renderRichText = {
		mounted(el: HTMLElement, binding: DirectiveBinding) {
			const markers = binding.value.markers
			const components = binding.value.components
			const link = binding.value.link
			let innerHTML = el.innerHTML

			for (const marker of markers) {
				const regex = new RegExp(`\\[${marker}(.*?)\\]`, 'g')
				innerHTML = innerHTML.replace(regex, (_, params = '') => {
					const paramObj = params
						.trim()
						.split(' ')
						.reduce((acc: Record<string, string>, param: string) => {
							if (param) {
								const [key, value] = param.split('=')
								acc[key] = value ? value.replace(/['"]/g, '') : ''
							}
							return acc
						}, {})
					const component = components[marker]
					const container = document.createElement('div')
					const componentInstance = h(component, paramObj)
					render(componentInstance, container)
					return container.innerHTML
				})
			}

			// 处理 #xxx 格式并替换为 NuxtLink
			const hashRegex = /#([^#\s]+)/g;
			innerHTML = innerHTML.replace(hashRegex, (match, id) => {
				console.log('匹配到的 # 标记:', match, 'ID:', id);
				const container = document.createElement('div');
				const linkInstance = h(link, {
					to: { name: 'frame-fid', params: { fid:id } }
				}, { default: () => `#${id}` });
				render(linkInstance, container);
				return container.innerHTML;
			});

			console.log('处理后的 HTML:', innerHTML);
			el.innerHTML = innerHTML;
		}
	}
	nuxtApp.vueApp.directive('rich-text-render', renderRichText)
})
