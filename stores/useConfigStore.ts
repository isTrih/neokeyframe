/*
 * 版权所有(c) Trih(HUA Haohui) 2025 - 2025
 * Copyright (c)Trih(HUA Haohui) 2025 - 2025, All Rights Reserved.
 */

import { defineStore } from "pinia";
export const useConfigStore = defineStore(
	"ConfigStore",
	() => {
		const ColorMode = ref(0);
		const CurrentColor = ref("");
		const CurrentMenu = ref("default");
		const WaterFallHeight = ref(0);
		const ContainerWidth = ref(0);
		const IsSmall = ref(false);
		const IsModalSmall = ref(false);

		return {
			ColorMode,
			CurrentMenu,
			WaterFallHeight,
			ContainerWidth,
			CurrentColor,
			IsSmall,
			IsModalSmall
		};
	},
	{
		persist: {
			// 设置存储方式为LocalStorage
			storage: piniaPluginPersistedstate.localStorage(),
		},
	},
);
