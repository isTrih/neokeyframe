<!--
  - 版权所有(c) Trih(HUA Haohui) 2025 - 2025
  - Copyright (c)Trih(HUA Haohui) 2025 - 2025, All Rights Reserved.
  -->

<script setup lang="ts">
import {
	RiBookOpenLine,
	RiDeleteBinLine,
	RiEditLine,
	RiHeart2Fill,
	RiImageLine,
	RiMessage3Fill,
	RiStarFill
} from '@remixicon/vue'
import type {
	MessageReactive,
	UploadCustomRequestOptions,
	UploadFileInfo
} from 'naive-ui'

import GraphemeSplitter from 'grapheme-splitter'
import {
	type CoverInfo,
	GetFeedDetail,
	NewFeed,
	deleteFeed,
	getFeedList
} from '~/apis/feed'
import { removeImgById } from '~/composables/utils'
import type { Img } from '~/types/feed'
// region 管理中心
import type { Feeds } from '~/types/keyframeGoComponents'

definePageMeta({
	middleware: ['auth']
})
const tabsValue = ref('new')
const { IsSmall } = storeToRefs(useConfigStore())
const heightClass = computed(() => {
	return IsSmall.value
		? 'h-[calc(100dvh-6dvh-12px-34px-42px-3rem)]'
		: 'h-[calc(100dvh-12px-34px-42px-3rem)]'
})
//region  表单
//标题计数
const splitter = new GraphemeSplitter()
const countGraphemes = (value: string) =>
	splitter.countGraphemes(value)
const feedId = ref(0)
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
const editorRef = ref() // 添加这行获取编辑器引用
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
		currentCover.value === 'xx'
			? 'xx'
			: currentCover.value,
		currentCoverInfo.value === undefined
			? empty
			: currentCoverInfo.value,
		uploadFileData.value.map(img => img.key),
		feedId.value
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
		// 清空编辑器缓存
		useEditorStore().CleanEditor()
		editorRef.value.ClearEditor()
		currentCover.value = 'xx'
		currentCoverInfo.value = undefined
		uploadFileData.value = []
		feedId.value = 0
		fetchData(currentPage.value)
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
const currentPage = ref(1)
const pageSize = 10
const total = ref(10)
const pageTotal = computed(() => {
	return Math.ceil(total.value / pageSize)
})
const FeedList = ref<Feeds[]>([])
const fetchData = async (page: number) => {
	const res = await getFeedList((page - 1) * pageSize)
	if (res.code === 0) {
		FeedList.value = res.data.feeds
		total.value = res.data.total
	} else {
		message.error(res.msg)
	}
}
onMounted(() => {
	InitMenu('upload')
	fetchData(currentPage.value)
})

const doDeleteFeed = (id: number) => {
	deleteFeed(id).then(res => {
		if (res.code === 0) {
			fetchData(currentPage.value)
		}
	})
}
const doEditFeed = (id: number) => {
	GetFeedDetail(id).then(res => {
		if (res.code === 0) {
			console.log(res.data)
			EditorTemp.value = res.data.Feed.content
			tabsValue.value = 'new'
			currentCover.value = res.data.Feed.media_url
			currentCoverInfo.value = res.data.Feed.media
			title.value = res.data.Feed.title
			uploadFileData.value = res.data.Feed.media_list.map(
				value => ({
					id: value, // 使用原始值作为 id
					key: value, // 使用原始值作为 key
					width: 0, // 默认宽度
					height: 0 // 默认高度
				})
			)
			fileList.value = uploadFileData.value.map(img => ({
				id: img.id,
				name: img.key,
				status: 'finished',
				url: imgUrl(img.key),
				type: 'image/png'
			}))
			feedId.value = res.data.Feed.id
		}
	})
}
// endregion
</script>

<template>
  <div class="p-2 w-full">
    <n-tabs type="line" v-model:value="tabsValue" class="pr-4" animated>
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
                <editor-default ref="editorRef" class="myeditor"/>
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
            <n-card v-for="i in FeedList" class="w-full min-h-8rem" content-style="padding: 0;">
              <n-flex class="!w-full h-full" justify="space-between">
                <n-flex>
                  <n-image
                     :id="`img-${i.id}`"
                     width="112"
                     object-fit="cover"
                     :src="imgUrl(i.cover_url,String(i.author_id))"
                     :fallback-src="imgUrl('f_4.jpg')"
                     class="image"
                     :alt="i.title"
                 >
                   <template #error>
                     <n-flex v-if="i.cover_url!=='xx'"
                             class="!w-5rem p-xy bg-[--bg-1] rounded-4" vertical justify="center" align="center">
                       <n-icon class="text-4xl text-[--text-4]">
                         <RiImageLine/>
                       </n-icon>
                       <n-text class="text-3.2 text-[--text-4]">{{ t('ui.imageLoadError') }}</n-text>
                     </n-flex>
                     <n-flex v-else class="!w-5rem p-xy bg-[--bg-1] rounded-4" vertical justify="center" align="center">
                       <n-icon class="text-4xl text-[--text-4]">
                         <RiBookOpenLine/>
                       </n-icon>
                     </n-flex>
                   </template>
                 </n-image>
                  <n-flex class="py-4px" :size="[0,0]" vertical justify="start" align="middle">
                    <n-text class="text-3.8" strong depth="1">
                      {{ i.title }}
                    </n-text>
                    <n-text class="text-3" depth="3">
                     发布于&nbsp;<n-time :time="i.publish_time" format="yyyy年MM月dd日 HH:mm" unix/>
                    </n-text>
                    <div class="flex items-center text-3 color-[--text-3]" depth="3">
                      <RiHeart2Fill class="color-[--text-3] scale-64"/>{{i.like_num}}
                      <RiStarFill class="ml-2 color-[--text-3] scale-64"/>{{i.collect_num}}
                      <RiMessage3Fill class="ml-2 color-[--text-3] scale-64"/>{{i.comment_num}}
                    </div>

                  </n-flex>
                </n-flex>
                <n-flex class="mr-3 mt-2">
                  <div class="self-start flex items-center text-3 color-[--text-3]" depth="3">
<!--                    <div class="self-start flex items-center text-3 color-[&#45;&#45;text-3]" depth="3">-->
<!--                      <RiEye2Line class="color-[&#45;&#45;text-3] scale-64"/>可见设置-->
<!--                    </div>-->
                    <n-popconfirm
                        @positive-click="doEditFeed(i.id)">
                      <template #trigger>
                        <div class="self-start cursor-pointer flex items-center text-3 color-[--text-3] hover:color-[--czjB-5]" depth="3">
                          <RiEditLine class="ml-2 scale-64"/>编辑
                        </div>
                      </template>
                      是否编辑
                    </n-popconfirm>
                    <n-popconfirm
                        @positive-click="doDeleteFeed(i.id)">
                      <template #trigger>
                        <div class="self-start cursor-pointer flex items-center text-3 color-[--text-3] hover:color-[--czjB-5]" depth="3">
                          <RiDeleteBinLine class="ml-2 scale-64"/>删除
                        </div>
                      </template>
                    确认删除
                    </n-popconfirm>
                  </div>
                </n-flex>
              </n-flex>
            </n-card>
            <n-pagination :on-update-page="(page)=>{fetchData(page)}" class="align-bottom" v-model:page="currentPage" :page-count="pageTotal" />
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
.image {
  border-radius: 4px;
  object-fit: cover;
  border: var(--gray-4) 1px solid;
  transition: all 0.18s cubic-bezier(0.19, 0.055, 0.675, 0.55);
  opacity: 1;
}

.image:hover {
  opacity: 0.85;
}

</style>
