<script setup lang="ts">
  import { ArrowForwardIosRound } from '@vicons/material';
  defineProps({
    title: {
      type: String,
      default: '默认'
    },
    icon: {
      type: Boolean,
      default: true
    },
    thin:{
      type: Boolean,
      default: false
    }
  });
</script>

<template>
  <div class="w-full h-full">
    <n-button v-if="!thin" class="w-60 mx-2 my-0.5" style="--n-color: transparent" tertiary round @click="$emit('click')">
      <n-flex class="w-50" justify="space-between">
        <div>
          {{ title }}
        </div>
        <div>
          <n-icon v-if="icon">
            <ArrowForwardIosRound />
          </n-icon>
        </div>
      </n-flex>
    </n-button>
    <n-button v-else class="w-54 mx-2 my-0.5" style="--n-color: transparent" tertiary round @click="$emit('click')">
      <n-flex class="w-52" justify="space-between">
        <div>
          {{ title }}
        </div>
        <div>
          <n-icon v-if="icon">
            <ArrowForwardIosRound />
          </n-icon>
        </div>
      </n-flex>
    </n-button>
  </div>
</template>
