<!--
  - 版权所有(c) Trih(HUA Haohui) 2025 - 2025
  - Copyright (c)Trih(HUA Haohui) 2025 - 2025, All Rights Reserved.
  -->

<script setup lang="ts">
import {EditorContent, useEditor} from '@tiptap/vue-3'
import Emoji, {emojis} from '@tiptap-pro/extension-emoji'
import {Placeholder} from '@tiptap/extension-placeholder'
import StarterKit from '@tiptap/starter-kit'
import {CuteEmojis, CuteEmojiShow} from '~/types/cuteEmoji'
import {getRandomText} from '~/composables/randomText'
import {RiEmojiStickerLine, RiMessage3Line, RiShare2Line} from '@remixicon/vue'
import type {Feed} from '~/types/feed'
import {useClipboard} from '@vueuse/core';
const message = useMessage()
const { copy, isSupported } = useClipboard()

const handleCopy = (value: string) => {
	// 检查当前浏览器是否支持 Clipboard API
	if (!isSupported) {
		message.error('您的浏览器不支持Clipboard API')
		return
	}

	// 调用 copy 方法将目标文本复制到剪贴板
	copy(value)

	// 提示用户复制成功并展示被复制的内容
	message.success('复制成功')
}

const props = defineProps({
	// 控制单双栏
	isSingle: {
		type: Boolean,
		default: false
	},
	feed: {
		type: Object as () => Feed,
		required: true
	},
	//是独立的
	individual: {
		type: Boolean,
		default: false
	},
	//小弹窗
	isSmall: {
		type: Boolean,
		default: false
	}
})
// region 表情包
const showEmoji = ref(false)
const toggleEmoji = () => {
	showEmoji.value = !showEmoji.value
}
const inputEmoji = (emoji: string) => {
	editor.value.chain().focus().setEmoji(emoji).run()
	showEmoji.value = false
}
// endregion
// region 仅限关键帧项目/深色模式
const { CurrentColor } = storeToRefs(useConfigStore())
const isDark = computed(() => {
	return CurrentColor.value === 'dark'
})
// endregion
// region 注册编辑器
const editor = useEditor({
	content: '',
	autofocus: 'end',
	extensions: [
		StarterKit.configure({
			history: false,
			gapcursor: false,
			dropcursor: false,
			bold: false,
			code: false,
			italic: false,
			strike: false,
			blockquote: false,
			bulletList: false,
			codeBlock: false,
			hardBreak: false,
			heading: false,
			orderedList: false,
			listItem: false
		}),

		Placeholder.configure({
			// Use a placeholder:
			placeholder: ({ node }) => {
				return getRandomText()
			}
		}),
		Emoji.configure({
			emojis: [...emojis, ...CuteEmojis],
			enableEmoticons: true,
			HTMLAttributes: {
				contenteditable: 'true'
			}
		})
	],
	editable: true,
	onBlur: ({ editor }) => {
		// send the content to an API here
	}
})
// endregion
// region 卸载编辑器
onUnmounted(() => {
	editor.value.destroy()
})
//endregion
// region 操作切换
const isComment = ref(false)
// endregion

// region 发送评论
const sendComment = () => {
	console.log('发送评论')
}
// endregion
const handleLike = useUserStore().handleLike
const checkLike = useUserStore().checkLike
const likeNumFormat = useUserStore().likeNumFormat

const handleCollect = useUserStore().handleCollect
const checkCollect = useUserStore().checkCollect
const collectNumFormat = useUserStore().collectNumFormat
</script>

