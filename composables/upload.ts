/*
 * 版权所有(c) Trih(HUA Haohui) 2025 - 2025
 * Copyright (c)Trih(HUA Haohui) 2025 - 2025, All Rights Reserved.
 */

import { createMultipartUploadV2Task, type FileData, type UploadConfig,  } from 'qiniu-js';

// 封装好的获取上传图片 token 函数
const imgTokenProvider = async () => {
    const response = await use$Get(`/upload/normal`);
    if (response.code === 0 && response.data && response.data.token) {
        console.log('获取到token', response.data.token);
        return String(response.data.token)
    } else {
        throw new Error('Failed to fetch token');
    }
};
// 封装好的获取上传头像 token 函数
const avatarTokenProvider = async () => {
    const response = await use$Get(`/upload/normal?t=avatar`);
    if (response.code === 0 && response.data && response.data.token) {
        console.log('获取到token', response.data.token);
        return String(response.data.token)
    } else {
        throw new Error('Failed to fetch token');
    }
};// 封装好的获取上传认证文件 token 函数
const vTokenProvider = async () => {
    const response = await use$Get(`/upload/normal?t=v`);
    if (response.code === 0 && response.data && response.data.token) {
        console.log('获取到token', response.data.token);
        return String(response.data.token)
    } else {
        throw new Error('Failed to fetch token');
    }
};

// 创建分片上传任务

const uploadFile = (file :File, t:string)=> {
    // 文件数据
    const fileData: FileData = { type: 'file', data: file }
    // 上传配置
    const config: UploadConfig = {
        tokenProvider: t==='img'?imgTokenProvider:t==='avatar'?avatarTokenProvider:vTokenProvider,
    }
    return createMultipartUploadV2Task(fileData, config);
}

export { uploadFile, myTokenProvider }