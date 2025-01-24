<script setup lang="ts">
import {h, ref, type Component} from 'vue';
import {NIcon, NText, NButton, useModal} from 'naive-ui';
import home from '~/components/icons/home.vue';
import avatar from '~/components/icons/avatar.vue';
import Head from '~/components/menu/head.vue';
import {NuxtLink, LoginModal} from '#components';
import Button from '~/components/menu/button.vue';
import Theme from '~/components/menu/theme.vue';
import Link from '~/components/menu/link.vue';
import {AddCircleOutline as CreateIcon, NotificationsOutline as NotifIcon} from '@vicons/ionicons5';
import {MenuRound} from '@vicons/material';
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
    content: () => h(LoginModal, {
      class: 'flex items-center justify-center w-full',
      onCloseLogin: () => {
        m.destroy()
      }
    }, {}),
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
const moreIndex = ref(0)
const currentMore = computed(() => {
  if (moreIndex.value === 0) {
    return [
      {
        type: 'render',
        render: ()=>{
          return h(Button, {
            title: '关于关键帧',
            onClick: () => {
              // currentMore.value = aboutMore.value;
              moreIndex.value = 1;

              // console.log(currentMore.value);
            }
          });
        },
        show: true
      },
      {
        type: 'render',
        render: ()=>{
          return h(Button, {
            title: '隐私、协议',
            onClick: () => {
              moreIndex.value = 2;
            }
          });
        },
        show: true
      },
      {
        type: 'render',
        render: ()=>{
          return h(Button, {
            title: '友情链接',
            onClick: () => {
              moreIndex.value = 3;
            }
          });
        },
        show: true
      },
      {
        type: 'divider',
        key: 'none',
        show: true
      },
      {
        type: 'render',
        render: ()=>{
          return h(
              'div',
              {
                style: 'display: flex; align-items: center; padding: 8px 12px;'
              },
              [h('div', null, [h('div', {style: 'font-size: 12px;margin-left:1rem'}, [h(NText, {depth: 3}, {default: () => '设置'})])])]
          );
        },
        show: true
      },
      {
        type: 'render',
        render: ()=>{
          return h(Theme, {
            title: '深色模式'
          });
        },
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
          return h(Button, {
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
        render: ()=>{
          return h(Head, {
            title: '关于关键帧',
            onBack() {
              // currentMore.value = baseMore.value;
              moreIndex.value = 0;
            }
          });
        },
        show: true
      },
      {
        type: 'divider',
        key: 'd1',
        show: true
      },
      {
        type: 'render',
        render: ()=>{
          return h(Link, {
            title: '关于我们',
            icon: false,
            url: '/about'
          })
        },
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
        render: ()=>{
          return h(Head, {
            title: '隐私、协议',
            onBack() {
              // currentMore.value = baseMore.value;
              moreIndex.value = 0;

            }
          });
        },
        show: true
      },
      {
        type: 'divider',
        key: 'd1',
        show: true
      },
      {
        type: 'render',
        render: ()=>{
          return h(Link, {
            title: '用户协议',
            icon: false,
            url: '/doc/agreement'
          })
        },
        show: true
      },
      {
        type: 'render',
        render: ()=>{
          return h(Link, {
            title: '隐私协议',
            icon: false,
            url: '/doc/privacy'
          })
        },
        show: true
      },
      {
        type: 'render',
        render: ()=>{
          return h(Link, {
            title: '社区规范',
            icon: false,
            url: '/doc/socialrule'
          })
        },
        show: true
      }
    ];
  }else if (moreIndex.value === 3) {
    return [
      {
        type: 'render',
        render: ()=>{
          return h(Head, {
            title: '友情链接',
            onBack() {
              // currentMore.value = baseMore.value;
              moreIndex.value = 0;

            }
          });
        },
        show: true
      },
      {
        type: 'divider',
        key: 'd1',
        show: true
      },
      {
        type: 'render',
        render: ()=>{
          return h(Link, {
            title: 'MacWk - 精品mac软件下载',
            icon: false,
            url: 'https://macwk.com.cn/'
          })
        },
        show: true
      },
      {
        type: 'render',
        render: ()=>{
          return h(Link, {
            title: 'Lo研社 - Lolita图书馆',
            icon: false,
            url: 'https://lolitalibrary.com/'
          })
        },
        show: true
      },
      {
        type: 'render',
        render: ()=>{
          return h(Link, {
            title: '有礼贸 - 外贸教学实践平台',
            icon: false,
            url: '/doc/socialrule'
          })
        },
        show: true
      }
    ];
  }
  return []
});  // 设置渲染

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
          h('div', {style: 'font-size: 12px;'}, [
            h(
                'a',
                {
                  style: 'font-size: 12px;color:var(--n-text-color);text-decoration: none;',
                },
                {default: () => 'IP地址位置数据由'}
            ),
            h(
                NuxtLink,
                {
                  style: 'font-size: 12px;color:var(--n-text-color);text-decoration: none;',
                  to: 'https://www.cz88.net',
                  target: '_blank'
                },
                {default: () => '纯真CZ88'}
            ),
            h(
                'a',
                {
                  style: 'font-size: 12px;color:var(--n-text-color);text-decoration: none;',
                },
                {default: () => '提供支持'}
            )
          ]),
          h('div', {style: 'font-size: 12px;color:var(--n-text-color)'}, [h(NText, null, {default: () => 'Copyright © 2024-2025'})]),
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
        <n-dropdown trigger="click" class="w-64 rounded-3xl" :options="currentMore">
          <n-button block round quaternary size="large">
            <template #icon>
              <n-icon>
                <MenuRound />
              </n-icon>
            </template>
            更多
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
