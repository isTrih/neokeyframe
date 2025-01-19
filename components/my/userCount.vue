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
  <n-flex vertical :size="0" align="center">
    <div class="number">
      <n-text class="text-3.5 font-400" depth="2">
        {{ value }}
      </n-text>
    </div>
    <div class="label">
      <n-text class="text-3.5 font-400" depth="3">
        {{ name }}
      </n-text>
    </div>
  </n-flex>
</template>