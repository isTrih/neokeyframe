<script setup lang="ts">
import { ref, h, type Component } from "vue";
import { NIcon, type MenuOption } from "naive-ui";
import home from "~/components/icons/home.vue";
import avatar from "~/components/icons/avatar.vue";
import {
  AddCircleOutline as CreateIcon,
  NotificationsOutline as NotifIcon,
} from "@vicons/ionicons5";
// 菜单选中值
const activeKey = ref("");

//菜单图标渲染器
function renderIcon(icon: Component, props: string | null = null) {
  return () => h(NIcon, null, { default: () => h(icon, { src: props }) });
}

//todo 将登陆状态绑定到菜单上
const menuOptions: MenuOption[] = [
  {
    label: "首页",
    key: "home",
    icon: renderIcon(home),
  },
  {
    label: "创作",
    key: "upload",
    icon: renderIcon(CreateIcon),
  },
  {
    label: "通知",
    key: "notification",
    icon: renderIcon(NotifIcon),
  },
  {
    label: "我",
    key: "user",
    show: true,
    icon: renderIcon(
      avatar,
      "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    ),
  },
];

import { useMessage, NText } from "naive-ui";
import moreMenuHead from "~/components/moreMenuHead.vue";
function settingTitle() {
  return h(
    "div",
    {
      style: "display: flex; align-items: center; padding: 8px 12px;",
    },
    [
      h("div", null, [
        h("div", { style: "font-size: 12px;" }, [
          h(NText, { depth: 3 }, { default: () => "设置" }),
        ]),
      ]),
    ],
  );
}
function MoreTitle() {
  return h(moreMenuHead, {
    title: "关于关键帧",
    subTitle: "这是一个关于关键帧的应用",
  });
}
const options = ref([
  {
    label: "关于关键帧",
    key: "about",
  },
  {
    label: "隐私协议",
    key: "privacy",
  },
  {
    label: "用户协议",
    key: "agreement",
  },
  {
    type: "divider",
    key: "d1",
  },
  {
    type: "render",
    render: settingTitle,
  },
  {
    label: "设置",
    key: "set",
  },
]);

const message = useMessage();
const showMore = ref(false);

function clickMore() {
  showMore.value = !showMore.value;
}

function handleSelect(key: string | number) {
  switch (key) {
    case "about":
      options.value = [
        {
          type: "render",
          render: MoreTitle,
        },
        {
          type: "divider",
          key: "d1",
        },
        {
          label: "隐私协议",
          key: "about-1",
        },
        {
          label: "用户协议",
          key: "agreement",
        },
        {
          type: "render",
          render: settingTitle,
        },
        {
          label: "设置",
          key: "set",
        },
      ];
  }
  message.info(String(key));
}
</script>

<template>
  <n-flex class="h-full" vertical align="stretch">
    <div class="w-full h-auto flex-items-stretch">
      <n-menu
        class="fw-600 !p--0"
        :icon-size="26"
        v-model:value="activeKey"
        :options="menuOptions"
      />
      <n-button block class="mt-1.5" type="primary" size="large" round>
        登录
      </n-button>
    </div>
    <div class="h-full"></div>
    <div class="flex-items-end w-full h-6dvh mb-4">
      <n-dropdown
        :show="showMore"
        class="w-xs rounded-xl"
        trigger="click"
        :options="options"
        @select="handleSelect"
      >
        <n-button @click="clickMore" block quaternary size="large" round
          >更多</n-button
        >
      </n-dropdown>
    </div>
  </n-flex>
</template>

<style scoped>
:deep(.n-menu-item) {
  --n-border-radius: 42px;
  width: 100%;
}

:deep(.n-menu-item ::before) {
  left: 0 !important;
  right: 0 !important;
}

:deep(.n-menu-item-content) {
  padding: 0 !important;
  padding-left: 12px !important;
  width: 100% !important;
  margin: 0 !important;
}

:deep(.n-menu-item-content--selected) {
  padding: 0 !important;
  padding-left: 16px !important;
  width: 100% !important;
  margin: 0 !important;
}
</style>
