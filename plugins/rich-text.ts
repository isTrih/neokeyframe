// plugins/rich-text.ts
import type {DirectiveBinding} from 'vue'
import {h, render} from 'vue'

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

			// 处理 #xxx 格式并替换为 a 标签
			const hashRegex = /#([^#\s]+)/g;
			innerHTML = innerHTML.replace(hashRegex, (match, id) => {
				console.log('匹配到的 # 标记:', match, 'ID:', id);
				const container = document.createElement('div');
				// 生成 a 标签的样式
				const linkStyle = 'text-decoration: none;';
				const linkHref = `/frame/tag/${id}`;
				const linkElement = document.createElement('a');
				linkElement.href = linkHref;
				linkElement.style.cssText = linkStyle;
				linkElement.textContent = `#${id}`;
				// 添加类名
				linkElement.classList.add('color-[--czjB-5]');
				// 添加到容器
				container.appendChild(linkElement);

				return container.innerHTML;
			});

			console.log('处理后的 HTML:', innerHTML);
			el.innerHTML = innerHTML;
		}
	}
	nuxtApp.vueApp.directive('rich-text-render', renderRichText)
})
