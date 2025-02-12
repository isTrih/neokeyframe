<!--
  - 版权所有(c) Trih(HUA Haohui) 2025 - 2025
  - Copyright (c)Trih(HUA Haohui) 2025 - 2025, All Rights Reserved.
  -->

<!--suppress CssNoGenericFontName -->
<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import Emoji, {
	emojis
} from '@tiptap-pro/extension-emoji'
import {
	RiBilibiliFill,
	RiBold,
	RiCodeBoxLine,
	RiCodeFill,
	RiDoubleQuotesL,
	RiEmojiStickerLine,
	RiH1,
	RiH2,
	RiH3,
	RiHashtag,
	RiItalic,
	RiListOrdered,
	RiListUnordered,
	RiSeparator,
	RiStrikethrough
} from '@remixicon/vue'
import { CharacterCount } from '@tiptap/extension-character-count'
import { Placeholder } from '@tiptap/extension-placeholder'
import StarterKit from '@tiptap/starter-kit'
import type { FormInst } from 'naive-ui'
import {
	CuteEmojis,
	CuteEmojiShow
} from '~/types/cuteEmoji'
import {getRandomText} from '~/composables/randomText';

// region Bilibili按钮
const showBilibiliModal = ref(false)
const bilibliFormRef = ref<FormInst | null>(null)
const bilibiliFormValue = ref({
	bvid: ''
})
const bilibliRules = {
	bvid: {
		required: true,
		message: '请输入12位BV号',
		trigger: ['input', 'blur'],
		validator: (rule, value) => value.length === 12
	}
}
const bilibiliBandleValidateClick = (e: MouseEvent) => {
	e.preventDefault()
	bilibliFormRef.value?.validate(errors => {
		if (!errors) {
			console.log(bilibiliFormValue.value.bvid)
			addBilibli(bilibiliFormValue.value.bvid)
			showBilibiliModal.value = false
			bilibiliFormValue.value.bvid = ''
		} else {
			console.log(errors)
		}
	})
}
const addBilibli = (bvid = '') => {
	editor.value
		.chain()
		.focus()
		.setBilibili({ bvid: bvid })
		.run()
}
// endregion
// region 字符统计
const lengthLimit = ref(1101)
const percentage = computed(() => {
	return Math.round(
		(100 / lengthLimit.value) *
			editor.value.storage.characterCount.characters()
	)
})
// endregion
// region 仅限关键帧项目/深色模式
const { CurrentColor } = storeToRefs(useConfigStore())
const isDark = computed(() => {
  return CurrentColor.value === 'dark'
})
// endregion
// region 注册编辑器
const {EditorTemp,EditorTempRaw} =storeToRefs(useEditorStore())
const editor = useEditor({
  content: EditorTemp.value,
  extensions: [
    StarterKit.configure({
      history: false
    }),
    bilibili,
    KYTag.configure({
      allowClick: true,
      navigate: id => {
        // 你的路由跳转逻辑，例如：
        // router.push({ name: 'search', query: { q: id } })
        console.log('编辑器:', id)
      }
    }),
    Placeholder.configure({
      // Use a placeholder:
      placeholder: ({ node }) => {
        return getRandomText()
      },
    }),
    CharacterCount.configure({
      limit: lengthLimit.value
    }),
    Emoji.configure({
      emojis: [...emojis, ...CuteEmojis],
      enableEmoticons: true
    })
  ],
  editable: true,
  onUpdate: ({ editor }) => {
    EditorTemp.value = editor.getJSON()
    EditorTempRaw.value = editor.getText({ blockSeparator: ''})
    // send the content to an API here
  }
})

// endregion
// region 卸载编辑器
onUnmounted(() => {
	editor.value.destroy()
})
//endregion
</script>

