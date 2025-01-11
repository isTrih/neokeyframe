<script setup lang="ts">
import {h, ref, type Component} from 'vue';
import {NIcon, NText, NButton, useModal} from 'naive-ui';
import home from '~/components/icons/home.vue';
import avatar from '~/components/icons/avatar.vue';
import moreMenuHead from '~/components/moreMenuHead.vue';
import {NuxtLink, LoginModal} from '#components';
import moreMenuButton from '~/components/moreMenuButton.vue';
import moreMenuTheme from '~/components/moreMenuTheme.vue';
import {AddCircleOutline as CreateIcon, NotificationsOutline as NotifIcon, Menu} from '@vicons/ionicons5';

const useUser = useUserStore();

// 模态框
const modal = useModal();
// region 用户登陆态
const {UserInfo, IsLogin} = storeToRefs(useUser);
// endregion
const showLogin = function () {
  const m = modal.create({
    class: 'border-rd-xl w-40rem',
    preset: 'card',
    closable: false,
    content: () => h(LoginModal, {class: 'flex items-center justify-center w-full',
    onCloseLogin:()=>{
      m.destroy()
    }}, {

    }),
    transformOrigin: 'center'
  });
  // UserInfo.value = {
  //   user_id: 88,
  //   user_name: '一二三四五六七八九十',
  //   avatar: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
  // };
  // console.log(UserInfo);
};
// region 菜单
//菜单选中值
const {CurrentMenu} = storeToRefs(useConfigStore());

const menuOptions = computed(() => [
  {
    label: () =>
        h(
            NuxtLink,
            {
              to: '/'
            },
            {default: () => '首页'}
        ),
    key: 'home',
    icon: renderIcon(home)
  },
  {
    label: () =>
        h(
            NuxtLink,
            {
              to: '/upload'
            },
            {default: () => '创作'}
        ),
    key: 'upload',
    icon: renderIcon(CreateIcon)
  },
  {
    label: () =>
        h(
            NuxtLink,
            {
              to: '/notification'
            },
            {default: () => '通知'}
        ),
    key: 'notification',
    icon: renderIcon(NotifIcon)
  },
  {
    label: () =>
        h(
            NuxtLink,
            {
              to: {
                name: 'user-uid',
                params: {
                  uid: UserInfo.value.user_id
                }
              }
            },
            {default: () => (UserInfo.value.user_name === undefined ? '我' : UserInfo.value.user_name)}
        ),
    key: 'user',
    show: IsLogin.value,
    icon: renderIcon(avatar, UserInfo.value.avatar)
  }
]);

//菜单图标渲染器
function renderIcon(icon: Component, props: string | null = null) {
  return () => h(NIcon, null, {default: () => h(icon, {src: props})});
}

//endregion

// region 更多选项

// 控制是否显示更多选项

