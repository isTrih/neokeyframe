<script setup lang="ts">
const fid = useRoute().params.fid
onMounted(() => {
  console.log(fid)
})
</script>

<template>
  <div>
    <feed-detail :fid="Number(fid)" :single="true"/>

  </div>
</template>

<style scoped>
</style>