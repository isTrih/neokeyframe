<script setup lang="ts">
import {
	DarkModeRound,
	LightModeRound,
	AutoAwesomeRound
} from '@vicons/material'

const { ColorMode } = storeToRefs(useConfigStore())
const click = (index: number) => {
	ColorMode.value = index
}
</script>

<template>
  <div class="w-full h-full">
    <n-flex class="m-2" justify="space-between" align="center">
      <div class="ml-5 text-sm color-[--text-1]">{{ $t('ui.darkMode') }}</div>
      <div
          id="container"
          class="mr-2 w-21 h-7 rounded-full flex flex-row"
          style="background-color: var(--n-option-color-hover)"
      >
        <n-tooltip
            :show-arrow="false"
            :style="[
            {
              fontSize: '0.6rem'
            },
            {
              height: '1rem'
            },
            { width: '2.6rem' },
            { background: `var(--bg-2)`},
            { color: `var(--text-1)` }
          ]"
        >
          <template #trigger>
            <div class="themebutton w-7 h-7 flex justify-center items-center" @click="click(0)">
              <div :class="ColorMode === 0 ? 'selected' : ''" class="w-5 h-5 flex items-center justify-center">
                <AutoAwesomeRound :class="ColorMode === 0 ? 'selected-button' : ''" class="icon mr-1px"/>
              </div>
            </div>
          </template>
          <template #default>
            {{ $t('ui.followSystem') }}
          </template>
        </n-tooltip>
        <n-tooltip
            :show-arrow="false"
            :style="[
            {
              fontSize: '0.6rem'
            },
            {
              height: '1rem'
            },
            { width: '2.6rem' },
            { background: `var(--bg-2)`},
            { color: `var(--text-1)` }
          ]"
        >
          <template #trigger>
            <div class="themebutton w-7 h-7 flex justify-center items-center" @click="click(1)">
              <div :class="ColorMode === 1 ? 'selected' : ''" class="w-5 h-5 flex items-center justify-center">
                <LightModeRound :class="ColorMode === 1 ? 'selected-button' : ''" class="icon"/>
              </div>
            </div>
          </template>
          <template #default>
            {{ $t('ui.light') }}
          </template>

        </n-tooltip>
        <n-tooltip
            :show-arrow="false"
            class="content-center"
            :style="[
            {height: '1rem'},
            {fontSize: '0.6rem'},
            { width: '2.6rem' },
            { background: `var(--bg-2)`},
            { color: `var(--text-1)` }
          ]"
        >
          <template #trigger>
            <div class="themebutton w-7 h-7 flex justify-center items-center" @click="click(2)">
              <div :class="ColorMode === 2 ? 'selected' : ''" class="w-5 h-5 flex items-center justify-center">
                <DarkModeRound :class="ColorMode === 2 ? 'selected-button' : ''" class="icon"/>
              </div>
            </div>
          </template>
          <template #default>
            {{ $t('ui.dark') }}
          </template>
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
  transition: background-color 0.3s ease;
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
  transition: background-color 0.3s ease;
}

.selected-button {
  color: var(--n-option-text-color);
  transition: background-color 0.8s ease;
}

#container {
  background-color: var(--n-color-buttonColor2Press);
}
</style>
