<!--
  - 版权所有(c) Trih(HUA Haohui) 2025 - 2025
  - Copyright (c)Trih(HUA Haohui) 2025 - 2025, All Rights Reserved.
  -->

<template>
  <n-avatar round :size="24" :src="src" />
</template>

<script lang="ts" setup>
  const { src } = defineProps({
    src: {
      type: String,
      default: ''
    }
  });
</script>
