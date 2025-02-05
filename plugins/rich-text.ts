// import type { DirectiveBinding } from 'vue'
// import { h, render } from 'vue'
// import { Pricetag } from '@vicons/ionicons5'
// import { NButton, NIcon } from 'naive-ui'
//
// export default defineNuxtPlugin(nuxtApp => {
// 	const renderRichText = {
// 		mounted(el: HTMLElement, binding: DirectiveBinding) {
// 			const markers = binding.value.markers
// 			const components = binding.value.components
// 			let innerHTML = el.innerHTML
//
// 			// 渲染标记的组件
// 			for (const marker of markers) {
// 				const regex = new RegExp(
// 					`\\[${marker}(.*?)\\]`,
// 					'g'
// 				)
// 				innerHTML = innerHTML.replace(
// 					regex,
// 					(_, params = '') => {
// 						const paramObj = params
// 							.trim()
// 							.split(' ')
// 							.reduce(
// 								(
// 									acc: Record<string, string>,
// 									param: string
// 								) => {
// 									if (param) {
// 										const [key, value] = param.split('=')
// 										acc[key] = value
// 											? value.replace(/['"]/g, '')
// 											: ''
// 									}
// 									return acc
// 								},
// 								{}
// 							)
// 						const component = components[marker]
// 						const container =
// 							document.createElement('div')
// 						const componentInstance = h(
// 							component,
// 							paramObj
// 						)
// 						render(componentInstance, container)
// 						return container.innerHTML
// 					}
// 				)
// 			}
//
// 			// 处理 #xxx 格式并替换为 NButton 组件
// 			const hashRegex = /#([^#\s]+)/g
// 			innerHTML = innerHTML.replace(
// 				hashRegex,
// 				(match, id) => {
// 					console.log(
// 						'匹配到的 # 标记:',
// 						match,
// 						'ID:',
// 						id
// 					)
// 					const container = document.createElement('div')
//
// 					// 创建 NButton 组件实例
// 					const componentInstance = h(
// 						NButton,
// 						{
// 							onClick: () => {
// 								console.log('点击了 # 标记:', id)
// 								// 使用自定义的路由跳转逻辑
// 								navigateTo({name: 'search', query: {q: id}});
// 							},
// 							text: true,
// 							// tag: 'a',
// 							// href: `/search?q=${id}`,
// 							size: 'tiny',
// 							type: 'info',
// 							target: '_parent',
// 							class: 'color-[--czjB-5] hover-color-[--czjB-4]',
// 							// 绑定事件，保证能够正常触发点击事件
//
// 						},
// 						{
// 							// icon 插槽：显示一个带有 Pricetag 图标的 NIcon
// 							icon: () =>
// 								h(NIcon, null, {
// 									default: () => h(Pricetag)
// 								}),
// 							// 默认插槽：显示 # 后面的文字内容
// 							default: () => `#${id}`
// 						}
// 					)
//
// 					render(componentInstance, container) // 渲染组件到临时 DOM 容器
// 					return container.innerHTML // 返回渲染后的 HTML
// 				}
// 			)
//
// 			el.innerHTML = innerHTML // 更新元素的 innerHTML
// 		}
// 	}
//
// 	// 注册自定义指令
// 	nuxtApp.vueApp.directive('rich-text-render', renderRichText)
// })

import type { DirectiveBinding } from 'vue'
import { h, render } from 'vue'
import { Pricetag } from '@vicons/ionicons5'
import { NButton, NIcon } from 'naive-ui'

