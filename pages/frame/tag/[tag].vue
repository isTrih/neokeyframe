<!--
  - 版权所有(c) Trih(HUA Haohui) 2025 - 2025
  - Copyright (c)Trih(HUA Haohui) 2025 - 2025, All Rights Reserved.
  -->

<script setup lang="ts">
const tag = useRoute().params.tag
onMounted(() => {
  console.log(tag)
})
</script>

<template>
  {{tag}}
</template>

<style scoped>

</style>