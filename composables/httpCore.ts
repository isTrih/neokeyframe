import {$fetch} from 'ofetch'
import {useRuntimeConfig} from '#app'
import {useUserStore} from '~/stores/useUserStore.ts'

interface RequestOptions {
	[key: string]: any
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

// 请求拦截器
function handleRequest(options: RequestOptions) {
	const { UserInfo } = storeToRefs(useUserStore())
	options.headers = {
		...options.headers,
		'Content-Type': 'application/json',
		Authorization: `Bearer ${UserInfo.value.token}`
	}
}
// 响应拦截器
function handleResponse(response: any) {
	if (response.error) {
		throw new Error(response.error.message || '响应错误')
	}
	return response
}

/**
 * 创建请求方法
 * @param method
 */
function createDollarFetchRequest(method: HttpMethod) {
	return async (
		url: string,
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		data?: any,
		options: RequestOptions = {}
	) => {
		const baseURL = useRuntimeConfig().public.baseUrl as string
		const fullPath = `${baseURL}${url}`

		// const requestUrl = new URL(fullPath).toString();

		try {
			handleRequest(options)
			const response = await $fetch(fullPath, {
				method,
				body: data,
				...options
			})
			return handleResponse(response)
		} catch (error) {
			console.error('请求错误:', error)
			throw error
		}
	}
}

// 提供 $fetch & HTTP 方法 - 统一管理请求 - 再到组件中使用
export const use$Get = createDollarFetchRequest('GET')
export const use$Post = createDollarFetchRequest('POST')
export const use$Put = createDollarFetchRequest('PUT')
export const use$Delete = createDollarFetchRequest('DELETE')
