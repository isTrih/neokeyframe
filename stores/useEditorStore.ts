/*
 * 版权所有(c) Trih(HUA Haohui) 2025 - 2025
 * Copyright (c)Trih(HUA Haohui) 2025 - 2025, All Rights Reserved.
 */

import { defineStore } from 'pinia'
export const useEditorStore = defineStore(
	'EditorStore',
	() => {
		const EditorTemp = ref('')
		const EditorTempRaw = ref('')

		const CleanEditor = () => {
			EditorTemp.value = ''
			EditorTempRaw.value = ''
		}

		return {
			EditorTemp,
			EditorTempRaw,
			CleanEditor
		}
	}
)
