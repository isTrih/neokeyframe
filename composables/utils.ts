/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */

// src/utils/throttle.ts

/**
 * 节流函数，用于限制函数在指定时间内只能执行一次
 * @param func - 要节流的函数
 * @param wait - 节流的时间间隔（毫秒）
 * @returns 返回一个新的节流函数
 */
export function throttle(func: Function, wait: number): Function {
    let timeoutId: number | null = null;
    let lastExecutedTime = 0;

    return function(this: any, ...args: any[]) {
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

// src/utils/debounce.ts

/**
 * 防抖函数，用于限制异步函数在指定时间内只执行一次
 * @param asyncFunc - 要防抖的异步函数，返回 Promise<void>
 * @param wait - 防抖的时间间隔（毫秒）
 * @returns 返回一个新的防抖异步函数
 */
export function debounce<T extends any[]>(asyncFunc: (...args: T) => Promise<void>, wait: number): (...args: T) => Promise<void> {
    let timeoutId: number | null = null;
    let pendingPromise: Promise<void> | null = null;

    return function(this: any, ...args: T): Promise<void> {
        clearTimeout(timeoutId!);

        // 如果有正在执行的异步操作，取消它
        if (pendingPromise) {
            pendingPromise = null;
        }

        // 设置一个新的定时器
        timeoutId = window.setTimeout(async () => {
            // 执行异步操作
            pendingPromise = asyncFunc.apply(this, args);
            await pendingPromise;
            pendingPromise = null;
        }, wait) as unknown as number;

        // 返回一个立即解析的 Promise，确保返回类型正确
        return Promise.resolve();
    };
}