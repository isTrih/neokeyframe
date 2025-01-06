<script setup lang="ts">
defineProps({
  title: String,
});
import {
  DarkModeRound,
  LightModeRound,
  AutoAwesomeRound,
} from "@vicons/material";

const theme = useTheme();
</script>

<template>
  <div class="w-full h-full">
    <div
      id="container"
      class="w-18 h-6 rounded-full flex flex-row"
      style="background-color: var(--n-option-color-hover)"
    >
      <n-tooltip>
        <template #trigger>
          <div class="themebutton flex justify-center items-center">
              <AutoAwesomeRound class="icon"/>
          </div>
        </template>
        跟随系统
      </n-tooltip>


      <div class="themebutton">
        <n-tooltip>
          <template #trigger>
            <n-icon>
              <LightModeRound />
            </n-icon>
          </template>
          浅色模式
        </n-tooltip>
      </div>
      <div class="themebutton">
        <n-tooltip>
          <template #trigger>
            <n-icon>
              <DarkModeRound />
            </n-icon>
          </template>
          深色模式
        </n-tooltip>
      </div>
    </div>
  </div>
</template>
<style scoped>
.icon{
  width: 0.9rem;
  height: 0.9rem;
  color: var(--n-group-header-text-color);
  transition: all 0.3s ease;
}
.themebutton:hover .icon{
  color: var(--n-option-text-color);
}

.themebutton {
  transition: background-color 0.3s ease;
  cursor: pointer;
  border-radius: 100%;
  width: 1.5rem;
  height: 1.5rem;
  background-color: transparent;
}

#container {
  background-color: var(--n-color-buttonColor2Press);
}
</style>
