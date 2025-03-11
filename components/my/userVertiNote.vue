<!--
  - 版权所有(c) Trih(HUA Haohui) 2025 - 2025
  - Copyright (c)Trih(HUA Haohui) 2025 - 2025, All Rights Reserved.
  -->

<script setup lang="ts">
const props = defineProps({
	userType: {
		type: Number,
		default: 0,
		required: true
	},
	userNote: {
		type: String,
		default: '',
		required: true
	}
})

const suffix = computed(() => {
	if (200 <= props.userType && props.userType < 300) {
		return `${t('ui.keyframe')} ${t('ui.creatorCertification')}` //创作者认证
	}
	if (300 <= props.userType && props.userType < 400) {
		return `${t('ui.keyframe')} ${t('ui.organizationCertification')}`// '关键帧 机构认证：'
	}
	if (props.userType >= 400) {
		return `${t('ui.keyframe')} ${t('ui.employeeCertification')}` // '关键帧 员工认证：'
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