<!--
  - 版权所有(c) Trih(HUA Haohui) 2025 - 2025
  - Copyright (c)Trih(HUA Haohui) 2025 - 2025, All Rights Reserved.
  -->

<!--suppress CssNoGenericFontName -->
<script setup lang="ts">
import {EditorContent, useEditor} from '@tiptap/vue-3'
import Emoji, {emojis} from '@tiptap-pro/extension-emoji'
import StarterKit from '@tiptap/starter-kit'
import {CuteEmojis,} from '~/types/cuteEmoji'
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
			history: false
		}),
		bilibili,
		KYTag.configure({
			allowClick: true,
			navigate: id => {
				console.log('编辑器:', id)
        emit('clickTag', id)
			}
		}),
		Emoji.configure({
			emojis: [...emojis, ...CuteEmojis],
			enableEmoticons: true
		})
	],
	editable: false,
})

// endregion
// region 卸载编辑器
onUnmounted(() => {
	editor.value.destroy()
})
//endregion
</script>

<template>
  <div  v-if="editor" :class="{'container':true}">
    <editor-content :editor="editor"/>
  </div>
</template>

<style>

.container {
  @apply rounded-3 py-2
}

</style>