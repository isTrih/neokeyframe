<script setup lang="ts">
  import { ArrowForwardIosRound } from '@vicons/material';
  defineProps({
    title: String
  });
</script>

<template>
  <div class="w-full h-full">
    <n-button class="w-60 mx-2 my-1" style="--n-color: transparent" tertiary round @click="$emit('click')">
      <n-flex class="w-50" justify="space-between">
        <div>
          {{ title }}
        </div>
        <div>
          <n-icon>
            <ArrowForwardIosRound />
          </n-icon>
        </div>
      </n-flex>
    </n-button>
  </div>
</template>
