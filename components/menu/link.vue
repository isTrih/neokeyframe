<script setup lang="ts">
import { ArrowForwardIosRound } from '@vicons/material';
const props = defineProps({
  title: {
    type: String,
    default: '默认'
  },
  icon: {
    type: Boolean,
    default: true
  },
  url:{
    type: String,
    default: 'https://chaozj.com'
  },
  thin:{
    type: Boolean,
    default: false
  }
});

const goto = () => {
  navigateTo(props.url, {
    open: {
      target: '_blank',
      windowFeatures: {
        width: 500,
        height: 500
      }
    }
  })
}
</script>

<template>
  <div class="w-full h-full">
    <n-button v-if="!thin" class="w-60 mx-2 my-1" style="--n-color: transparent" tertiary round @click="goto">
      <n-flex class="w-50" justify="space-between" align-items="center">
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
    <n-button v-else class="w-54 mx-2 my-1" style="--n-color: transparent" tertiary round @click="goto">
      <n-flex class="w-54" justify="space-between" align-items="center">
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