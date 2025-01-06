<script setup lang="ts">
import {
  DarkModeRound,
  LightModeRound,
  AutoAwesomeRound,
} from "@vicons/material";

defineProps({
  title: {
    type: String,
    default: "",
  },
});

// const themeStore = useThemeStore();
// // const theme = themeStore.theme;
// const {theme} = storeToRefs(baseStore)
</script>

<template>
  <div class="w-full h-full" >
    <n-flex class="m-2" justify="space-between">
      <div class="ml-2 text-base">
        深色模式
      </div>
      <div
          id="container"
          class="mr-2 w-21 h-7 rounded-full flex flex-row"
          style="background-color: var(--n-option-color-hover)"
      >
        <n-tooltip
            :show-arrow="false"
            :style="[
          {
            fontSize: '0.6rem',
          },
          {
            height: '1rem',
          },
          { width: '2.6rem' },
          { background: '#FFF' },
          { color: '#252525' },
        ]"
        >
          <template #trigger>
            <div class="themebutton w-7 h-7 flex justify-center items-center">
              <div class="w-5 h-5 selected flex items-center justify-center">
                <AutoAwesomeRound class="icon selected-button" />
              </div>
            </div>
          </template>
          跟随系统
        </n-tooltip>
        <n-tooltip
            :show-arrow="false"
            :style="[
          {
            fontSize: '0.6rem',
          },
          {
            height: '1rem',
          },
          { width: '2.6rem' },
          { background: '#FFF' },
          { color: '#252525' },
        ]"
        >
          <template #trigger>
            <div class="themebutton w-7 h-7 flex justify-center items-center">
              <div class="w-5 h-5 flex items-center justify-center">
                <LightModeRound class="icon" />
              </div>
            </div>
          </template>
          浅色模式
        </n-tooltip>
        <n-tooltip
            :show-arrow="false"
            :style="[
          {
            fontSize: '0.6rem',
          },
          {
            height: '1rem',
          },
          { width: '2.6rem' },
          { background: '#FFF' },
          { color: '#252525' },
        ]"
        >
          <template #trigger>
            <div class="themebutton w-7 h-7 flex justify-center items-center">
              <div class="w-5 h-5 flex items-center justify-center">
                <DarkModeRound class="icon" />
              </div>
            </div>
          </template>
          深色模式
        </n-tooltip>
      </div>
    </n-flex>
  </div>
</template>
<style scoped>
.icon {
  width: 0.8rem;
  height: 0.8rem;
  color: var(--n-group-header-text-color);
  transition: all 0.3s ease;
}

.themebutton:hover .icon {
  color: var(--n-option-text-color);
}

.themebutton {
  transition: background-color 0.3s ease;
  cursor: pointer;
}

.selected {
  border-radius: 100%;
  background-color: var(--n-color);
  box-shadow: var(--n-box-shadow);
}

.selected-button {
  color: var(--n-option-text-color);
}

#container {
  background-color: var(--n-color-buttonColor2Press);
}
</style>
