/*
 * 版权所有(c) Trih(HUA Haohui) 2025 - 2025
 * Copyright (c)Trih(HUA Haohui) 2025 - 2025, All Rights Reserved.
 */

import {$fetch} from 'ofetch'
import {useRuntimeConfig} from '#app'
import {useUserStore} from '~/stores/useUserStore'
import { e } from 'unocss'

interface RequestOptions {
	[key: string]: any
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

// 请求拦截器
function handleRequest(options: RequestOptions) {
	const { UserInfo } = storeToRefs(useUserStore())
	const userIp = useCookie('user_ip')
	options.headers = {
		...options.headers,
		'Content-Type': 'application/json',
		Authorization: `Bearer ${UserInfo.value.token}`,
		KIP: userIp.value?userIp.value:'unknown',
	}
}
// 修改响应拦截器
function handleResponse(response: any) {
  // 成功响应直接返回数据
  return response?._data || response
}

// 修改请求方法中的catch处理
function createDollarFetchRequest(method: HttpMethod) {
  const eventBus = useEventBus<{type: string, msg: string}>('msg')

  return async (
    url: string,
    data?: any,
    options: RequestOptions = {}
  ) => {
    const baseURL = useRuntimeConfig().public.baseUrl as string
    const fullPath = `${baseURL}${url}`

    try {
      handleRequest(options)
      const response = await $fetch(fullPath, {
        method,
        body: data,
        ...options,
        // 强制解析错误响应
        onResponseError({ response }) {
          // 统一处理HTTP错误
          const error = new Error(response._data?.message || '请求失败') as any
          error.statusCode = response.status
          throw error
        }
      })
      return handleResponse(response)
    } catch (error: any) {
      console.error('[HTTP Error]', error)
      
      // 处理401未授权
      if (error.statusCode === 401) {
        const userStore = useUserStore()
        userStore.UserLogout()
        eventBus.emit({ type: 'info', msg: '登录以获得更好体验！' })
      }
      else if (error.statusCode === 403) {
        eventBus.emit({ type: 'info', msg: '权限不足' })
      }else{
      // 显示错误提示
      const message = error.statusCode === 500 
      ? '服务器内部错误' 
      : error.message || `请求失败 (${error.statusCode})`
      eventBus.emit({ type: 'error', msg: message })     
      }
 
      throw error
    }
  }
}

// 提供 $fetch & HTTP 方法 - 统一管理请求 - 再到组件中使用
export const use$Get = createDollarFetchRequest('GET')
export const use$Post = createDollarFetchRequest('POST')
export const use$Put = createDollarFetchRequest('PUT')
export const use$Delete = createDollarFetchRequest('DELETE')