<template>
<div>
  <transition mode="out-in">
    <n-flex v-if="isComment" class="bg-[--n-color-modal]" vertical >
      <div v-if="editor" :class="{'edit-container':true, 'single-ec': !isSmall&&isSingle&&!individual, 'individual-ec': individual||isSmall }">
        <editor-content :editor="editor"/>
      </div>
      <n-flex justify="space-between" align="center">
        <!--      表情包-->
        <n-popover trigger="click" :show="showEmoji">
          <template #trigger>
            <n-button @click="toggleEmoji" circle secondary>
              <RiEmojiStickerLine size="18px"/>
            </n-button>
          </template>
          <n-tabs type="line" size="small">
            <n-tab-pane name="oasis" :tab="t('editor.emoji.cute')">
              <n-grid :x-gap="8" :y-gap="8" :cols="8" layout-shift-disabled>
                <n-gi v-for="(emoji, index) in CuteEmojiShow" :key="index">
                  <i class="chaozj text-20" @click="inputEmoji(emoji.name)">{{emoji.unicode}}</i>
                </n-gi>
              </n-grid>
            </n-tab-pane>
            <!--          <n-tab-pane name="the beatles" tab="the Beatles">-->
            <!--            Hey Jude-->
            <!--          </n-tab-pane>-->
          </n-tabs>
        </n-popover>
        <n-flex>
          <n-button @click="isComment = false" round>
            取消
          </n-button>
          <n-button @click="sendComment" round type="primary">
            发送
          </n-button>
        </n-flex>
      </n-flex>
    </n-flex>
    <n-flex v-else :class="{'control-container':true,'no-comment-single': isSingle&&(!individual||!isSmall), 'individual-cc':individual||isSmall }" align="center" justify="space-between">
      <n-flex align="center" @click="isComment = true" :class="{'button-group shadow-[--shadow-i-c]':true,}">
        <n-text class="ml-2 text-3.2 text-[--text-4]">{{t('ui.commentPlaceholder')}}</n-text>
      </n-flex>
      <n-flex align="center" justify="space-between" class="op-80 hover-op-100">
        <n-flex align="center" justify="flex-end" :size="[0,0]" >
          <icons-like-b :size='38' :is-liked="checkLike(feed.id)" @toggleHeart="handleLike(feed.id,message)"/>
          <n-text class="text-2.8 color-[--text-1]">{{ likeNumFormat(feed.like_num, feed.id) }}</n-text>
        </n-flex>
        <n-flex align="center" justify="flex-end" :size="[0,0]" >
          <icons-star-b :size='26' :is-collected="checkCollect(feed.id)" @toggleStar="handleCollect(feed.id,message)"/>
          <n-text class="text-2.8 color-[--text-1]">{{ collectNumFormat(feed.collect_num, feed.id) }}</n-text>
        </n-flex>
        <n-flex align="center" justify="flex-end" :size="[0,0]" >
          <RiMessage3Line @click="isComment = true" size='28' class="color-[--text-1] cursor-pointer"/>
          <n-text class="text-2.8 color-[--text-1]">{{ feed.comment_num }}</n-text>
        </n-flex>

        <n-popover trigger="hover">
          <template #trigger>
            <RiShare2Line size='28' class="color-[--text-1] cursor-pointer"/>
          </template>
              <n-flex vertical align="center" justify="space-between">
                <n-qr-code class="!pb-0" :value="`https://www.checkpoint321.com/frame/${feed.id}`" />
                <n-flex align="center" justify="center" class="w-full">
                  <n-text class="text-2.8 color-[--text-1]">{{t('ui.share.shareMessage')}}</n-text>
                  <n-text class="text-2.8 color-[--text-1]">|</n-text>
                  <n-text @click="handleCopy(`https://www.checkpoint321.com/frame/${feed.id}`)" class="cursor-pointer text-2.8 color-[--text-1] hover:color-[--czjB-5]">
                    {{t('ui.share.copyUrl')}}
                  </n-text>
                </n-flex>
              </n-flex>
        </n-popover>
      </n-flex>
    </n-flex>
  </transition>
</div>

</template>

<style scoped>
.control-container{
  @apply bg-[--n-color-modal];
  max-width: calc(40dvw - 1.5rem);
  min-width: calc(40dvw - 1.5rem);
}
:deep(.no-comment-single){
  min-width: calc(80dvw - 3rem) !important;
}
:deep(.individual-cc){
  min-width: calc(100dvw - 3rem) !important;
}


.button-group{
  @apply rounded-4 bg-[--bg-2] hover-outline hover-outline-[--czjB-5] min-h-[2.4rem] w-full mx-2px;
  max-width: calc(40dvw - 4rem - 190px);

}

.no-comment-single .button-group{
  max-width: calc(80dvw - 4rem - 190px) !important;
}

.individual-cc .button-group{
  max-width: calc(100dvw - 4rem - 190px) !important;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.15s ease-out;
}
.v-enter-from {
  opacity: 0.3;
  transform: translateY(-30px);
}
.v-leave-to {
  opacity: 0.3;
  transform: translateY(30px);
}

/* 解决编辑器在小屏幕下的样式问题 */
:deep(.individual-ec){
  max-width: calc(100dvw - 3rem - 4px) !important;
  min-width: calc(100dvw - 3rem - 4px) !important;
}
:deep(.single-ec){
  max-width: calc(80dvw - 3rem - 4px) !important;
  min-width: calc(80dvw - 3rem - 4px) !important;
}
:deep(.edit-container){
  all: unset;
  @apply pt-4 ;
  max-width: calc(40dvw - 1.5rem);
  min-width: calc(40dvw - 1.5rem);
}

/* 编辑器样式 */
:deep(.edit-container .ProseMirror) {
  @apply m-4 mx-2 rounded-4 bg-[--bg-1] hover-outline hover-outline-[--czjB-5] min-h-[1rem] max-h-[4rem] overflow-hidden overflow-y-auto;
  margin: 0;
}
</style>