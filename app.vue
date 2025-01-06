<template>
  <n-config-provider
    inline-theme-disabled
    :theme-overrides="theme === null ? lightThemeOverrides : darkThemeOverrides"
  >
    <div @contextmenu.prevent>
      <NuxtLayout>
        <n-message-provider>
          <NuxtLoadingIndicator />
          <NuxtPage />
        </n-message-provider>
      </NuxtLayout>
    </div>
    <n-global-style />
  </n-config-provider>
</template>
<script setup lang="ts">
import { NConfigProvider, type GlobalThemeOverrides } from "naive-ui";
const theme = ref(null);
const lightThemeOverrides: GlobalThemeOverrides = {
  common: {
    baseColor: "#FFF",
    primaryColor: "#2764AD",
    primaryColorHover: "#457FBD",
    primaryColorPressed: "#194D95",
    primaryColorSuppl: "#457FBD",
    infoColor: "#1D3B81",
    infoColorHover: "#38599A",
    infoColorPressed: "#142D74",
    infoColorSuppl: "#38599A",
    successColor: "#8ADD9C",
    successColorHover: "#9BE4A9",
    successColorPressed: "#57B96F",
    successColorSuppl: "#9BE4A9",
    warningColor: "#F89667",
    warningColorHover: "#F9AB80",
    warningColorPressed: "#CD6840",
    warningColorSuppl: "#F9AB80",
    errorColor: "#F56868",
    errorColorHover: "#F78581",
    errorColorPressed: "#CB4145",
    errorColorSuppl: "#F78581",
  },
};
const darkThemeOverrides: GlobalThemeOverrides = {
  common: {
  },
};
// import { darkTheme } from "naive-ui";
</script>
