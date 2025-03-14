<!--
  - 版权所有(c) Trih(HUA Haohui) 2025 - 2025
  - Copyright (c)Trih(HUA Haohui) 2025 - 2025, All Rights Reserved.
  -->

<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import Emoji, {
	emojis
} from '@tiptap-pro/extension-emoji'
import { Placeholder } from '@tiptap/extension-placeholder'
import StarterKit from '@tiptap/starter-kit'
import {
	CuteEmojis,
	CuteEmojiShow
} from '~/types/cuteEmoji'
import { getRandomText } from '~/composables/randomText'
import {RiEmojiStickerLine} from '@remixicon/vue';
const props= defineProps({
  isSingle: {
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
        contenteditable:"true"
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
</script>

<template>
<div>
  <transition mode="out-in">
    <n-flex v-if="isComment" class="bg-red" vertical >
      <div v-if="editor" :class="{'edit-container':true, 'single': isSingle}">
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
    <n-flex v-else class="bg-red">
      <n-button @click="isComment = true" type="primary" round>
        {{t('ui.comment')}}
      </n-button>
    </n-flex>
  </transition>
</div>

</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.25s ease-out;
}

.v-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.v-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
:deep(.single){
  all: unset;
  @apply w-full;
  flex: 1;
  max-width: calc(80dvw - 3rem) !important;
  min-width: calc(80dvw - 3rem) !important;
}
:deep(.edit-container){
  all: unset;
  @apply w-full pt-4;
  flex: 1;
  max-width: calc(40dvw - 1.5rem);
  min-width: calc(40dvw - 1.5rem);
}

/* 编辑器样式 */
:deep(.edit-container .ProseMirror) {
  @apply m-4 mx-2 rounded-4 bg-[--bg-1] hover-outline hover-outline-[--czjB-5] min-h-[1rem] max-h-[4rem] overflow-hidden overflow-y-auto;
  margin: 0;
}
</style>