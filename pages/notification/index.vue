<!--
  - 版权所有(c) Trih(HUA Haohui) 2025 - 2025
  - Copyright (c)Trih(HUA Haohui) 2025 - 2025, All Rights Reserved.
  -->

<script setup lang="ts">
definePageMeta({
	middleware: ['auth']
})

onMounted(() => {
	InitMenu('notification')
})
</script>

<template>
    <n-tabs animated class="p-4 h-full w-full">
      <n-tab-pane
        name="like"
      tab="点赞通知">

      </n-tab-pane>
      <n-tab-pane
          name="comment"
          tab="评论通知">

      </n-tab-pane>
      <n-tab-pane
          name="collect"
          tab="收藏通知">

      </n-tab-pane>
      <n-tab-pane
          name="follow"
          tab="关注通知">

      </n-tab-pane>
    </n-tabs>
</template>

<style scoped></style>
