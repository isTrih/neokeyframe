<script setup lang="ts">
import { ref, h, type Component } from "vue";
import {
  NIcon,
  type MenuOption,
} from "naive-ui";
import home from "~/components/icons/home.vue";
import avatar from "~/components/icons/avatar.vue";
import {
  AddCircleOutline as CreateIcon,
  NotificationsOutline as NotifIcon,
} from "@vicons/ionicons5";

//region 菜单

// 菜单选项 TODO: 将登陆状态绑定到菜单上
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

// 菜单选中值
const activeKey = ref("");

//菜单图标渲染器
function renderIcon(icon: Component, props: string | null = null) {
  return () => h(NIcon, null, { default: () => h(icon, { src: props }) });
}

//endregion

//region 更多选项
import moreMenuHead from "~/components/moreMenuHead.vue";
import { NText, NButton } from "naive-ui";
import {NuxtLink} from "#components";

// 控制是否显示更多选项
const showMore = ref(false);

const aboutTitle = function () {
  return h(moreMenuHead, {
    title: "关于关键帧",
    onBack(){
      currentMore.value = baseMore;
    },
  });
};
const docsTitle = function () {
  return h(moreMenuHead, {
    title: "隐私、协议",
    onBack(){
      currentMore.value = baseMore;
    },
  });
};
// 默认更多选项
const baseMore = [
  {
    label: "关于关键帧",
    key: "about",
  },
  {
    label: "隐私、协议",
    key: "docs",
  },
  {
    type: "divider",
    key: "none",
  },
  {
    type: "render",
    render: renderSetting,
  },
  {
    label: "设置",
    key: "set",
  },
];
// 关于更多选项
const aboutMore = [
  {
    type: "render",
    render: aboutTitle,
  },
  {
    type: "divider",
    key: "d1",
  },
  {
    label: "关于我们",
    key: "about-1",
  },
  {
    type: "divider",
    key: "d2",
  },
  {
    type: "render",
    render: renderCertification,
  }
];
// 隐私更多选项
const docsMore = [
  {
    type: "render",
    render: docsTitle,
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
];
// 当前更多选项
const currentMore = ref(baseMore);
// 设置渲染
function renderSetting() {
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

/**
 * @description 关于页面的底栏
 */
function renderCertification() {
  return h(
      "div",
      {
        style: "display: flex; align-items: center; padding: 8px 12px;",
      },
      [
        h("div", null, [
          h("div", { style: "font-size: 12px;" }, [
            h(NuxtLink, { style: "font-size: 12px;color:rgb(118, 124, 130);text-decoration: none;",to:'https://beian.miit.gov.cn/',target:'_blank'}, { default: () => "皖ICP备2024039162号-6" }),
            h('a', { style: "font-size: 12px;color:rgb(118, 124, 130);text-decoration: none;pointer:none"}, { default: () => "丨" }),
            h(NuxtLink, { style: "font-size: 12px;color:rgb(118, 124, 130);text-decoration: none;",to:'https://www.helloimg.com/i/2025/01/06/677b702d6bd5a.jpg',target:'_blank'}, { default: () => "营业执照" }),
            h('a', { style: "font-size: 12px;color:rgb(118, 124, 130);text-decoration: none;pointer:none"}, { default: () => "丨" }),
            h(NuxtLink, { style: "font-size: 12px;color:rgb(118, 124, 130);text-decoration: none;",to:'https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=34020202000696',target:'_blank'}, { default: () => "皖公网安备34020202000696号" }),
            h('a', { style: "font-size: 12px;color:rgb(118, 124, 130);text-decoration: none;pointer:none"}, { default: () => "丨" }),
            h(NuxtLink, { style: "font-size: 12px;color:rgb(118, 124, 130);text-decoration: none;",to:'https://www.helloimg.com/i/2025/01/06/677b702ddaae5.jpg',target:'_blank'}, { default: () => "字体授权证书" }),
            h('a', { style: "font-size: 12px;color:rgb(118, 124, 130);text-decoration: none;pointer:none"}, { default: () => "丨" }),
            h(NuxtLink, { style: "font-size: 12px;color:rgb(118, 124, 130);text-decoration: none;",to:'https://12377.qinglangwuhu.cn/',target:'_blank'}, { default: () => "违法不良信息举报电话：12377" }),
            h('a', { style: "font-size: 12px;color:rgb(118, 124, 130);text-decoration: none;pointer:none"}, { default: () => "丨" }),
            h(NuxtLink, { style: "font-size: 12px;color:rgb(118, 124, 130);text-decoration: none;",to:'https://12377.qinglangwuhu.cn/',target:'_blank'}, { default: () => "芜湖市互联网举报中心" }),
            h('a', { style: "font-size: 12px;color:rgb(118, 124, 130);text-decoration: none;pointer:none"}, { default: () => "丨" }),
            h(NuxtLink, { style: "font-size: 12px;color:rgb(118, 124, 130);text-decoration: none;",to:'https://www.12377.cn/',target:'_blank'}, { default: () => "网上有害信息举报专区" }),
          ]),
          h("div", { style: "font-size: 12px;" }, [
            h(NText, { depth: 3 }, { default: () => "© 2024-2025" }),
          ]),
          h("div", { style: "font-size: 12px;" }, [
            h(NText, { depth: 3 }, { default: () => "芜湖超正经科技有限公司" }),
          ]),
          h("div", { style: "font-size: 12px;" }, [
            h(NText, { depth: 3 }, { default: () => "地址：安徽省芜湖市镜湖区范罗山街道蜂牛产业园D423室" }),
          ]),
          h("div", { style: "font-size: 12px;" }, [
            h(NText, { depth: 3 }, { default: () => "邮箱：help@chaozj.com" }),
          ])
        ]),
      ],
  );
}
/**
 * @description 切换 更多选项 显示状态
 * @returns void
 */
function clickMore() {
  showMore.value = !showMore.value;
}

/**
 * @description 处理 更多选项 点击事件
 * @param key 选中的选项的key
 * @returns void
 */
function handleSelect(key: string | number) {
  switch (key) {
    case "about":
      currentMore.value = aboutMore;
      break;
    case "about-1":
      window.open("/about/");
      break;
    case "docs":
      currentMore.value = docsMore;
      break;
  }
}

//endregion
</script>

<template>
  <client-only>
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
            class="w-64 rounded-xl"
            :options="currentMore"
            @select="handleSelect"
        >
          <n-button @click="clickMore" block quaternary size="large" round
          >更多
          </n-button>
        </n-dropdown>
      </div>
    </n-flex>
  </client-only>
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
