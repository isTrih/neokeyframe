<template>
  <n-avatar round :size="24" :src="props.src" />
</template>

<script lang="ts" setup>
const props = defineProps({
  src: String,
});
</script>
