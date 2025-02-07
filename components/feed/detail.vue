<!--
  - 版权所有(c) Trih(HUA Haohui) 2025 - 2025
  - Copyright (c)Trih(HUA Haohui) 2025 - 2025, All Rights Reserved.
  -->

<script setup lang="ts">
import { Close } from '@vicons/ionicons5'
import { FeedBPlayer, NuxtLink } from '#components'
import type { Feed } from '~/types/feed'
import { ipLocationFormat } from '~/composables/utils'

// 组件属性
const props = defineProps({
	fid: {
		type: Number,
		required: true
	},
	single: {
		type: Boolean,
		default: false
	}
})

// 定义 API 响应的类型
interface FeedResponse {
	data: {
		Feed: Feed
	}
}

// 获取数据
const { data } = await useFetch<FeedResponse>(
	`/apikeyframe/feed/${props.fid}`
)
// 定义关闭浮窗组件方法
const emit = defineEmits(['closeDetail'])
// 设置标题头

useHead({
	title: data.value
		? data.value.data.Feed.title
		: '标题获取错误',
	meta: [{ name: 'keywords', content: '前端, keywords' }]
})
// 富文本配置
const richTextConfig = ref({
	markers: ['bp'],
	//使用方式是先在markers中添加标记文本
	//[xxx param=??]
	//再在components中添加文本对应的组件
	components: {
		bp: FeedBPlayer
	},
	bemit: emit
})

// 获取全局配置
const { IsSmall, WaterFallHeight } = storeToRefs(
	useConfigStore()
)

// 适用于单页时候的按钮
function singleClick() {
	if (props.single) {
		navigateTo('/')
	} else {
		emit('closeDetail')
	}
}

// TODO：关注逻辑
</script>

<template>

  <div>
    <n-tooltip v-if="!IsSmall&&!single" trigger="hover" :show-arrow="false" class="z-50"
               :style="[{fontSize: '0.6rem'},{height: '1rem'},{ width: '2.8rem' },{ background: `var(--bg-2)`},{ color: `var(--text-1)` }]">
      <template #trigger>
        <n-float-button position="fixed" class="op-80 hover-op-100 z-50 transition-100" height="30" :left="48"
                        :top="48" @click="emit('closeDetail')"
        >
          <n-icon>
            <Close/>
          </n-icon>
        </n-float-button>
      </template>
      <n-text class="color-[--text-2]">关闭</n-text>
      <n-text class="color-[--text-2]" code>ESC</n-text>
    </n-tooltip>
    <n-grid class="w-full" v-if="!IsSmall" cols="24">
      <n-gi class="mediaContainer pr-6" span="12">
        <n-carousel autoplay :show-arrow="data.data.Feed.media_list.length>1" :centered-slides="true" class="bg-black carousel" >
          <n-image
              v-for="item in data.data.Feed.media_list"
              object-fit="scale-down"
              lazy
              class="content-center"
              :src="item"
              :img-props="{class:'carousel-img'}"
          />
        </n-carousel>
      </n-gi>
      <n-gi class="InfoContainer whitespace-pre-wrap" span="12">
        <n-flex :size="[0,0]" class="h-2.5rem mb-1rem" justify="space-between" align="center">
          <a :href="`/user/${data.data.Feed.user.user_id}`" class="no-underline" target="_blank">
            <n-flex :size="[12,0]" align="center">
              <n-avatar
                  round
                  size="large"
                  :src="data.data.Feed.user.avatar"
                  style="border: var(--gray-2) thin solid; border-radius: 100%; transition: all 0.4s ease;"
                  class="hover-op-80"
                  :alt="`${data.data.Feed.user.user_name}的头像`"
              />
              <n-ellipsis class="color-[--text-1] text-3.8 font-500 hover-color-[--text-2] transition-300" style="max-width: 16dvw">
                {{ data.data.Feed.user.user_name }}
              </n-ellipsis>

            </n-flex>
          </a>
          <n-button class="w-6rem mr-1" strong round type="primary">
            {{ t('ui.follow') }}
          </n-button>
        </n-flex>
        <n-scrollbar class="feedContent">
          <n-text class="text-4.5" strong>
            {{ data.data.Feed.title }}
          </n-text>
          <div class="text-3.5" v-rich-text-render="richTextConfig">
            {{ data.data.Feed.content }}
          </div>
          <n-text class="text-3" depth="3">
            {{t('ui.editedOn')}}
            <n-time :time="data.data.Feed.publish_time" format="yyyy-MM-dd" unix/>
            &nbsp;
            <n-time :time="data.data.Feed.publish_time" type="relative" unix/>
            &nbsp;{{ipLocationFormat(data.data.Feed.ip_location)}}
          </n-text>
          <n-divider/>
          <n-text class="text-3" depth="3">
            {{t('ui.comment1')}}&nbsp;{{data.data.Feed.comment_num}}&nbsp;{{t('ui.comment2')}}
          </n-text>
        </n-scrollbar>
        <div class="bg-red h-4rem">这是操作栏</div>
      </n-gi>
    </n-grid>
    <n-scrollbar v-else :style="{maxHeight: WaterFallHeight+'px'}">
      <n-flex vertical>
        <n-flex class="w-full" align="center" justify="space-between">
          <n-button class="op-80 hover-op-100" size="tiny" @click="singleClick">
            <n-icon>
              <Close/>
            </n-icon>
          </n-button>
          小{{ data.data.Feed.title }}
        </n-flex>
        <div class="whitespace-pre-wrap">
          详情部分
            <div v-rich-text-render="richTextConfig">
              {{ data.data.Feed.content }}
            </div>
        </div>
        <div>
          评论部分
        </div>
      </n-flex>
    </n-scrollbar>
  </div>
</template>

<style scoped>
:deep(.feedContent) {
  max-height: calc(80dvh - 3rem - 4rem - 2.5rem - 1rem);
  min-height: calc(80dvh - 3rem - 4rem - 2.5rem - 1rem);
  padding-bottom: 0.5rem;
}

:deep(.carousel-img){
  max-height: calc(80dvh - 3rem);
  min-height: calc(80dvh - 2.5rem);
  max-width: calc(40dvw - 3rem);
  min-width: calc(40dvw - 3rem);
  padding-right: 0.25rem;
}

:deep(.carousel){
  max-height: calc(80dvh - 2.5rem);
  min-height: calc(80dvh - 3rem);
  @apply rounded-xl;
}
</style>