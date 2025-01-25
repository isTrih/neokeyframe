// plugins/rich-text.ts
import type {DirectiveBinding} from 'vue'
import {h, render} from 'vue'

export default defineNuxtPlugin(nuxtApp => {
	const renderRichText = {
		mounted(el: HTMLElement, binding: DirectiveBinding) {
			const markers = binding.value.markers
			const components = binding.value.components

			let innerHTML = el.innerHTML

			for (const marker of markers) {
				const regex = new RegExp(`\\[!${marker}(.*?)!\\]`, 'g')
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

			el.innerHTML = innerHTML
		}
	}
	nuxtApp.vueApp.directive('rich-text-render', renderRichText)
})
