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
const { IsSmall } = storeToRefs(useConfigStore())
const heightClass = computed(() => {
	return IsSmall.value
		? 'h-[calc(100vh-6vh-12px-34px-42px-3rem)]'
		: 'h-[calc(100vh-12px-34px-42px-3rem)]'
})
onMounted(() => {
	InitMenu('upload')
})
//region  表单
//标题计数
const splitter = new GraphemeSplitter()
const countGraphemes = (value: string) =>
	splitter.countGraphemes(value)

const fileList = ref<UploadFileInfo[]>([])
const uploadFileData = ref<Img[]>([])
// 预览封面id
const currentCover = ref('默认')
//封面
const cover = ref({})
// 定义查找 key 的方法
const findKeyById = (id: string): string | null => {
	const item = uploadFileData.value.find(
		img => img.id === id
	)
	return item ? item.key : null
}
// 设置预览封面
const handlePreview = (file: UploadFileInfo) => {
	console.log('当前选择封面图片为', file.id)
  currentCover.value = imgUrl(findKeyById(file.id))
  console.log('当前封面url',currentCover.value)
}
// 标题
const title = ref('')
// 正文
const content = ref({})

// endregion
//region 上传图片

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
	uploadFileData.value = removeImgById(
		uploadFileData.value,
		file.id
	)
	console.log('当前列表', uploadFileData.value)
}
//endregion
</script>

<template>
  <div class="p-2 w-full">
    <n-tabs type="line" class="pr-4" animated>
      <n-tab-pane class="overflow-y-auto" name="new" :tab="t('ui.uploadNew')">
        <n-scrollbar id="editorContainer" :class="heightClass">
          <n-flex vertical justify-center align-center>
            <div>
              <n-text class="title">{{ t('ui.uploadPhotos') }}&nbsp;({{uploadFileData.length}} / 12)</n-text>
              <n-text class="text-2.2 color-[--czjR-5]">{{ t('ui.uploadSelectCoverTipNone2') }}</n-text>
              <n-upload
                  class="mt-1"
                  accept="image/*"
                  list-type="image-card"
                  :max="12"
                  :on-remove="remove"
                  multiple
                  :custom-request="customRequest"
                  v-model:file-list="fileList"
                  @preview="handlePreview"
              >
                {{ t('ui.uploadPhotosButton') }}
              </n-upload>
            </div>
            <div>
              <n-text class="title">{{ t('ui.uploadSelectCover') }}</n-text>
              <n-text class="text-2.2 color-[--czjR-5]">{{ t('ui.uploadSelectCoverTipNone2') }}</n-text>
              <br/>
              <n-image v-if="currentCover.length>=8" width="100" :src="currentCover">
                <template #error>
                  <n-text class="text-2.4">{{ t('ui.uploadSelectCover') }}</n-text>
                </template>
              </n-image>
              <n-text v-else class="text-2.4">{{ t('ui.uploadSelectCoverTipNone') }}
                {{ t('ui.uploadSelectCoverTip1') }}
                <n-icon><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M255.66 112c-77.94 0-157.89 45.11-220.83 135.33a16 16 0 0 0-.27 17.77C82.92 340.8 161.8 400 255.66 400c92.84 0 173.34-59.38 221.79-135.25a16.14 16.14 0 0 0 0-17.47C428.89 172.28 347.8 112 255.66 112z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path><circle cx="256" cy="256" r="80" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"></circle></svg></n-icon>
                {{ t('ui.uploadSelectCoverTip2') }}</n-text>
            </div>
            <div>
              <n-text  class="title">{{ t('ui.newUploadTitle') }}</n-text>
              <n-input
                  v-model:value="title"
                  :count-graphemes="countGraphemes"
                  :placeholder="t('ui.uploadTitle')"
                  round maxlength="20" show-count clearable />
            </div>
            <div>
              <n-text class="title">{{ t('ui.uploadContentTitle') }}</n-text>
              <editor-default class="myeditor"/>
            </div>
            <n-button round strong block type="primary" @click="()=>{console.log(title)}">
              发布
            </n-button>

          </n-flex>
        </n-scrollbar>
      </n-tab-pane>
      <n-tab-pane name="manager" :tab="t('ui.uploadManager')">
        位数小
        <icons-like-b :onToggleHeart="()=>{console.log('点击了图标')}"/>

      </n-tab-pane>
    </n-tabs>

  </div>
</template>

<style scoped>
.title{
  @apply text-3.6 font-500
}
</style>
