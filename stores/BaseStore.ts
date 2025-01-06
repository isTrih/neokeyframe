import { defineStore } from "pinia";

export const useBaseStore = defineStore(
  "Base",
  () => {
    const Theme = ref("");

    function SetTheme(val: string) {
      Theme.value = val;
    }

    return {
      Theme,
      SetTheme,
    };
  },
  {
    persist: {
        //设置存储方式为LocalStorage
        storage: piniaPluginPersistedstate.localStorage(),
    },
  },
);
