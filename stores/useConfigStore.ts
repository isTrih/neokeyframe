import {defineStore} from 'pinia';
export const useConfigStore = defineStore(
    'ConfigStore',
    () => {
        const ColorMode = ref(0);
        const CurrentColor = ref('');
        const CurrentMenu = ref('home');
        const WaterFallHeight = ref(0);
        const ContainerWidth = ref(0);
        return {
            ColorMode,
            CurrentMenu,
            WaterFallHeight,
            ContainerWidth,
            CurrentColor
        };
    },
    {
        persist: {
            // 设置存储方式为LocalStorage
            storage: piniaPluginPersistedstate.localStorage()
        }
    }
);
