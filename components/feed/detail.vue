<!--
  - 版权所有(c) Trih(HUA Haohui) 2025 - 2025
  - Copyright (c)Trih(HUA Haohui) 2025 - 2025, All Rights Reserved.
  -->

<script setup lang="ts">
import { Close } from '@vicons/ionicons5'
import { FeedBPlayer } from '#components'
import type { Feed } from '~/types/feed'
import { ipLocationFormat } from '~/composables/utils'
import { useRuntimeConfig } from '#app'

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
	`${useRuntimeConfig().public.baseUrl}/feed/${props.fid}`
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
const singleClick = () => {
	if (props.single) {
		navigateTo('/')
	} else {
		emit('closeDetail')
	}
}

// 个人主页按钮
const userIndex = (uid: number) => {
	navigateTo(`/user/${uid}`)
	emit('closeDetail')
}
// TODO：关注逻辑

const { CurrentColor } = storeToRefs(useConfigStore())
// 认证信息
const isVerti = computed(() => {
	return data.value.data.Feed.user.type > 100
})
// 认证颜色配置
const VertiColor = computed(() => {
	if (
		200 <= data.value.data.Feed.user.type &&
		data.value.data.Feed.user.type < 300
	) {
		// 个人认证
		return 'color-[--czjB-6]'
	}
	if (
		300 <= data.value.data.Feed.user.type &&
		data.value.data.Feed.user.type < 400
	) {
		return 'color-[--czjY-6]'
	}
	if (400 <= data.value.data.Feed.user.type) {
		return 'color-[--v-1]'
	}
	return ''
})
// 深色模式适配
const isDark = computed(() => {
	return CurrentColor.value === 'dark'
})
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
              :src="imgUrl(item)"
              :img-props="{class:'carousel-img'}"
          />
        </n-carousel>
      </n-gi>
      <n-gi class="InfoContainer whitespace-pre-wrap" span="12">
        <n-flex :size="[0,0]" class="h-2.5rem mb-1rem" justify="space-between" align="center">
            <n-flex :size="[12,0]" align="center">
              <div>

              </div>
              <n-avatar
                  round
                  size="large"
                  :src="avatarUrl(data.data.Feed.user.avatar)"
                  style="border: var(--gray-2) thin solid; border-radius: 100%; transition: all 0.4s ease;"
                  class="cursor-pointer hover-op-80 relative z-0"
                  :alt="`${data.data.Feed.user.user_name}的头像`"
                  @click="userIndex(data.data.Feed.user.user_id)"
              />
              <!-- 认证图标 -->
              <icons-verti
                  v-if="isVerti&&!isDark"
                  :class="['rounded-full border-2 z-10 bg-[--bg-2] z-99',VertiColor,'ml-[-1.8rem] mb-[-1.5rem] w-6 h-6']"/>
              <icons-verti-d
                  v-if="isVerti&&isDark"
                  :class="['rounded-full border-2 z-10 bg-[--bg-2] z-99',VertiColor,'ml-[-1.8rem] mb-[-1.5rem] w-6 h-6']"/>
              <n-button
                  text
                  @click="userIndex(data.data.Feed.user.user_id)">
                <n-ellipsis
                    class="cursor-pointer color-[--text-1] text-3.8 font-500 hover-color-[--text-2] transition-300" style="max-width: 16dvw">
                  {{ data.data.Feed.user.user_name }}
                </n-ellipsis>
              </n-button>

            </n-flex>
          <n-button v-if="useUserStore().CheckFollow(data.data.Feed.user.user_id)"
                    @click="userIndex(data.data.Feed.user.user_id)"
                    class="w-6rem mr-1" strong round secondary type="primary">
            {{ t('ui.userIndex') }}
          </n-button>
          <n-button v-else class="w-6rem mr-1" strong round type="primary">
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
  box-shadow: var(--shadow-2-c);
}
</style>