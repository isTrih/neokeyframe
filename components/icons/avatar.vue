<template>
  <n-avatar round :size="24" :src="src" />
</template>

<script lang="ts" setup>
  defineProps({
    src: {
      type: String,
      default: ''
    }
  });
</script>