<template>
  <div  v-if="editor" :class="{'edit-container':true}">
    <div class="z-30">
      <n-flex class="control-group" size="small" align="center">
        <!--      bilibili视频-->
        <n-button @click="showBilibiliModal=true"
                  round size="tiny" secondary>
          <n-modal v-model:show="showBilibiliModal">
            <n-card
                style="width: 24rem"
                title="插入B站视频"
                closable
                size="huge"
                :bordered="false"
                role="dialog"
                aria-modal="true"
                @close="showBilibiliModal=false"
            >
              <n-form ref="bilibliFormRef" :model="bilibiliFormValue" :rules="bilibliRules">
                <n-form-item label="BV号" path="bvid">
                  <n-input v-model:value="bilibiliFormValue.bvid" placeholder="输入BV号，如：BV1YZ421g7C6" maxlength="12"
                           clearable/>
                </n-form-item>
                <n-button type="primary" block attr-type="button" @click="bilibiliBandleValidateClick">
                  插入视频
                </n-button>
              </n-form>
            </n-card>
          </n-modal>
          <RiBilibiliFill size="18px"/>
        </n-button>
        <!--      话题-->
        <n-button @click="editor.chain().focus().toggleKYTag().run()"
                  round size="tiny" secondary>
          <RiHashtag size="18px"/>
        </n-button>

        <!--      表情包-->
        <n-popover trigger="click">
          <template #trigger>
            <n-button round size="tiny" secondary>
              <RiEmojiStickerLine size="18px"/>
            </n-button>
          </template>
          <n-tabs type="line" size="small">
            <n-tab-pane name="oasis" :tab="t('editor.emoji.cute')">
              <n-grid :x-gap="8" :y-gap="8" :cols="8" layout-shift-disabled>
                <n-gi v-for="(emoji, index) in CuteEmojiShow" :key="index">
                  <i class="chaozj" @click="editor.chain().focus().setEmoji(emoji.name).run()">{{emoji.unicode}}</i>
                </n-gi>
              </n-grid>
            </n-tab-pane>
            <!--          <n-tab-pane name="the beatles" tab="the Beatles">-->
            <!--            Hey Jude-->
            <!--          </n-tab-pane>-->
          </n-tabs>
        </n-popover>
        <n-button @click="editor.chain().focus().toggleBold().run()"
                  :type="editor.isActive('bold')?'primary':'default'"
                  round size="tiny" secondary>
          <RiBold size="18px"/>
        </n-button>
        <n-button @click="editor.chain().focus().toggleItalic().run()"
                  :type="editor.isActive('italic')?'primary':'default'"
                  round size="tiny" secondary>
          <RiItalic size="18px"/>
        </n-button>
        <n-button @click="editor.chain().focus().toggleStrike().run()"
                  :type="editor.isActive('strike')?'primary':'default'"
                  round size="tiny" secondary>
          <RiStrikethrough size="18px"/>
        </n-button>
        <n-button @click="editor.chain().focus().toggleBulletList().run()"
                  :type="editor.isActive('bulletList')?'primary':'default'"
                  round size="tiny" secondary>
          <RiListUnordered size="18px"/>
        </n-button>
        <n-button @click="editor.chain().focus().toggleOrderedList().run()"
                  :type="editor.isActive('orderedList')?'primary':'default'"
                  round size="tiny" secondary>
          <RiListOrdered size="18px"/>
        </n-button>

        <n-button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
                  :type="editor.isActive('heading', { level: 1 })?'primary':'default'"
                  round size="tiny" secondary>
          <RiH1 size="18px"/>
        </n-button>
        <n-button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
                  :type="editor.isActive('heading', { level: 2 })?'primary':'default'"
                  round size="tiny" secondary>
          <RiH2 size="18px"/>
        </n-button>
        <n-button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
                  :type="editor.isActive('heading', { level: 3 })?'primary':'default'"
                  round size="tiny" secondary>
          <RiH3 size="18px"/>
        </n-button>

        <n-button @click="editor.chain().focus().toggleBlockquote().run()"
                  :type="editor.isActive('blockquote')?'primary':'default'"
                  round size="tiny" secondary>
          <RiDoubleQuotesL size="18px"/>
        </n-button>
        <n-button @click="editor.chain().focus().setHorizontalRule().run()"
                  round size="tiny" secondary>
          <RiSeparator size="18px"/>
        </n-button>

        <n-button @click="editor.chain().focus().toggleCode().run()"
                  :type="editor.isActive('code')?'primary':'default'"
                  round size="tiny" secondary>
          <RiCodeFill size="18px"/>
        </n-button>
        <n-button @click="editor.chain().focus().toggleCodeBlock().run()"
                  :type="editor.isActive('codeBlock')?'primary':'default'"
                  round size="tiny" secondary>
          <RiCodeBoxLine size="18px"/>
        </n-button>
      </n-flex>
    </div>
    <editor-content :editor="editor"/>
    <div v-if="editor"
         :class="{'character-count': true, 'character-count--warning': editor.storage.characterCount.characters() === lengthLimit}">
      {{ editor.storage.characterCount.characters() }} / {{ lengthLimit }}
      <svg
          :class="[editor.storage.characterCount.characters() === lengthLimit?'color-[--czjR-5]':'color-[--czjB-5]']"
          height="16"
          width="16"
          viewBox="0 0 20 20"
      >
        <circle
            r="10"
            cx="10"
            cy="10"
            :fill="isDark?'rgba(255, 255, 255, 0.22)':'#e5e6eb'"
        />
        <circle
            r="5"
            cx="10"
            cy="10"
            fill="transparent"
            stroke="currentColor"
            :fill-dasharray="31.4"
            stroke-width="10"
            :stroke-dasharray="`calc(${percentage} * 31.4 / 100) 31.4`"
            transform="rotate(-90) translate(-20)"
        />
        <circle
            r="6"
            cx="10"
            cy="10"
            :fill="isDark?'#232324':'#ffffff'"
        />
      </svg>
    </div>



  </div>
