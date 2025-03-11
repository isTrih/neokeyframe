<!--
  - 版权所有(c) Trih(HUA Haohui) 2025 - 2025
  - Copyright (c)Trih(HUA Haohui) 2025 - 2025, All Rights Reserved.
  -->

<script setup lang="ts">
const props = defineProps({
	isCollected: {
		type: Boolean,
		default: false
	}
})
const emit = defineEmits(['toggleStar'])
const ToggleStar = () => {
	emit('toggleStar')
}
</script>

<template>
  <Transition v-if="isCollected" name="bounce" appear>
    <svg class="icon-star cursor-pointer transition-all" @click="ToggleStar" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
      <path class="color-[--czjY-6]" d="M12.12821 3.02137 8.97436 8.84616c.03419.02992-5.4359.79915-5.4359.79915s3.84615 4.2735 3.84615 4.31624c0 .04274-.89744 5.94017-.93162 5.91026.03419.02992 5.63248-2.66239 5.59829-2.69231.03419.02992 5.50427 3.10684 5.50427 3.10684s-1.53846-6.36752-1.57265-6.39744c.03419.02992 4.82051-4.24359 4.78632-4.2735.03419.02992-5.90598-.91026-5.90598-.91026s-.12821-.04274-2.73504-5.68376z" opacity="NaN"/>
      <path class="color-[--czjY-8]" d="m12.0006 18.26-7.05345 3.9482 1.57533-7.9283L.58789 8.7918l8.02704-.95174L12.0006.5l3.3856 7.34006 8.027.95174-5.9345 5.4881 1.5753 7.9283c-2.35113-1.31607-4.70227-2.63213-7.0534-3.9482zm0-2.292 4.2467 2.3771-.9485-4.7734 3.5731-3.3043-4.8329-.57306-2.0384-4.41932-2.03846 4.41932-4.83293.57306 3.5731 3.3043-.94848 4.7734 4.24677-2.3771z"/>
    </svg>
  </Transition>
  <Transition v-else name="bounce">
    <svg class="icon-star cursor-pointer transition-all" @click="ToggleStar" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
      <path fill="transparent" d="M12.12821 3.02137 8.97436 8.84616c.03419.02992-5.4359.79915-5.4359.79915s3.84615 4.2735 3.84615 4.31624c0 .04274-.89744 5.94017-.93162 5.91026.03419.02992 5.63248-2.66239 5.59829-2.69231.03419.02992 5.50427 3.10684 5.50427 3.10684s-1.53846-6.36752-1.57265-6.39744c.03419.02992 4.82051-4.24359 4.78632-4.2735.03419.02992-5.90598-.91026-5.90598-.91026s-.12821-.04274-2.73504-5.68376z" opacity="NaN"/>
      <path d="m12.0006 18.26-7.05345 3.9482 1.57533-7.9283L.58789 8.7918l8.02704-.95174L12.0006.5l3.3856 7.34006 8.027.95174-5.9345 5.4881 1.5753 7.9283c-2.35113-1.31607-4.70227-2.63213-7.0534-3.9482zm0-2.292 4.2467 2.3771-.9485-4.7734 3.5731-3.3043-4.8329-.57306-2.0384-4.41932-2.03846 4.41932-4.83293.57306 3.5731 3.3043-.94848 4.7734 4.24677-2.3771z"/>
    </svg>
  </Transition>
</template>

<style scoped>
.icon-star{
  @apply scale-60 flex items-center justify-center transition-all hover-op-80;
}
</style>