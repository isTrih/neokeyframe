import { defineStore } from "pinia";
import { useColorMode } from "@vueuse/core";

export const useThemeStore = defineStore(
  "theme",
  () => {
    const colorMode = useColorMode();

    return {
      colorMode,
    };
  },
  {
    persist: {
      storage: localStorage,
    },
  },
);
