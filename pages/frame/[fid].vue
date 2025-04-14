<!--
  - 版权所有(c) Trih(HUA Haohui) 2025 - 2025
  - Copyright (c)Trih(HUA Haohui) 2025 - 2025, All Rights Reserved.
  -->

<script setup lang="ts">
const fid = useRoute().params.fid
onMounted(() => {
	console.log(fid)
})
const { IsSmall } = storeToRefs(useConfigStore())
</script>

<template>
  <div v-if="!IsSmall" class="pt-16 flex items-center">
      <feed-detail :fid="Number(fid)" :single="true"/>
  </div>
  <div v-else >
    <feed-detail class="mb-8" :fid="Number(fid)" :single="true"/>
  </div>
</template>

<style scoped>
</style>