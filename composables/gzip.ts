/*
 * 版权所有(c) Trih(HUA Haohui) 2025 - 2025
 * Copyright (c)Trih(HUA Haohui) 2025 - 2025, All Rights Reserved.
 */

import pako from 'pako';

/**
 * 将字符串转换为 gzip 压缩后的 Base64 编码
 * @param str 要压缩的字符串
 * @returns gzip 压缩后的 Base64 编码字符串，如果出错则返回 null
 */
export function strToGzipBase64(str: string): string | null {
    try {
        // 将字符串转换为 Uint8Array
        const inputBytes: Uint8Array = new TextEncoder().encode(str);
        // 使用 pako 进行 gzip 压缩
        const compressedBytes: Uint8Array = pako.gzip(inputBytes);
        // 将压缩后的字节数组转换为 Base64 编码
        return btoa(String.fromCharCode.apply(null, Array.from(compressedBytes)));
    } catch (error) {
        console.error('压缩或编码过程中出现错误:', error);
        return null;
    }
}

/**
 * 将 gzip 压缩后的 Base64 编码转换为原始字符串
 * @param base64Str gzip 压缩后的 Base64 编码字符串
 * @returns 原始字符串，如果出错则返回 null
 */
export function gzipBase64ToStr(base64Str: string): string | null {
    try {
        // 将 Base64 编码字符串转换为字节数组
        const binaryStr: string = atob(base64Str);
        const bytes: Uint8Array = new Uint8Array(binaryStr.length);
        for (let i = 0; i < binaryStr.length; i++) {
            bytes[i] = binaryStr.charCodeAt(i);
        }
        // 使用 pako 进行 gzip 解压缩
        const decompressedBytes: Uint8Array = pako.ungzip(bytes);
        // 将解压缩后的字节数组转换为字符串
        return new TextDecoder().decode(decompressedBytes);
    } catch (error) {
        console.error('解压缩或解码过程中出现错误:', error);
        return null;
    }
}

// // 示例使用
// const originalStr: string = "Hello, World!";
// const compressedBase64: string | null = strToGzipBase64(originalStr);
// console.log('压缩后的 Base64:', compressedBase64);
//
// if (compressedBase64) {
//     const decompressedStr: string | null = gzipBase64ToStr(compressedBase64);
//     console.log('解压缩后的字符串:', decompressedStr);
// }