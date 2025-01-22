<script setup lang="ts">
const props = defineProps({
  userType: {
    type: Number,
    default: 0,
    required: true
  },
  userNote:{
    type: String,
    default: '',
    required: true
  }
})

const suffix = computed(() => {
  if (props.userType === 2) {
    return '关键帧 创作者认证：'
  } else if (props.userType === 3) {
    return '关键帧 机构认证：'
  }else if (props.userType >= 4) {
    return '关键帧 员工认证：'
  }
  return ''
})
</script>

<template>
  <n-text class="text-3 font-320" depth="3">
    {{ suffix }}{{ userNote }}
  </n-text>
</template>

<style scoped>

</style>