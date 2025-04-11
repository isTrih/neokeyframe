<!--
  - 版权所有(c) Trih(HUA Haohui) 2025 - 2025
  - Copyright (c)Trih(HUA Haohui) 2025 - 2025, All Rights Reserved.
  -->

<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});
import type {
	UploadFileInfo,
	UploadCustomRequestOptions,
	MessageReactive
} from 'naive-ui'

import type { Img } from '~/types/feed'
import GraphemeSplitter from 'grapheme-splitter'
import { removeImgById } from '~/composables/utils'
import { type CoverInfo, NewFeed } from '~/apis/feed'
const { IsSmall } = storeToRefs(useConfigStore())
const heightClass = computed(() => {
	return IsSmall.value
		? 'h-[calc(100dvh-6dvh-12px-34px-42px-3rem)]'
		: 'h-[calc(100dvh-12px-34px-42px-3rem)]'
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
const currentCover = ref('xx')
const currentCoverInfo = ref<CoverInfo>()
//封面
// 定义查找 key 的方法
const findKeyById = (id: string): Img | null => {
	const item = uploadFileData.value.find(
		img => img.id === id
	)
	return item ? item : null
}
// 设置预览封面
const handlePreview = (file: UploadFileInfo) => {
	console.log('当前选择封面图片为', file.id)
	const img = findKeyById(file.id)
	currentCoverInfo.value = {
		width: img.width,
		height: img.height
	}
	currentCover.value = img.key
	console.log('当前封面url', currentCover.value)
}
// 标题
const title = ref('')
// 获取编辑器数据
const { EditorTemp, EditorTempRaw } = storeToRefs(
	useEditorStore()
)
// 实例化Message
const message = useMessage()
let messageReactive: MessageReactive | null = null

// 移除Message
const removeMessage = () => {
	if (messageReactive) {
		messageReactive.destroy()
		messageReactive = null
	}
}
// 切换的时候移除message
onBeforeUnmount(removeMessage)

const submit = () => {
	// 检测图片列表
	// if (uploadFileData.value.length === 0) {
	//   return message.warning('图片为空')
	// }
	// 检测封面
	// if (currentCover.value === '默认') {
	//   return message.warning('封面为空')
	// }
	// 检测标题
	if (title.value === '') {
		return message.warning('标题为空')
	}
	// // 检测正文
	// if (EditorTemp.value === '') {
	// 	return message.warning('正文为空')
	// }
	if (messageReactive) {
		return
	}
	messageReactive = message.loading('文章发布中...', {
		duration: 0
	})
	const empty: CoverInfo = {
		width: 0,
		height: 0
	}

  console.log('当前封面信息', currentCoverInfo.value)
  console.log('当前封面信息', currentCover.value)

  NewFeed(
		title.value,
		EditorTemp.value,
		EditorTempRaw.value,
		currentCover.value=== 'xx'
      ? 'xx'
      : currentCover.value,
		currentCoverInfo.value === undefined
			? empty
			: currentCoverInfo.value,
		uploadFileData.value.map(img => img.key)
	).then(res => {
		console.log(res)
		if (res.code !== 0) {
			messageReactive?.destroy()
			message.error(res.msg)
			return
		}
		removeMessage()
		message.success('发布成功')
		title.value = ''
		fileList.value = []
		useEditorStore().CleanEditor()
		currentCover.value = 'xx'
		currentCoverInfo.value = undefined
		uploadFileData.value = []
	})
	console.log('提交')
}
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

// region 管理中心
const page = ref(1)
// endregion
</script>

<template>
  <div class="p-2 w-full">
    <n-tabs type="line" class="pr-4" animated>
      <n-tab-pane class="overflow-y-auto" name="new" :tab="t('ui.uploadNew')">
        <n-scrollbar id="editorContainer" :class="heightClass">
          <n-flex vertical justify-center align-center>
            <div>
              <n-text class="title">{{ t('ui.uploadPhotos') }}&nbsp;({{uploadFileData.length}} / 12)</n-text>
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
              <br/>
              <n-image v-if="currentCover.length>=3" width="100" :src="imgUrl(currentCover)">
                <template #error>
                  <n-text class="text-2.4">{{ t('ui.uploadSelectCoverTipNone') }}</n-text>
                </template>
              </n-image>
              <n-text v-else class="text-2.4">{{ t('ui.uploadSelectCoverTipNone') }}
                {{ t('ui.uploadSelectCoverTip1') }}
                <n-icon><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M255.66 112c-77.94 0-157.89 45.11-220.83 135.33a16 16 0 0 0-.27 17.77C82.92 340.8 161.8 400 255.66 400c92.84 0 173.34-59.38 221.79-135.25a16.14 16.14 0 0 0 0-17.47C428.89 172.28 347.8 112 255.66 112z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path><circle cx="256" cy="256" r="80" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"></circle></svg></n-icon>
                {{ t('ui.uploadSelectCoverTip2') }}</n-text>
<!--              <n-text class="text-2.4">-->
<!--                {{currentCover}}-->
<!--                <div v-for="img in uploadFileData" :key="img.id">-->
<!--                  <div>{{img.id}}</div>-->
<!--                  <div>{{img.key}}</div>-->
<!--                  <div>{{img.height}}</div>-->
<!--                  <div>{{img.width}}</div>-->
<!--                </div>-->
<!--              </n-text>-->
            </div>
            <div>
              <n-text  class="title">{{ t('ui.newUploadTitle') }}</n-text>
              <n-text class="text-2.2 color-[--czjR-5]"> ( {{ t('ui.must') }} ) </n-text>

              <n-input
                  v-model:value="title"
                  :count-graphemes="countGraphemes"
                  :placeholder="t('ui.uploadTitle')"
                  round maxlength="20" show-count clearable />
            </div>
            <div>
              <n-text class="title">{{ t('ui.uploadContentTitle') }}</n-text>
              <client-only>
                <editor-default class="myeditor"/>
              </client-only>
            </div>
            <n-button round strong block type="primary" @click="submit">
              发布
            </n-button>

          </n-flex>
        </n-scrollbar>
      </n-tab-pane>
      <n-tab-pane name="manager" :tab="t('ui.uploadManager')">
        <n-scrollbar id="editorContainer" :class="heightClass">
          <n-flex :class="heightClass" vertical align="center" justify="space-between">
            <div>

            </div>
            <n-pagination class="align-bottom" v-model:page="page" :page-count="100" />
          </n-flex>
        </n-scrollbar>
      </n-tab-pane>
    </n-tabs>

  </div>
</template>

<style scoped>
.title{
  @apply text-3.6 font-500
}
</style>
