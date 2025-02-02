<script setup lang="ts">
const fid = useRoute().params.fid
onMounted(() => {
  console.log(fid)
})
</script>

<template>
  <div class="h-full bg-red my-2 mb-8">
      <feed-detail :fid="Number(fid)" :single="true"/>
  </div>
</template>

<style scoped>
</style>