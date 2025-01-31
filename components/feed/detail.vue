<script setup lang="ts">
import { Close } from '@vicons/ionicons5'
import { FeedBPlayer, NuxtLink } from '#components'
import { GetFeedDetail } from '~/apis/feed'
import type { Feed } from '~/types/feed'
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

const { data } = await useFetch<FeedResponse>(
	`/apikeyframe/feed/${props.fid}`
)
console.log(data)
useHead({
	title: data.value
		? data.value.data.Feed.title
		: '标题获取错误',
	meta: [{ name: 'keywords', content: '前端, keywords' }]
})
const richTextConfig = ref({
	markers: ['bp'],
	//使用方式是先在markers中添加标记文本
	//[xxx param=??]
	//再在components中添加文本对应的组件
	components: {
		bp: FeedBPlayer
	},
  link: NuxtLink
})
// 定义组件方法
const emit = defineEmits(['closeDetail'])
//
const { IsSmall, WaterFallHeight } = storeToRefs(
	useConfigStore()
)

function singleClick() {
	if (props.single) {
		navigateTo('/')
	} else {
		emit('closeDetail')
	}
}

// 获取当前时间戳的方法
const today = computed(() => {
	return Math.floor(new Date().getTime() / 1000)
})
console.log(data.value)
</script>

<template>

  <div class="w-full">
    <n-tooltip v-if="!IsSmall&&!single" trigger="hover" :show-arrow="false"
               :style="[{fontSize: '0.6rem'},{height: '1rem'},{ width: '2.8rem' },{ background: `var(--bg-2)`},{ color: `var(--text-1)` }]">
      <template #trigger>
        <n-float-button position="absolute" class="op-80 hover-op-100" height="30" :left="20"
                        :top="20" @click="emit('closeDetail')"
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
      <n-gi class="mediaContainer" span="12">

      </n-gi>
      <n-gi class="InfoContainer" span="12" style="white-space: pre-wrap;">
        <n-text class="text-4.5" strong>
          {{ data.data.Feed.title }}
        </n-text>
        <n-scrollbar class="feedContent">
          <div class="text-3.5" v-rich-text-render="richTextConfig">
            {{ data.data.Feed.content }}

          </div>
          <n-text class="text-3" depth="3">
            {{t('ui.editedOn')}}
            <n-time :time="data.data.Feed.publish_time" format="yyyy-MM-dd" unix/>
            &nbsp;
            <n-time :time="data.data.Feed.publish_time" type="relative" unix/>
          </n-text>
        </n-scrollbar>
        <div class="bg-red h-4rem">这是操作栏</div>
      </n-gi>
    </n-grid>
    <n-scrollbar v-if="IsSmall" :style="{maxHeight: WaterFallHeight+'px'}">
      <n-flex vertical>
        <n-flex class="w-full" align="center" justify="space-between">
          <n-button class="op-80 hover-op-100" size="tiny" @click="singleClick">
            <n-icon>
              <Close/>
            </n-icon>
          </n-button>
          小{{ data.data.Feed.title }}
        </n-flex>
        <div>
          详情部分
          <div v-rich-text-render="richTextConfig">

            <div v-rich-text-render="richTextConfig">
              {{ data.data.Feed.content }}
            </div>
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
  max-height: calc(80dvh - 8rem);
  min-height: calc(80dvh - 8rem);
  padding-bottom: 0.25rem;
}
</style>