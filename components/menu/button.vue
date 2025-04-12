<!--
  - 版权所有(c) Trih(HUA Haohui) 2025 - 2025
  - Copyright (c)Trih(HUA Haohui) 2025 - 2025, All Rights Reserved.
  -->

<script setup lang="ts">
import { RiArrowRightSLine } from '@remixicon/vue'

defineProps({
	title: {
		type: String,
		default: '默认'
	},
	icon: {
		type: Boolean,
		default: true
	},
	thin: {
		type: Boolean,
		default: false
	},
	tiny: {
		type: Boolean,
		default: false
	}
})
</script>

<template>
  <div class="w-full h-full">
    <n-button v-if="!thin&&!tiny" class="w-60 mx-2 my-0.5" style="--n-color: transparent" tertiary round @click="$emit('click')">
      <n-flex class="w-50" justify="space-between">
        <div>
          {{ title }}
        </div>
        <div>
          <n-icon v-if="icon">
            <RiArrowRightSLine />
          </n-icon>
        </div>
      </n-flex>
    </n-button>
    <n-button v-else-if="thin&&!tiny" class="w-54 mx-2 my-0.5" style="--n-color: transparent" tertiary round @click="$emit('click')">
      <n-flex class="w-52" justify="space-between">
        <div>
          {{ title }}
        </div>
        <div>
          <n-icon v-if="icon">
            <RiArrowRightSLine />
          </n-icon>
        </div>
      </n-flex>
    </n-button>
    <n-button v-else class="w-32 mx-2 my-0.5" style="--n-color: transparent" tertiary round @click="$emit('click')">
      <n-flex class="w-32" justify="space-between">
        <div>
          {{ title }}
        </div>
        <div>
          <n-icon v-if="icon">
            <RiArrowRightSLine />
          </n-icon>
        </div>
      </n-flex>
    </n-button>

  </div>
</template>
