/*
 * 版权所有(c) Trih(HUA Haohui) 2025 - 2025
 * Copyright (c)Trih(HUA Haohui) 2025 - 2025, All Rights Reserved.
 */
import {InitMenu} from '~/composables/utils'
const { IsLogin } = storeToRefs(useUserStore())
export default defineNuxtRouteMiddleware(() => {
	if (import.meta.server) return
	if (!IsLogin.value) {
		// 如果没有登录，跳转到登录页面
		return navigateTo(
			{ path: '/' ,query: { redirect: 'auth' } },
			{
				replace: true
			}
		)

	}
})
