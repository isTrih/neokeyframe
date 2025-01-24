<script setup lang="ts">
const fid = useRoute().params.fid
onMounted(() => {
  console.log(fid)
})
</script>

<template>
  <div class="h-full">
      <feed-detail :fid="Number(fid)" :single="true"/>
  </div>
</template>

<style scoped>
</style>