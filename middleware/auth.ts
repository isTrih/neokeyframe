/*
 * 版权所有(c) Trih(HUA Haohui) 2025 - 2025
 * Copyright (c)Trih(HUA Haohui) 2025 - 2025, All Rights Reserved.
 */
import { InitMenu } from '~/composables/utils'
const { IsLogin } = storeToRefs(useUserStore())
export default defineNuxtRouteMiddleware(() => {
	if (import.meta.server) return
	const eventBus = useEventBus<{type: string, msg: string}>('msg')

	if (!IsLogin.value) {
		// 如果没有登录，跳转到登录页面
		InitMenu('home')
			eventBus.emit({ type: 'error', msg: t('ui.mustLogin') })
		return navigateTo(
			{ path: '/' },
		)
	}
})
