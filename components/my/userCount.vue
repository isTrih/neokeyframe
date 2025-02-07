<!--
  - 版权所有(c) Trih(HUA Haohui) 2025 - 2025
  - Copyright (c)Trih(HUA Haohui) 2025 - 2025, All Rights Reserved.
  -->

<script setup lang="ts">
defineProps({
  value: {
    type: Number,
    required: true,
    default: 0
  },
  name: {
    type: String,
    required: true,
    default: "未设置标签"
  },
})
</script>

<template>
  <n-flex vertical size="small" align="center">
    <div class="number text-3.5 font-400 color-[--text-1] line-height-none">
      {{ numFormat(value) }}
    </div>
    <div class="label text-2.5 font-400 color-[--text-3] line-height-none">
      {{ t(name) }}
    </div>
  </n-flex>
</template>