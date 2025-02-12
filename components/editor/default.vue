<!--
  - 版权所有(c) Trih(HUA Haohui) 2025 - 2025
  - Copyright (c)Trih(HUA Haohui) 2025 - 2025, All Rights Reserved.
  -->

<script setup lang="ts">
import {useEditor, EditorContent} from '@tiptap/vue-3'
import {RiBilibiliFill} from '@remixicon/vue'
import StarterKit from '@tiptap/starter-kit'
import type {FormInst} from 'naive-ui'
import {useMessage} from 'naive-ui'
const editor = useEditor({
  content: '',
  extensions: [StarterKit, bilibili]
})

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
  bilibliFormRef.value?.validate((errors) => {
    if (!errors) {
      console.log(bilibiliFormValue.value.bvid)
      addBilibli(bilibiliFormValue.value.bvid)
    } else {
      console.log(errors)
    }
  })
}
const addBilibli = (bvid = '', aid = '', page = '1') => {
  editor.value
      .chain()
      .focus()
      .setBilibili({bvid: bvid, aid: aid, page: page})
      .run()
}
// endregion
</script>

<template>
  <div v-if="editor" class="container">
    <div class="control-group">
      <div class="button-group">
        <n-button class="editer-button" tertiary round type="primary" size="tiny" @click="showBilibiliModal=true">
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
                  <n-input v-model:value="bilibiliFormValue.bvid" placeholder="输入BV号，如：BV1YZ421g7C6" maxlength="12" clearable/>
                </n-form-item>
                <n-button type="primary" block attr-type="button" @click="bilibiliBandleValidateClick">
                  插入视频
                </n-button>
              </n-form>
            </n-card>
          </n-modal>
          <RiBilibiliFill size="18px"/>
        </n-button>
      </div>
    </div>
    <editor-content class="" :editor="editor"/>
  </div>
</template>

<style>
.container {
  @apply bg-red p-2 rounded-2xl relative w-full
  white-space: normal;
}
.bilibili-wrapper{
  @apply my-2 mx-4
}
.tiptap p {
  margin-top: 0;
  margin-bottom: 0;
}
.editer-button{
  @apply shadow-[--shadow-i-c]
}
.ProseMirror{
  @apply p-2 m-2 rounded-2xl bg-[--fill-2] shadow-[--shadow-i-c]
  margin: 0;
}
.ProseMirror-focused{
  outline: none;
}
</style>