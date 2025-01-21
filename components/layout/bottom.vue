<script setup lang="ts">
import {NButton, NIcon, useModal} from "naive-ui";
import {NuxtLink, LoginModal} from '#components';
import {AddCircleOutline as CreateIcon, NotificationsOutline as NotifIcon} from '@vicons/ionicons5';
import home from '~/components/icons/home.vue';
import avatar from '~/components/icons/avatar.vue';
// 模态框
const modal = useModal();
// region 用户登陆态
const useUser = useUserStore();
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
  },
  {
    label: () =>
        h(
            NButton,
            {
              onClick: showLogin
            },
            {default: () => '登录'}
        ),
    key: 'login',
    show: !IsLogin.value,
    icon: renderIcon(avatar)
  }
]);

//菜单图标渲染器
function renderIcon(icon: Component, props: string | null = null) {
  return () => h(NIcon, null, {default: () => h(icon, {src: props})});
}

//endregion
</script>

<template>
  <div class="w-full h-full">
    <n-flex class="w-full h-full" justify="center" align="center">
      <n-menu
v-model:value="CurrentMenu" mode="horizontal" class="fw-600 !p--0" :icon-size="26"
              :options="menuOptions"/>
    </n-flex>

</div></template>

<style scoped>

</style>