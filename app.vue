<template>
  <n-config-provider inline-theme-disabled :theme="theme" :theme-overrides="theme === null ? lightThemeOverrides : darkThemeOverrides">
    <n-message-provider>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
    </n-message-provider>
  </n-config-provider>
</template>
<script setup lang="ts">
import {
	NConfigProvider,
	type GlobalThemeOverrides
} from 'naive-ui'
import { useColorMode } from '@vueuse/core'
import { darkTheme } from 'naive-ui'
// import { isMobile } from '~/composables/utils.ts'

const theme = ref<null | typeof darkTheme>(null)
const lightThemeOverrides: GlobalThemeOverrides = {
	Scrollbar: {
		width: '0px',
		borderRadius: '0px'
	},
	common: {
		baseColor: '#FFF',
		primaryColor: '#2764AD',
		primaryColorHover: '#457FBD',
		primaryColorPressed: '#194D95',
		primaryColorSuppl: '#457FBD',
		infoColor: '#61649F',
		infoColorHover: '#777CB2',
		infoColorPressed: '#3F418A',
		infoColorSuppl: '#777CB2',
		successColor: '#55BB8A',
		successColorHover: '#6DC99A',
		successColorPressed: '#369F70',
		successColorSuppl: '#6DC99A',
		warningColor: '#FC6315',
		warningColorHover: '#FD843F',
		warningColorPressed: '#D0480D',
		warningColorSuppl: '#FD843F',
		errorColor: '#EE3F4D',
		errorColorHover: '#F15F66',
		errorColorPressed: '#C6273A',
		errorColorSuppl: '#F15F66'
	}
}
const darkThemeOverrides: GlobalThemeOverrides = {
	Scrollbar: {
		width: '0px',
		borderRadius: '0px'
	},
	common: {
		primaryColor: '#4780BD',
		primaryColorHover: '#336BAD',
		primaryColorPressed: '#6A9ECE',
		primaryColorSuppl: '#336BAD',
		infoColor: '#878BB2',
		infoColorHover: '#5F629F',
		infoColorPressed: '#9EA2C5',
		infoColorSuppl: '#5F629F',
		successColor: '#84C9A6',
		successColorHover: '#60BB8F',
		successColorPressed: '#9BD6B6',
		successColorSuppl: '#60BB8F',
		warningColor: '#FD813B',
		warningColorHover: '#FC742E',
		warningColorPressed: '#FDA266',
		warningColorSuppl: '#FC742E',
		errorColor: '#F1646B',
		errorColorHover: '#EE4D5A',
		errorColorPressed: '#F58587',
		errorColorSuppl: '#EE4D5A'
	}
}
const { ColorMode, CurrentColor } = storeToRefs(
	useConfigStore()
)
const colorMode = useColorMode()

function InitTheme() {
	if (ColorMode.value === 0) {
		switch (colorMode.value) {
			case 'light':
				theme.value = null
				CurrentColor.value = 'light'
				document.documentElement.classList.remove('dark')
				document.documentElement.classList.add('light')
				break
			case 'dark':
				theme.value = darkTheme
				CurrentColor.value = 'dark'
				document.documentElement.classList.add('dark')
				document.documentElement.classList.remove('light')

				break
		}
	} else if (ColorMode.value === 1) {
		theme.value = null
		CurrentColor.value = 'light'
		document.documentElement.classList.add('light')
		document.documentElement.classList.remove('dark')
	} else {
		theme.value = darkTheme
		CurrentColor.value = 'dark'
		document.documentElement.classList.add('dark')
		document.documentElement.classList.remove('light')
	}
}

watch([ColorMode, colorMode], () => {
	InitTheme()
})

onMounted(() => {
	InitTheme()
	console.log(
		// isMobile() ? '当前环境是移动端' : '当前环境不是移动端'
	)
})
</script>
