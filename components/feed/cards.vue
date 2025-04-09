<!--
  - 版权所有(c) Trih(HUA Haohui) 2025 - 2025
  - Copyright (c)Trih(HUA Haohui) 2025 - 2025, All Rights Reserved.
  -->

<script setup lang="ts">
import { RiHeart2Line, RiImageLine } from '@remixicon/vue'
import type { Card } from '~/types/feed'
import { h } from 'vue'
import { FeedDetail } from '#components'
import { useModal } from 'naive-ui'
const message = useMessage()
// 监听容器宽度
const { ContainerWidth, IsSmall } = storeToRefs(
	useConfigStore()
)
// 设置组件传参
const props = defineProps({
	cardColumns: {
		type: Object,
		default: () => {}
	}
})

// 获取瀑布流列数
const len = computed(() => {
	return Object.keys(props.cardColumns).length
})

// 点赞
const handleLike = useUserStore().handleLike
const checkLike = useUserStore().checkLike
const likeNumFormat = useUserStore().likeNumFormat

const modal = useModal()

const showDetails = (id: number) => {
	console.log(id)
	const m = modal.create({
		class: IsSmall.value
			? 'w-100dvw h-100dvh'
			: 'rounded-xl w-80dvw h-80dvh',
		preset: 'card',
		closable: false,
		content: () =>
			h(
				FeedDetail,
				{
					fid: id,
					onCloseDetail: () => {
						m.destroy()
					}
				},
				{}
			)
	})

	console.log('点击显示详情按钮')
}

onMounted(() => {
	// 检查图片是否已加载并添加 'loaded' 类
})

onUnmounted(() => {})

// 处理加载状态
const handleLoad = (card: Card) => {
	console.log('加载成功', card.id)
	card.loaded = true
}

// 处理加载失败以及错误
const handleError = (card: Card) => {
	console.log('加载失败')
	card.loaded = true
}

const heightCaculate = (
	len: number,
	height: number,
	width: number
) => {
	const cardWidth = ContainerWidth.value / len - 32
	const cardHeight = (cardWidth * height) / width
	const formalH = (cardWidth * 148) / 105
	if (cardHeight > formalH) {
		return formalH
	}
	return cardHeight
}
</script>

<template>

  <div ref="colRef" class="flex flex-row justify-between">
    <div v-for="col in cardColumns" :key="col.id" :style="{width: 100/len + '%'}">
      <section v-for="card in col" :key="card.id">
        <div style="padding: 0" class="card">
          <a class="w-full" :href="`/frame/${card.id}`" @click.prevent="showDetails(card.id)">
            <n-image
                :id="`img-${card.id}`"
                width="100%"
                object-fit="cover"
                preview-disabled
                :src="imgUrl(card.media_url,String(card.user.user_id))"
                :fallback-src="imgUrl('f_4.jpg')"
                class="image"
                :height="heightCaculate(len, card.media.height, card.media.width)"
                :alt="card.title"
                @load="handleLoad(card)"
                @error="handleError(card)"
            >
              <template #error>
                <n-flex v-if="card.media_url!=='xx'"
                        :style="{height: heightCaculate(len, card.media.height, card.media.width) + 'px'}"
                        class="w-full p-xy bg-[--bg-1] rounded-4" vertical justify="center" align="center">
                  <n-icon class="text-4xl text-[--text-4]">
                    <RiImageLine/>
                  </n-icon>
                  <n-text class="text-4 text-[--text-4]">{{ t('ui.imageLoadError') }}</n-text>
                </n-flex>

                <n-flex v-else
                        :style="{height: heightCaculate(len, card.media.height, card.media.width) + 'px'}"
                        class="w-full p-xy h-full bg-[--bg-1] rounded-4" vertical justify="center" align="center">
                  <n-text class="font-mono text-align-center font-bold text-5 text-[--text-1]">{{card.title}}</n-text>
                </n-flex>
              </template>
              <template #placeholder>
                <n-skeleton
                    v-if="!card.loaded"
                    class="skeleton"
                    :height="heightCaculate(len, card.media.height, card.media.width)"
                />
              </template>
            </n-image>

          </a>
          <div style="padding: 0.1rem">
            <div
                v-show="card.media_url!=='xx'"
                id="title"
                class="mb-1 cursor-pointer"
                @click="showDetails(card.id)"
            >
              {{ card.title }}
            </div>
            <div class="bottom" style="display:flex; justify-content: space-between; align-content: center;">
              <n-flex align="center" size="small">
                <nuxt-link class="flex align-center" :to="{name: 'user-uid', params: {uid: card.user.user_id}}">
                  <n-skeleton v-if="!card.loaded" circle height="24px"/>
                  <n-avatar
                      v-else
                      round
                      :size="24"
                      :src="avatarUrl(card.user.avatar)"
                      style="border: var(--gray-2) thin solid; border-radius: 100%; transition: all 0.4s ease;"
                      :alt="`${card.user.user_name}的头像`"
                  />
                </nuxt-link>
                <nuxt-link
                    class="flex align-center decoration-none text-3 user_name"
                    :to="{name: 'user-uid', params: {uid: card.user.user_id}}"
                >
                  <div class="user_name">{{ card.user.user_name }}</div>
                </nuxt-link>
              </n-flex>
              <n-flex align="center" justify="flex-end" :size="[0,0]" >
                  <icons-like-b :is-liked="checkLike(card.id)" @toggleHeart="handleLike(card.id,message)"/>
                <n-text class="text-2.8 color-[--text-1]">{{ likeNumFormat(card.like_num, card.id) }}</n-text>
              </n-flex>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
#title {
  transition: all 0.18s ease;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: start;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-bottom: 0.2rem;
  color: var(--text-1);
  font-size: 0.9rem;
  font-weight: 500;
  width: 100%;
}
#title:hover {
  color: var(--czjB-8);
}
.col {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

section {
  break-inside: avoid;
  margin: 0.1rem 0.3rem 1.2rem 0.3rem;
  transition: all 0.4s ease;
}

.card {
  border-radius: 1rem;
  background-color: transparent;
  transition: all 0.4s ease;
}

.skeleton {
  border-radius: 1rem;
  border: var(--gray-2) 1px solid;
  transition: all 0.4s ease;
}

.image {
  border-radius: 1rem;
  width: 100%;
  object-fit: cover;
  border: var(--gray-2) 1px solid;
  transition: all 0.18s cubic-bezier(0.19, 0.055, 0.675, 0.55);
  opacity: 1;
}

.image:hover {
  opacity: 0.85;
}

.user_name {
  color: var(--gray-10);
  transition: all 0.2s ease;
}

.user_name:hover {
  color: var(--czjB-8);
}
</style>