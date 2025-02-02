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