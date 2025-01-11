/* eslint-disable @typescript-eslint/no-explicit-any */
import {$fetch} from 'ofetch';
import {useRuntimeConfig} from '#app';

// // region 提示
// import type {ConfigProviderProps} from 'naive-ui'
// import {createDiscreteApi, darkTheme, lightTheme} from 'naive-ui'
// import {computed, ref} from 'vue'

interface RequestOptions {
    [key: string]: any;
}

// region 提示
// const themeRef = ref<'light' | 'dark'>('light')
// const configProviderPropsRef = computed<ConfigProviderProps>(() => ({
//     theme: themeRef.value === 'light' ? lightTheme : darkTheme
// }))
//
// const {message} = createDiscreteApi(
//     ['message'],
//     {
//         configProviderProps: configProviderPropsRef
//     }
// )
// endregion


type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

// 请求拦截器
function handleRequest(options: RequestOptions) {
    const {UserInfo} = storeToRefs(useUserStore())
    options.headers = {
        ...options.headers,
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${UserInfo.value.token}`,
    };
}

// 响应拦截器
function handleResponse(response: any) {
    if (response.error) {
        throw new Error(response.error.message || '响应错误');
    }
    return response;
}

/**
 * 创建请求方法
 * @param method
 */
function createDollarFetchRequest(method: HttpMethod) {
    return async function (
        url: string,
        data?: any,
        options: RequestOptions = {}
    ) {

        const baseURL = useRuntimeConfig().public.baseUrl as string
        const fullPath = `${baseURL}${url}`;

        const requestUrl = new URL(fullPath).toString();

        try {
            handleRequest(options);
            const response = await $fetch(requestUrl, {
                method,
                body: data,
                ...options,
            });
            return handleResponse(response);
        } catch (error) {
            console.error('请求错误:', error);
            throw error;
        }
    };
}

// 提供 $fetch & HTTP 方法 - 统一管理请求 - 再到组件中使用
export const use$Get = createDollarFetchRequest('GET');
export const use$Post = createDollarFetchRequest('POST');
export const use$Put = createDollarFetchRequest('PUT');
export const use$Delete = createDollarFetchRequest('DELETE');
