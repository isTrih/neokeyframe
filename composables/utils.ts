
/*
 * 版权所有(c) Trih(HUA Haohui) 2025 - 2025
 * Copyright (c)Trih(HUA Haohui) 2025 - 2025, All Rights Reserved.
 */

import type {Img} from '~/types/feed';

/**
 * 节流函数，用于限制函数在指定时间内只能执行一次
 * @param func - 要节流的函数
 * @param wait - 节流的时间间隔（毫秒）
 * @returns 返回一个新的节流函数
 */

function  throttle(func: Function, wait: number): Function {
    let timeoutId: number | null = null;
    let lastExecutedTime = 0;

    return function (this: any, ...args: any[]) {
        const now = Date.now();
        const timeSinceLastExecution = now - lastExecutedTime;

        if (!timeoutId && timeSinceLastExecution >= wait) {
            func.apply(this, args);
            lastExecutedTime = now;
        } else {
            clearTimeout(timeoutId!);
            timeoutId = window.setTimeout(() => {  // 使用 window.setTimeout
                lastExecutedTime = now;
                func.apply(this, args);
            }, wait - timeSinceLastExecution) as unknown as number;  // 类型断言
        }
    };
}

/**
 * 防抖原理：一定时间内，只有最后一次操作，再过wait毫秒后才执行函数
 *
 * @param {Function} func 要执行的回调函数
 * @param {number} wait 延时的时间
 * @param {boolean} immediate 是否立即执行
 * @return null
 */
function debounce(func: Function, wait = 500, immediate = false) {
    let timeout: number | null = null;

    return (...args: any[]) => {
        if (timeout !== null) {
            clearTimeout(timeout);
        }

        if (immediate) {
            const callNow = !timeout;
            timeout = setTimeout(() => {
                timeout = null;
            }, wait) as unknown as number;

            if (callNow) {
                typeof func === 'function' && func(...args);
            }
        } else {
            timeout = setTimeout(() => {
                typeof func === 'function' && func(...args);
            }, wait) as unknown as number;
        }
    };
}


/**
 * 移动端判断
 * @return {boolean} 判断是否为移动端
 */
function isMobile(): boolean {
    const userAgent = navigator.userAgent

    // 检查常见的移动端设备标识符
    const mobileRegex = /(Android |iPhone |iPad |iPod |BlackBerry |WindowsPhone |IEMobile |OperaMini)/i;
    return mobileRegex.test(userAgent);
}

/**
 * 关注、粉丝数量格式化
 *
 * @param {number} num 原始数据
 * @return {string} 格式化数据
 */
const numFormat = (num: number): string => {
    if (num > 10000) {
        // 将 num 除以 10000 并保留一位小数
        const formattedNum = (num / 10000).toFixed(1);
        return `${formattedNum}${t('ui.w')}`;
    }
    return num.toString();
};

// 属地格式化
const ipLocationFormat = (input: string): string => {
    if(input==='未知'||input===''){
        return t('ui.unknown')
    }
    // 第一步：去掉 "\t" 后面的文字包括 "\t"
    const firstStepResult = input.split("\t")[0];
    // 第二步：删除从左往右数最后一个 "-" 前的文字（包括 -）
    const lastDashIndex = firstStepResult.lastIndexOf("–");
    if (lastDashIndex !== -1) {
        return firstStepResult.slice(lastDashIndex + 1);
    }
    return firstStepResult;
}
const avatarUrl = (avatar :string): string =>{
    if (avatar === 'avatar.jpg')
        return useRuntimeConfig().public.imgUrl+'/default/avatar.jpg-o'
    else
    return useRuntimeConfig().public.imgUrl+'/avatar/'+avatar+'-o'
}

const imgUrl = (img :string, watermark: string = ''): string =>{
    return useRuntimeConfig().public.imgUrl+'/img/'+img+'-d'
    // (watermark ? `?watermark/2/text/${toUrlSafeBase64('关键帧号：'+watermark)}/font/5oCd5rqQ6buR5L2T/fontsize/480/fill/I2ZmZmZmZg==/dissolve/90/gravity/SouthEast/dx/110/dy/60` : '')
}

const InitMenu = (to :string) => {
    const { CurrentMenu } = storeToRefs(useConfigStore())
    CurrentMenu.value = to
    console.log('更新菜单：',to)
}

function removeImgById(items: Img[], id: string): Img[] {
    // 创建一个 Map，将数组元素存储到 Map 中，键为 id，值为对象
    const itemMap = new Map<string, Img>();
    items.forEach(item => itemMap.set(item.id, item));
    // 根据 id 从 Map 中删除对应的对象
    itemMap.delete(id);
    // 将 Map 中的值转换为数组
    return Array.from(itemMap.values());
}

//字符串转换成安全的 Base64
function toUrlSafeBase64(input: string): string {
    let base64: string;
    if (typeof window === 'undefined') {
        // Node.js 环境
        const buffer = Buffer.from(input, 'utf8');
        base64 = buffer.toString('base64');
    } else {
        // 浏览器环境
        const encoder = new TextEncoder();
        const bytes = encoder.encode(input);
        const binary = Array.from(bytes, (byte) => String.fromCharCode(byte)).join('');
        base64 = btoa(binary);
    }
    // 将 + 替换为 -
    base64 = base64.replace(/\+/g, '-');
    // 将 / 替换为 _
    base64 = base64.replace(/\//g, '_');
    // 移除填充字符 =
    base64 = base64.replace(/=/g, '');
    return base64;
}
export {
    throttle,
    numFormat,
    debounce,
    isMobile,
    ipLocationFormat,
    avatarUrl,
    imgUrl,
    InitMenu,
    removeImgById,
    toUrlSafeBase64
};