</template>

<style>
[class^="ri-"], [class*=" ri-"] {
  @apply cursor-pointer ;
  font-family: 'remixicon' !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.ri-eth-fill:before {
  /* 使用 transform 属性的 rotate 函数进行旋转 */
  transform: rotate(30deg);
  /* 设置变换的基点为元素的中心点 */
  transform-origin: center;
  content: "\f408";
  display: inline-block;
}

.kyTag{
  @apply px-1 color-[--czjB-5] hover-color-[--czjB-4] cursor-pointer;
}
.kyTag i{
  @apply px-1 color-[--czjB-5] hover-color-[--czjB-4] cursor-pointer;
}
/* 表情包*/
.chaozj {
  @apply cursor-pointer;
  font-family: "chaozj" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.edit-container .character-count {
  @apply flex items-center gap-2 text-xs float-end mt-2 pt-1;
  color: var(--text-3);
}

.edit-container .character-count--warning {
  @apply text-[--red];
}

.edit-container {
  @apply bg-[--fill-2] rounded-3 py-2
}

.edit-container .control-group {
  @apply mx-2 mb-2
}

.bilibili-wrapper {
  @apply p-4
}

.edit-container .bilibili-wrapper.ProseMirror-selectednode {
  outline: 3px solid var(--czjP-5);
}

/* 分割线样式 */
.tiptap hr {
  border: none;
  border-top: 1px solid var(--gray-2);
  cursor: pointer;
  margin: 1.2rem 0;
}

.edit-container .tiptap hr.ProseMirror-selectednode {
  border-top: 1px solid var(--czjP-5);
}

.tiptap p {
  margin-top: 0;
  margin-bottom: 0;
}

/* 行内代码样式 */
.tiptap code {
  background-color: var(--czjP-2);
  border-radius: 0.4rem;
  color: var(--czjP-9);
  font-size: 0.85rem;
  padding: 0.25em 0.3em;
}

/* 表情包 */
.tiptap [data-type="emoji"] img {
  height: 1rem;
  width: 1rem;
  margin: 0.1rem 0.1rem 0.3rem;
}
.edit-container .tiptap [data-type="emoji"] img.ProseMirror-selectednode {
  border-top: 1px solid var(--czjP-5);
}

/* 标题样式 */
.tiptap h1,
.tiptap h2,
.tiptap h3,
.tiptap h4,
.tiptap h5,
.tiptap h6 {
  line-height: 1.1;
  margin-top: 0;
  margin-bottom: 0.2rem;
  text-wrap: pretty;
}

h4,
h5,
h6 {
  font-size: 0.8rem;
}

/* 代码块样式 */
.tiptap pre {
  background: var(--gray-10);
  border-radius: 0.5rem;
  color: var(--gray-1);
  font-family: 'JetBrainsMono', monospace;
  margin: 1.5rem 0;
  padding: 0.75rem 1rem;
}

.tiptap pre code {
  background: none;
  color: inherit;
  font-size: 0.8rem;
  padding: 0;
}

/* 列表样式 */
.tiptap ul,
.tiptap ol {
  padding: 0 1rem;
  margin: 0.25rem 0.1rem 0.25rem 0.2rem;
}

.tiptap ul li p {
  margin-top: 0.15em;
  margin-bottom: 0.05em;
}

.tiptap ol li p {
  margin-top: 0.15em;
  margin-bottom: 0.05em;
}

/* 引用样式 */
.tiptap blockquote {
  border-left: 3px solid var(--gray-3);
  margin: 0.3rem 0;
  padding-left: 1rem;
}

/* 编辑器样式 */
.edit-container .ProseMirror {
  @apply p-2 mx-2 rounded-3 bg-[--bg-1] shadow-[--shadow-i-c] hover-outline hover-outline-[--czjB-5]
  margin: 0;
}

.edit-container .ProseMirror-focused {
  @apply outline outline-[--czjB-5]
  caret-color: var(--text-1);
}

.edit-container .ProseMirror [draggable][contenteditable="false"] {
  user-select: text;
}
.edit-container .ProseMirror img.ProseMirror-separator {
  width: 0 !important;
  height: 0 !important;
}

/* Placeholder样式 */
.edit-container .tiptap p.is-editor-empty::before {
  color: var(--gray-4);
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}
</style>