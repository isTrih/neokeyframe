<!--
  - 版权所有(c) Trih(HUA Haohui) 2025 - 2025
  - Copyright (c)Trih(HUA Haohui) 2025 - 2025, All Rights Reserved.
  -->

<script setup lang="ts">
onMounted(() => {
InitMenu('notification')
})
</script>

<template>
  <div class="h-full w-full flex flex-col justify-center">
    <client-only>
      <n-empty size="huge" description="通知" />
      <div class="bilibili-wrapper"><iframe src="//player.bilibili.com/player.html?isOutside=true&amp;aid=&amp;bvid=BV1YZ421g7C6&amp;p=1&amp;high_quality=1&amp;danmaku=1" allowfullscreen="true" width="100%" height="320" scrolling="no" frameborder="0"></iframe></div>
    </client-only>
  </div>
</template>

<style scoped></style>
