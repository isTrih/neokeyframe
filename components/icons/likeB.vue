<!--
  - 版权所有(c) Trih(HUA Haohui) 2025 - 2025
  - Copyright (c)Trih(HUA Haohui) 2025 - 2025, All Rights Reserved.
  -->

<template>
  <svg class="icon-heart cursor-pointer" @click="ToggleHeart" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor">
    <path :class="heartFillColor" fill="currentColor" d="M11.688 5.656 7.375 4.188 3.687 6.374l.063 4.875 8.375 8.813L21 10.438l-1.5-5.25L15.25 4l-3.563 1.656z" opacity="NaN"/>
    <path :class="heartLineColor" d="M20.243 4.757a6 6 0 0 1 .236 8.236l-8.48 8.492-8.478-8.492a6 6 0 0 1 8.48-8.464 5.998 5.998 0 0 1 8.242.228zM5.172 6.172a4 4 0 0 0-.192 5.451L12 18.654l7.02-7.03a4 4 0 0 0-5.646-5.64l-4.202 4.203-1.415-1.414 2.825-2.827-.082-.069a4.001 4.001 0 0 0-5.328.295z"/>
  </svg>
</template>

<script setup lang="ts">
const props = defineProps({
	isLiked: {
		type: Boolean,
		default: false
	}
})
const _isLike = ref(props.isLiked)
const emit = defineEmits(['toggleHeart'])
const ToggleHeart = () => {
  _isLike.value = !_isLike.value
	emit('toggleHeart')
}
const heartLineColor = computed(() => {
	return _isLike.value ? 'color-[--czjR-7] transition-all ' : 'transition-all'
})

const heartFillColor = computed(() => {
	return _isLike.value ? 'color-[--czjR-5] transition-all hover-op-80' : 'color-transparent transition-all'
})
</script>

<style scoped>
.icon-heart{
  @apply scale-70 flex items-center justify-center transition-all hover-op-80;
}
</style>
