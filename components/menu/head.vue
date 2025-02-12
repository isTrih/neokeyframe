<!--
  - 版权所有(c) Trih(HUA Haohui) 2025 - 2025
  - Copyright (c)Trih(HUA Haohui) 2025 - 2025, All Rights Reserved.
  -->

<template>
  <div class="w-full h-full justify-center items-center">
    <n-grid class="w-full h-full justify-center items-center" :cols="12">
      <n-gi class="ml-4 mt-2" span="2">
        <n-button circle text size="medium" @click="$emit('back')">
          <template #icon>
            <n-icon>
              <RiArrowLeftSLine />
            </n-icon>
          </template>
        </n-button>
      </n-gi>
      <n-gi span="8">
        <div class="fw-700 text-base text-align-center color-[--text-1]">
          {{ title }}
        </div>
      </n-gi>
      <n-gi span="2" />
    </n-grid>
  </div>
</template>
<script setup lang="ts">
import {RiArrowLeftSLine} from '@remixicon/vue';

defineProps({
    title: {
      type: String,
      default: ''
    }
  });
</script>