const aboutTitle = function () {
  return h(moreMenuHead, {
    title: '关于关键帧',
    onBack() {
      // currentMore.value = baseMore.value;
      moreIndex.value = 0;
    }
  });
};
const docsTitle = function () {
  return h(moreMenuHead, {
    title: '隐私、协议',
    onBack() {
      // currentMore.value = baseMore.value;
      moreIndex.value = 0;

    }
  });
};
const aboutButton = function () {
  return h(moreMenuButton, {
    title: '关于关键帧',
    onClick: () => {
      // currentMore.value = aboutMore.value;
      moreIndex.value = 1;

      // console.log(currentMore.value);
    }
  });
};
const docsButton = function () {
  return h(moreMenuButton, {
    title: '隐私、协议',
    onClick: () => {
      moreIndex.value = 2;

      // currentMore.value = docsMore.value;
    }

  });
};
const themeSettings = function () {
  return h(moreMenuTheme, {
    title: '深色模式'
  });
};
const moreIndex = ref(0)
// // 默认更多选项
// const baseMore = () => [
//   {
//     type: 'render',
//     render: aboutButton,
//     show: true
//   },
//   {
//     type: 'render',
//     render: docsButton,
//     show: true
//   },
//   {
//     type: 'divider',
//     key: 'none',
//     show: true
//   },
//   {
//     type: 'render',
//     render: renderSetting,
//     show: true
//   },
//   {
//     type: 'render',
//     render: themeSettings,
//     show: true
//   },
//   {
//     label: 'render',
//     key: '??',
//     show: false
//   },
//   {
//     type: 'render',
//     render: () => {
//       return h(moreMenuButton, {
//         title: '退出登陆',
//         icon: false,
//         onClick: () => {
//           useUser.UserLogout();
//         }
//       });
//     },
//     show: IsLogin.value
//   }
// ];
// // 关于更多选项
// const aboutMore = [
//   {
//     type: 'render',
//     render: aboutTitle,
//     show: true
//   },
//   {
//     type: 'divider',
//     key: 'd1',
//     show: true
//   },
//   {
//     label: '关于我们',
//     key: 'about-1',
//     show: true
//   },
//   {
//     type: 'divider',
//     key: 'd2',
//     show: true
//   },
//   {
//     type: 'render',
//     render: renderCertification,
//     show: true
//   }
// ];
// // 隐私更多选项
// const docsMore = [
//   {
//     type: 'render',
//     render: docsTitle,
//     show: true
//   },
//   {
//     type: 'divider',
//     key: 'd1',
//     show: true
//   },
//   {
//     label: '隐私协议',
//     key: 'about-1',
//     show: true
//   },
//   {
//     label: '用户协议',
//     key: 'agreement',
//     show: true
//   }
// ];
// 当前更多选项
const currentMore = computed(() => {
  if (moreIndex.value === 0) {
    return [
      {
        type: 'render',
        render: aboutButton,
        show: true
      },
      {
        type: 'render',
        render: docsButton,
        show: true
      },
      {
        type: 'divider',
        key: 'none',
        show: true
      },
      {
        type: 'render',
        render: renderSetting,
        show: true
      },
      {
        type: 'render',
        render: themeSettings,
        show: true
      },
      {
        label: 'render',
        key: '??',
        show: false
      },
      {
        type: 'render',
        render: () => {
          return h(moreMenuButton, {
            title: '退出登陆',
            icon: false,
            onClick: () => {
              useUser.UserLogout();
            }
          });
        },
        show: IsLogin.value
      }
    ];
  } else if (moreIndex.value === 1) {
    return [
      {
        type: 'render',
        render: aboutTitle,
        show: true
      },
      {
        type: 'divider',
        key: 'd1',
        show: true
      },
      {
        label: '关于我们',
        key: 'about-1',
        show: true
      },
      {
        type: 'divider',
        key: 'd2',
        show: true
      },
      {
        type: 'render',
        render: renderCertification,
        show: true
      }
    ]
  } else if (moreIndex.value === 2) {
    return [
      {
        type: 'render',
        render: docsTitle,
        show: true
      },
      {
        type: 'divider',
        key: 'd1',
        show: true
      },
      {
        label: '隐私协议',
        key: 'about-1',
        show: true
      },
      {
        label: '用户协议',
        key: 'agreement',
        show: true
      }
    ];
  }
  return []
});  // 设置渲染
console.log('currentMore', currentMore);

function renderSetting() {
  return h(
      'div',
      {
        style: 'display: flex; align-items: center; padding: 8px 12px;'
      },
      [h('div', null, [h('div', {style: 'font-size: 12px;'}, [h(NText, {depth: 3}, {default: () => '设置'})])])]
  );
}

/**
 * @description 关于页面的底栏
 */
