/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-function-type  */

/* eslint-disable  @typescript-eslint/no-unused-expressions */

/**
 * 节流函数，用于限制函数在指定时间内只能执行一次
 * @param func - 要节流的函数
 * @param wait - 节流的时间间隔（毫秒）
 * @returns 返回一个新的节流函数
 */
function throttle(func: Function, wait: number): Function {
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
        return `${formattedNum}万`;
    }
    return num.toString();
};

export {
    throttle,
    numFormat,
    debounce,
    isMobile,
};