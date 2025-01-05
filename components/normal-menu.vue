<script setup lang="ts">
import { ref, h, type Component } from "vue";
import { NIcon, type MenuOption } from "naive-ui";
import home from "~/components/icons/home.vue";
// import { BookOutline as BookIcon } from "@vicons/ionicons5";
// 菜单选中值
const activeKey = ref("");

//菜单图标渲染器
function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const menuOptions: MenuOption[] = [
  {
    label: "首页",
    key: "home",
    icon: renderIcon(home),
  },
  {
    label: "创作",
    key: "upload",
  },
  {
    label: "通知",
    key: "notification",
  },
  {
    label: "我",
    key: "user",
  },
];
</script>

<template>
  <n-menu :icon-size="32" v-model:value="activeKey" :options="menuOptions" />
</template>
