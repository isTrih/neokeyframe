<!--
  - 版权所有(c) Trih(HUA Haohui) 2025 - 2025
  - Copyright (c)Trih(HUA Haohui) 2025 - 2025, All Rights Reserved.
  -->

<script setup lang="ts">
defineProps({
	bvid: {
		type: String,
		default: ''
	},
	aid: {
		type: String,
		default: ''
	},
	page: {
		type: String,
		default: '1'
	},
	as_wide: {
		type: String,
		default: '1'
	},
	high_quality: {
		type: String,
		default: '1'
	},
	danmaku: {
		type: String,
		default: '1'
	}
})
</script>

<template>
  <iframe
      :src="`//player.bilibili.com/player.html?isOutside=true&aid=${aid}&bvid=${bvid}&p=${page}&high_quality=${high_quality}&danmaku=${danmaku}`"
      allowfullscreen width="100%" height="320" scrolling="no" frameborder="0"
      sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts"></iframe>
</template>
<style scoped>

</style>