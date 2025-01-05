<template>
  <n-config-provider inline-theme-disabled :theme-overrides="themeOverrides">
      <NuxtLayout>
        <NuxtPage></NuxtPage>
      </NuxtLayout>
  </n-config-provider>
</template>
<script setup lang="ts">
import {NConfigProvider, type GlobalThemeOverrides} from "naive-ui";

const themeOverrides: GlobalThemeOverrides = {
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
</script>
