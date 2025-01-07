import { defineStore } from 'pinia';

export const useConfigStore = defineStore(
  'ConfigStore',
  () => {
    const ColorMode = ref(0);
    const CurrentMenu = ref('home');
    return {
      ColorMode,
      CurrentMenu
    };
  },
  {
    persist: {
      // 设置存储方式为LocalStorage
      storage: piniaPluginPersistedstate.localStorage()
    }
  }
);
