<!--
  - 版权所有(c) Trih(HUA Haohui) 2025 - 2025
  - Copyright (c)Trih(HUA Haohui) 2025 - 2025, All Rights Reserved.
  -->

<script setup lang="ts">
import {RiArrowLeftSLine, RiCloseLine} from '@remixicon/vue'
import type { Feed } from '~/types/feed'
import { ipLocationFormat } from '~/composables/utils'
import { useRuntimeConfig } from '#app'
import { ShareFeedXHS } from '~/apis/feed'
import type MessageApiInjection from 'naive-ui'
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

// 获取全局配置
const { IsModalSmall, WaterFallHeight } = storeToRefs(
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

// region 禁止二次搜索
const isSearch = computed(() => {
  const { query } = useRoute()
  return !!query.q
})
// endregion

// 用于渲染器的方法
const handleClickTag = id => {
	console.log('点击了 # 标记:', id)
	emit('closeDetail')
  if(isSearch.value){
    navigateTo({ name: 'search', query: { q: id } },
        { open: { target: '_blank'}})
  }
	navigateTo({ name: 'search', query: { q: id } })
}
// 个人主页按钮
const userIndex = (uid: number) => {
	navigateTo(`/user/${uid}`)
	emit('closeDetail')
}
// TODO：关注逻辑


const shareXHS = (
	images: string[],
	title: string,
	content: string
) => {
	console.log('分享到小红书')
	ShareFeedXHS().then(res => {
		console.log(res.data)
		window.xhs.share({
			shareInfo: {
				type: 'normal', // 必填，笔记类型 'video' | 'normal'
				title: title, // 笔记标题
				content: content, // 笔记正文
				images: images.map(img => imgUrl(img)) //图文类型必填，笔记图片，必须是服务器地址，暂时不支持本地文件
			},
			verifyConfig: {
				appKey: 'red.jdTVXR4Ldj9sudhb', //必填，应用的唯一标识,
				nonce: res.data.nonce, // 必填，服务端生成签名的随机字符串
				timestamp: res.data.timestamp, // 必填，服务端生成签名的时间戳
				signature: res.data.signature // 必填，服务端生成的签名
			},
			fail: e => {
				console.log('分享失败', e)
				// 调用失败时执行的回调函数
			}
		})
	})
}

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
// 图片列表长度
const mediaLength = computed(()=>{
  return data.value.data.Feed.media_list.length
})
</script>

<template>

  <div class="h-full">
    <n-tooltip v-if="!IsModalSmall&&!single" trigger="hover" :show-arrow="false" class="z-50"
               :style="[{fontSize: '0.6rem'},{height: '1rem'},{ width: '2.8rem' },{ background: `var(--bg-2)`},{ color: `var(--text-1)` }]">
      <template #trigger>
        <n-float-button position="fixed" class="op-80 hover-op-100 z-50 transition-100" height="30" :left="48"
                        :top="48" @click="emit('closeDetail')"
        >
          <n-icon>
            <RiCloseLine/>
          </n-icon>
        </n-float-button>
      </template>
      <n-text class="color-[--text-2]">关闭</n-text>
      <n-text class="color-[--text-2]" code>ESC</n-text>
    </n-tooltip>
    <n-grid class="w-full" v-if="!IsModalSmall" :cols="mediaLength!==0?24:12">
      <n-gi class="mediaContainer pr-6" span="12">
        <n-carousel v-if="mediaLength!==0" autoplay :show-arrow="mediaLength>1" :centered-slides="true" class="bg-black carousel" >
          <n-image
              v-for="item in data.data.Feed.media_list"
              object-fit="scale-down"
              lazy
              class="content-center"
              :src="imgUrl(item,String(data.data.Feed.user.user_id))"
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
          <n-text class="text-6" strong>
            {{ data.data.Feed.title }}
          </n-text>
          <client-only>
            <editor-view v-if="data.data.Feed.content!==''" :content="data.data.Feed.content" @clickTag="handleClickTag"/>
          </client-only>
          <n-text class="text-3 block" depth="3">
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
          <div class="bg-blue h-full">
            评论部分
          </div>
        </n-scrollbar>
        <client-only>
          <feed-control-bar :feed="data.data.Feed" :is-single="mediaLength===0" class="absolute bottom-5.5"/>
        </client-only>
      </n-gi>
    </n-grid>
    <n-flex v-else vertical size="small" class="h-full w-full">
      <n-flex  class="w-full" align="center" justify="space-between">
        <n-flex :size="[0,0]" class="w-full h-2.5rem mb-1rem" justify="space-between" align="center">

          <n-flex :size="[12,0]" align="center">
            <n-button class="op-80 hover-op-100 mr-1rem" circle text size="tiny" @click="singleClick">
              <template #icon>
                <n-icon>
                  <RiArrowLeftSLine/>
                </n-icon>
              </template>
              {{ t('ui.back') }}
            </n-button>
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

      </n-flex>
      <n-scrollbar :style="{maxHeight: 80+'dvh'}">
        <n-flex vertical>
          <div class="else">
            <n-carousel v-if="mediaLength!==0" autoplay :show-arrow="mediaLength>1" :centered-slides="true" class="bg-black carousel" >
              <n-image
                  v-for="item in data.data.Feed.media_list"
                  object-fit="scale-down"
                  lazy
                  class="content-center"
                  :src="imgUrl(item,String(data.data.Feed.user.user_id))"
                  :img-props="{class:'carousel-img'}"
              />
            </n-carousel>
          </div>
          <n-text class="text-6" strong>
            {{ data.data.Feed.title }}
          </n-text>
          <client-only>
            <editor-view :content="data.data.Feed.content" @clickTag="handleClickTag"/>
          </client-only>
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
          <div class="bg-blue h-full mb-3rem">
            评论部分
          </div>
          <client-only>
            <feed-control-bar :feed="data.data.Feed" :is-single="true" :individual="single" :is-small="IsModalSmall" class="bg-[--n-color-modal] px-2px absolute bottom-0"/>
          </client-only>
        </n-flex>
      </n-scrollbar>

    </n-flex>
  </div>
</template>

<style scoped>


:deep(.n-divider:not(.n-divider--vertical)){
  @apply my;
}
:deep(.feedContent) {
  max-height: calc(80dvh - 3rem - 4rem - 2.5rem - 1rem);
  min-height: calc(80dvh - 3rem - 4rem - 2.5rem - 1rem);
  padding-bottom: 0.5rem;
}
:deep(.else .carousel-img){
  max-height: calc(80dvh - 3rem);
  max-width: calc(100dvw - 2.5rem);
}
:deep(.else .carousel){
  max-height: calc(80dvh - 2.5rem);
  max-width: calc(100dvw - 2.5rem);
  @apply rounded-xl;
  box-shadow: var(--shadow-2-c);
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