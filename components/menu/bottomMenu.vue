<script setup lang="ts">
import {useModal} from "naive-ui";
import {AddCircleOutline, NotificationsOutline} from '@vicons/ionicons5';
import {LoginModal} from '#components';

const {CurrentMenu} = storeToRefs(useConfigStore());
console.log(CurrentMenu.value);

// 模态框
const modal = useModal();
// region 用户登陆态
const useUser = useUserStore();
const {UserInfo, IsLogin} = storeToRefs(useUser);

function handleClick(menu: string) {
  console.log(menu);
  if (menu === 'home') {
    CurrentMenu.value = 'home';
    navigateTo('/');
    return;
  } else if (menu === 'user') {
    if (!IsLogin.value) {
      showLogin()
      return;
    }
    CurrentMenu.value = 'user';
    navigateTo({name: 'user-uid', params: {uid: UserInfo.value.user_id}});
    return;
  }
  CurrentMenu.value = menu;
  navigateTo(`/${menu}`);
}

const avatar = computed(() => {
  if (UserInfo.value.avatar) {
    return String(UserInfo.value.avatar)
  }
  return ''
})

// endregion
function showLogin() {
  const m = modal.create({
    class: 'border-rd-xl w-90dvw',
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
};
onMounted(() => {
  console.log(IsLogin.value, UserInfo.value);
})
</script>

<template>
  <n-flex class="h-6dvh w-full" justify="space-around" :size="0" align="center">
    <div
        :class="['menu-item my-1 h-4.2dvh w-20dvw flex items-center justify-center',CurrentMenu=='home'?'menu-item-selected':'']"
        @click="handleClick('home')">
      <n-icon
          size="3dvh"
          :class="['icon', CurrentMenu=='home'?'color-[--czjB-7]':'color-[--text-1]']">
        <icons-home/>
      </n-icon>
    </div>
    <div
        :class="['menu-item my-1 h-4.2dvh w-20dvw flex items-center justify-center',CurrentMenu=='upload'?'menu-item-selected':'']"
        @click="handleClick('upload')">
      <n-icon
          size="3dvh"
          :class="['icon', CurrentMenu=='upload'?'color-[--czjB-7]':'color-[--text-1]']">
        <AddCircleOutline/>
      </n-icon>
    </div>
    <div
        :class="['menu-item my-1 h-4.2dvh w-20dvw flex items-center justify-center',CurrentMenu=='notification'?'menu-item-selected':'']"
        @click="handleClick('notification')">
      <n-icon
          size="3dvh"
          :class="['icon', CurrentMenu=='notification'?'color-[--czjB-7]':'color-[--text-1]']">
        <NotificationsOutline/>
      </n-icon>

    </div>
    <div
        :class="['menu-item my-1 h-4.2dvh w-20dvw flex items-center justify-center',CurrentMenu=='user'?'menu-item-selected':'']"
        @click="handleClick('user')">
      <n-icon
          v-show="!IsLogin" size="3dvh"
          :class="['icon', CurrentMenu=='user'?'color-[--czjB-7]':'color-[--text-1]']"
      >
        <div class="w-3dvh h-3dvh font-600 font-sans font-not-italic text-1.4dvh">
          登录
        </div>
      </n-icon>
      <n-icon
          v-show="IsLogin" size="3dvh"
          :class="['icon', CurrentMenu=='user'?'color-[--czjB-7]':'color-[--text-1]']">
        <n-avatar class="h-3dvh w-3dvh" round :src="avatar"/>
      </n-icon>
    </div>
  </n-flex>
</template>

<style scoped>
.menu-item:hover .icon {
  transition: all 0.3s ease;
  color: var(--czjB-5);
}

.menu-item:hover {
  background-color: var(--fill-3);
}

.menu-item-selected {
  background-color: var(--fill-2);
}

.menu-item {
  transition: all 0.3s ease;
  border-radius: 3dvh;
  margin-top: 0.8dvh;
  margin-bottom: 0.8dvh;
  cursor: pointer
}
</style>