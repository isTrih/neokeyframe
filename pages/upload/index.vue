<!--
  - 版权所有(c) Trih(HUA Haohui) 2025 - 2025
  - Copyright (c)Trih(HUA Haohui) 2025 - 2025, All Rights Reserved.
  -->

<script setup lang="ts">
import type {
	UploadFileInfo,
	UploadCustomRequestOptions
} from 'naive-ui'
import type { Img } from '~/types/feed'
import GraphemeSplitter from 'grapheme-splitter'
import { removeImgById } from '~/composables/utils'
import {FeedBPlayer} from '#components';

onMounted(() => {
	InitMenu('upload')
})

//region 上传图片
const fileList = ref<UploadFileInfo[]>([])
const uploadFileData = ref<Img[]>([])
const customRequest = ({
	file,
	onFinish,
	onError,
	onProgress
}: UploadCustomRequestOptions) => {
	// 函数体
	const uploader = uploadFile(file.file, 'img')
	// 上传进度
	uploader.onProgress(progress => {
		onProgress({
			percent: Math.ceil(progress.percent * 100)
		})
	})
	// 上传完成
	uploader.onComplete(result => {
		console.log('上传完成', result)
		const parsedResult = JSON.parse(result)
		const tmpImg: Img = {
			id: file.id,
			key: parsedResult.key,
			height: parsedResult.h,
			width: parsedResult.w
		}
		uploadFileData.value.push(tmpImg)
		console.log('当前列表', uploadFileData.value)
		onFinish()
	})
	// 上传失败
	uploader.onError(error => {
		console.log('上传失败', error)
		onError()
	})
	uploader.start()
}
const remove = ({ file }) => {
  console.log('删除', file)
  uploadFileData.value = removeImgById(uploadFileData.value, file.id)
  console.log('当前列表', uploadFileData.value)
}
//endregion

//region  表单
const splitter = new GraphemeSplitter()

const countGraphemes = (value: string) =>
	splitter.countGraphemes(value)
// endregion
</script>

<template>
  <div class="p-2 h-full w-full">
    <n-tabs type="line" class="pr-4" animated>
      <n-tab-pane name="manager" tab="我的创作">
        创作
      </n-tab-pane>
      <n-tab-pane name="new" tab="发布图文">
        <n-flex vertical justify-center align-center>
          <div>
            <n-text size="large">图片上传</n-text>
            <n-text>{{uploadFileData.length}}/12</n-text>
          </div>
          <n-upload
              accept="image/*"
              list-type="image-card"
              :max="12"
              :on-remove="remove"
              multiple
              :custom-request="customRequest"
              v-model:file-list="fileList"
          >
            上传图片
          </n-upload>
        </n-flex>
        <n-input
            placeholder="一个好标题是成功的开始"
            round maxlength="20" show-count clearable />
        <n-input
            class="h-26rem"
            placeholder="随便写点什么，但是你得遵守规则。"
            round maxlength="1101" type="textarea" show-count clearable/>
      </n-tab-pane>
    </n-tabs>

  </div>
</template>

<style scoped></style>
