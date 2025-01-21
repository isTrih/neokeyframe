<script setup lang="ts">
  import { Search } from '@vicons/ionicons5';
  import {MenuRound} from '@vicons/material';
  import {NButton, NIcon, NText} from 'naive-ui';
  import Head from '~/components/menu/head.vue';
  import {NuxtLink} from '#components';
  import Button from '~/components/menu/button.vue';
  import Theme from '~/components/menu/theme.vue';
  import Link from '~/components/menu/link.vue';

  // region 用户登陆态
  const useUser = useUserStore();
  const {IsLogin} = storeToRefs(useUser);
  // endregion
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
              thin:true,
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
              thin:true,
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
              thin:true,
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
              thin: true,
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
              thin: true,
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
              thin: true,
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
              thin: true,
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
              thin: true,
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
              title: 'MacWk-精品mac软件',
              icon: false,
              thin: true,
              url: 'https://macwk.com.cn/'
            })
          },
          show: true
        },
        {
          type: 'render',
          render: ()=>{
            return h(Link, {
              title: 'Lo研社-Lolita图书馆',
              icon: false,
              thin: true,
              url: 'https://lolitalibrary.com/'
            })
          },
          show: true
        },
        {
          type: 'render',
          render: ()=>{
            return h(Link, {
              title: '有礼贸-外贸实践平台',
              icon: false,
              thin: true,
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
    <n-grid :cols="24" item-responsive>
      <n-gi offset="1" span="0 600:5 780:3" class="flex justify-center">
        <icons-keyframe class="icon"/>
      </n-gi>
      <n-gi offset="1 320:1 450:2 " span="0 600:12">
        <n-input id="search" round placeholder="搜索更多内容">
          <!--          TODO:实现搜索逻辑-->
          <template #suffix>
            <n-icon :component="Search" />
          </template>
        </n-input>
      </n-gi>
      <n-gi span="24 600:0">
        <n-flex class="w-full" justify="space-between">
          <icons-keyframe class="icon ml-4"/>
          <n-flex class="mr-4" align="center" size="small">
            <n-button circle quaternary >
              <template #icon>
                <n-icon>
                  <Search />
                </n-icon>
              </template>
            </n-button>
            <n-dropdown trigger="click" class="w-58 rounded-3xl" :options="currentMore">
              <n-button circle quaternary >
                <template #icon>
                  <n-icon>
                    <MenuRound />
                  </n-icon>
                </template>
              </n-button>
            </n-dropdown>

          </n-flex>
        </n-flex>
      </n-gi>
    </n-grid>
  </client-only>
</template>

<style scoped>
.icon {
  color: var(--czjB-5);
}
</style>
