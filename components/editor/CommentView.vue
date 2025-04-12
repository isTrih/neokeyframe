<!--
  - 版权所有(c) Trih(HUA Haohui) 2025 - 2025
  - Copyright (c)Trih(HUA Haohui) 2025 - 2025, All Rights Reserved.
  -->

<!--suppress CssNoGenericFontName -->
<script setup lang="ts">
import Emoji, {
	emojis
} from '@tiptap-pro/extension-emoji'
import { Placeholder } from '@tiptap/extension-placeholder'
import StarterKit from '@tiptap/starter-kit'
import { EditorContent, useEditor } from '@tiptap/vue-3'
import { getRandomText } from '~/composables/randomText'
import { CuteEmojis } from '~/types/cuteEmoji'
// region 渲染器专属属性
const props = defineProps({
	content: {
		type: String,
		required: true
	}
})

const emit = defineEmits(['clickTag'])
// endregion
// region 仅限关键帧项目/深色模式
const { CurrentColor } = storeToRefs(useConfigStore())
const isDark = computed(() => {
	return CurrentColor.value === 'dark'
})
// endregion
// region 注册编辑器
const editor = useEditor({
	content: JSON.parse(gzipBase64ToStr(props.content)),
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
	editable: false
})

// endregion
// region 卸载编辑器
onUnmounted(() => {
	editor.value.destroy()
})
//endregion
</script>

<template>
  <div  v-if="editor" :class="{'comment-ontainer':true}">
    <editor-content :editor="editor"/>
  </div>
</template>

<style>

.comment-ontainer {
  @apply;
}
.comment-ontainer p{
  @apply text-3.4 color-[--text-1];
}
</style>