function renderCertification() {
  return h(
      'div',
      {
        style: 'display: flex; align-items: center; padding: 8px 12px;'
      },
      [
        h('div', null, [
          h('div', {style: 'font-size: 12px;'}, [
            h(
                NuxtLink,
                {
                  style: 'font-size: 12px;color:var(--n-text-color);text-decoration: none;',
                  to: 'https://beian.miit.gov.cn/',
                  target: '_blank'
                },
                {default: () => '皖ICP备2024039162号-6'}
            ),
            h(
                'a',
                {
                  style: 'font-size: 12px;color:var(--n-text-color);text-decoration: none;',
                },
                {default: () => '丨'}
            ),
            h(
                NuxtLink,
                {
                  style: 'font-size: 12px;color:var(--n-text-color);text-decoration: none;',
                  to: 'https://www.helloimg.com/i/2025/01/06/677b702d6bd5a.jpg',
                  target: '_blank'
                },
                {default: () => '营业执照'}
            ),
            h(
                'a',
                {
                  style: 'font-size: 12px;color:var(--n-text-color);text-decoration: none;',
                },
                {default: () => '丨'}
            ),
            h(
                NuxtLink,
                {
                  style: 'font-size: 12px;color:var(--n-text-color);text-decoration: none;',
                  to: 'https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=34020202000696',
                  target: '_blank'
                },
                {default: () => '皖公网安备34020202000696号'}
            ),
            h(
                'a',
                {
                  style: 'font-size: 12px;color:var(--n-text-color);text-decoration: none;',
                },
                {default: () => '丨'}
            ),
            h(
                NuxtLink,
                {
                  style: 'font-size: 12px;color:var(--n-text-color);text-decoration: none;',
                  to: 'https://www.helloimg.com/i/2025/01/06/677b702ddaae5.jpg',
                  target: '_blank'
                },
                {default: () => '字体授权证书'}
            ),
            h(
                'a',
                {
                  style: 'font-size: 12px;color:var(--n-text-color);text-decoration: none;',
                },
                {default: () => '丨'}
            ),
            h(
                NuxtLink,
                {
                  style: 'font-size: 12px;color:var(--n-text-color);text-decoration: none;',
                  to: 'https://12377.qinglangwuhu.cn/',
                  target: '_blank'
                },
                {default: () => '违法不良信息举报电话：12377'}
            ),
            h(
                'a',
                {
                  style: 'font-size: 12px;color:var(--n-text-color);text-decoration: none;',
                },
                {default: () => '丨'}
            ),
            h(
                NuxtLink,
                {
                  style: 'font-size: 12px;color:var(--n-text-color);text-decoration: none;',
                  to: 'https://12377.qinglangwuhu.cn/',
                  target: '_blank'
                },
                {default: () => '芜湖市互联网举报中心'}
            ),
            h(
                'a',
                {
                  style: 'font-size: 12px;color:var(--n-text-color);text-decoration: none;',
                },
                {default: () => '丨'}
            ),
            h(
                NuxtLink,
                {
                  style: 'font-size: 12px;color:var(--n-text-color);text-decoration: none;',
                  to: 'https://www.12377.cn/',
                  target: '_blank'
                },
                {default: () => '网上有害信息举报专区'}
            )
          ]),
          h('div', {style: 'font-size: 12px;color:var(--n-text-color)'}, [h(NText, null, {default: () => '© 2024-2025'})]),
          h('div', {style: 'font-size: 12px;color:var(--n-text-color)'}, [
            h(NText, null, {default: () => '芜湖超正经科技有限公司'})
          ]),
          h('div', {style: 'font-size: 12px;color:var(--n-text-color)'}, [
            h(
                NText,
                null,
                {
                  default: () => '地址：安徽省芜湖市镜湖区范罗山街道蜂牛产业园D423室'
                }
            )
          ]),
          h('div', {style: 'font-size: 12px;color:var(--n-text-color)'}, [h(NText, null, {default: () => '邮箱：help@chaozj.com'})])
        ])
      ]
  );
}

/**
 * @description 处理 更多选项 点击事件
 * @param key 选中的选项的key
 * @returns void
 */
function handleSelect(key: string | number) {
  switch (key) {
    case 'about-1':
      window.open('/about/');
      moreIndex.value = 0;
      // currentMore.value = baseMore.value;
      break;
  }
}

//endregion
</script>

<template>
  <client-only>
      <n-flex class="h-full" vertical align="stretch">
        <div class="w-full h-auto flex-items-stretch">
          <n-menu v-model:value="CurrentMenu" class="fw-600 !p--0" :icon-size="26" :options="menuOptions"/>
          <n-button v-show="!IsLogin" block class="mt-1.5" type="primary" size="large" round @click="showLogin">
            登录
          </n-button>
        </div>
        <div class="h-full"/>
        <div class="flex-items-end w-full h-6dvh mb-4">
          <n-dropdown trigger="click" class="w-64 rounded-3xl" :options="currentMore" @select="handleSelect">
            <n-button block quaternary size="large" round>
              <template #icon>
                <Menu/>
              </template>
              更多</n-button>
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