export default defineNuxtPlugin(nuxtApp => {
	const renderRichText = {
		mounted(el: HTMLElement, binding: DirectiveBinding) {
			const markers = binding.value.markers
			const components = binding.value.components
			const  emit  = binding.value.bemit
			// 第一次处理：原生标记组件
			const processMarkers = () => {
				// biome-ignore lint/style/useConst: <explanation>
				let tempContainer = document.createElement('div')
				tempContainer.innerHTML = el.innerHTML

				// biome-ignore lint/complexity/noForEach: <explanation>
				markers.forEach(marker => {
					const regex = new RegExp(
						`\\[${marker}(.*?)\\]`,
						'g'
					)
					const walker = document.createTreeWalker(
						tempContainer,
						NodeFilter.SHOW_TEXT
					)
					const textNodes: Text[] = []

					while (walker.nextNode()) {
						const node = walker.currentNode as Text
						if (node.nodeValue?.match(regex)) {
							textNodes.push(node)
						}
					}

					// biome-ignore lint/complexity/noForEach: <explanation>
					textNodes.forEach(textNode => {
						const newFragment =
							document.createDocumentFragment()
						const parent = textNode.parentNode
						if (!parent) return

						const text = textNode.nodeValue || ''
						let lastIndex = 0
						// biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
						let match

						// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
						while ((match = regex.exec(text)) !== null) {
							// 处理前面的文本
							if (match.index > lastIndex) {
								newFragment.appendChild(
									document.createTextNode(
										text.substring(lastIndex, match.index)
									)
								)
							}

							// 创建组件容器
							const params = match[1]
								.trim()
								.split(' ')
								.reduce(
									(
										acc: Record<string, string>,
										param: string
									) => {
										if (param) {
											const [key, value] =
												param.split('=')
											acc[key] = value
												? value.replace(/['"]/g, '')
												: ''
										}
										return acc
									},
									{}
								)

							const container =
								document.createElement('span')
							const component = components[marker]
							const componentInstance = h(
								component,
								params
							)
							render(componentInstance, container)
							newFragment.appendChild(container)

							lastIndex = regex.lastIndex
						}

						// 添加剩余文本
						if (lastIndex < text.length) {
							newFragment.appendChild(
								document.createTextNode(
									text.substring(lastIndex)
								)
							)
						}

						parent.replaceChild(newFragment, textNode)
					})
				})

				el.innerHTML = tempContainer.innerHTML
			}

			// 第二次处理：# 标签
			const processHashTags = () => {
				const walk = (node: Node) => {
					if (node.nodeType === Node.TEXT_NODE) {
						const text = node.nodeValue || ''
						const parent = node.parentNode
						if (
							!parent ||
							parent.nodeName === 'SCRIPT' ||
							parent.nodeName === 'STYLE'
						)
							return

						const regex = /#([^#\s]+)/g
						// biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
						let match
						let lastIndex = 0
						const fragment =
							document.createDocumentFragment()

						// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
						while ((match = regex.exec(text)) !== null) {
							// 添加前面的文本
							if (match.index > lastIndex) {
								fragment.appendChild(
									document.createTextNode(
										text.substring(lastIndex, match.index)
									)
								)
							}

							// 创建按钮组件
							const id = match[1]
							const container =
								document.createElement('span')
							const button = h(
								NButton,
								{
									onClick: () => {
										console.log('点击了 # 标记:', id)
										emit('closeDetail')
										navigateTo({
											name: 'search',
											query: { q: id }
										})
									},
									text: true,
									size: 'tiny',
									type: 'info',
									class:
										'color-[--czjB-5] hover-color-[--czjB-4]'
								},
								{
									icon: () =>
										h(NIcon, null, {
											default: () => h(Pricetag)
										}),
									default: () => `${id}`
								}
							)
							render(button, container)
							fragment.appendChild(container)

							lastIndex = regex.lastIndex
						}

						// 添加剩余文本
						if (lastIndex < text.length) {
							fragment.appendChild(
								document.createTextNode(
									text.substring(lastIndex)
								)
							)
						}

						// 替换原文本节点
						parent.replaceChild(fragment, node)
					} else if (
						node.nodeType === Node.ELEMENT_NODE
					) {
						Array.from(node.childNodes).forEach(walk)
					}
				}

				Array.from(el.childNodes).forEach(walk)
			}

			// 执行处理流程
			processMarkers()
			processHashTags()
		},

		// 组件卸载时清理
		unmounted(el: HTMLElement) {
			// biome-ignore lint/complexity/noForEach: <explanation>
			Array.from(
				el.querySelectorAll('[data-dynamic-component]')
			).forEach(component => {
				render(null, component)
			})
		}
	}

	nuxtApp.vueApp.directive(
		'rich-text-render',
		renderRichText
	)
})
