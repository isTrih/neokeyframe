<script setup lang="ts">
import {GetUserInfo} from "~/apis/user";
import type {User} from "~/types/user";
import {IosArrowBack} from "@vicons/ionicons4"

const {ContainerWidth, CurrentColor} = storeToRefs(useConfigStore())
const {UserInfo} = storeToRefs(useUserStore())
const userId = useRoute().params.uid
// 签名格式化
const signatureFormat = (signature: string) => {
  if (signature === 'CHAOZJ' || signature === '') {
    return "这是一只懒惰的小帧，还未设置简介。"
  } else {
    return signature;
  }
};
// 属地格式化
const getProvince = (location: string): string => {
  const parts = location.split('–');
  if (parts.length >= 3) {
    // 去除省份名称中的 "省", "特别行政区", "自治区" 等字符
    return parts[1];
  }
  return '未知';
}
const checkUser = () => {
  return UserInfo.value.user_id === Number(userId);
}
// {
//   "user_id": 10,
//     "user_name": "三氢超正经",
//     "avatar": "https://coss.chaozj.com/avatar/test_1.jpg&#34;,
//     "type": 3,
//     "status": 0,
//     "v_note": "纯正劳模",
//     "signature": "CHAOZJ",
//     "feed_count": 6,
//     "fans_count": 0,
//     "follow_count": 0,
//     "ip_location": "中国|0|江苏省|0|移动"
// }

const isSmall = computed(() => {
  return ContainerWidth.value < 760;
})

const isVerti = computed(() => {
  return CurrentUser.value.type > 1
});
const VertiColor = computed(() => {
  if (CurrentUser.value.type === 2) {
    // 个人认证
    return 'color-[--czjB-6]'
  }
  if (CurrentUser.value.type === 3) {
    return 'color-[--czjY-6]'
  }
  if (CurrentUser.value.type > 3) {
    return 'color-[--v-1]'
  }
  return ''
})
const isDark = computed(() => {
  return CurrentColor.value === 'dark'
})
// 检查是否是自己
const CurrentUser = ref<User>({
  user_id: 0,
  user_name: '',
  avatar: '',
  type: 0,
  status: 0,
  v_note: '',
  signature: '',
  feed_count: 0,
  fans_count: 0,
  follow_count: 0,
  ip_location: '',
})
// 初始化菜单
const InitMenu = () => {
  const {CurrentMenu} = storeToRefs(useConfigStore());
  CurrentMenu.value = 'user';
}
onMounted(async () => {
  const res = await GetUserInfo(Number(userId))

  if (checkUser()) {
    InitMenu()
  }

  CurrentUser.value = res.data
})


</script>

<template>
  <n-flex vertical class="h-full" align="center" :size="0">
    <n-flex class="w-full" align="start">
      <n-button circle size="small" text @click="() => useRouter().back()">
        <template #icon>
          <n-icon>
            <IosArrowBack/>
          </n-icon>
        </template>
        返回
      </n-button>
    </n-flex>
    <div class="w-full">
      <n-grid class="w-full" cols="20 760:24" item-responsive>
        <n-gi span="1"/>
        <n-gi class="flex flex-col justify-center" offset="1" span="4">
          <div class="flex items-end justify-end">
            <n-avatar
                round
                :src="CurrentUser.avatar"
                :class="['relative z-0', isSmall ? 'w-16 h-16' : 'w-28 h-28']"
            />
            <!--            <div :class="['rounded-full border-2 z-10 bg-[&#45;&#45;bg-2]', isSmall ? 'ml-[-1.2rem] mb-[-0.0rem] w-6 h-6' : 'ml-[-1.4rem] mb-[-0.2rem]']"/>-->
            <!-- 认证图标 -->
            <icons-verti
                v-if="isVerti&&!isDark"
                :class="['rounded-full border-2 z-10 bg-[--bg-2]',VertiColor, isSmall ? 'ml-[-1.2rem] mb-[-0.2rem] w-6 h-6' : 'ml-[-2.2rem] mb-[-0.2rem] w-12 h-12']"/>
            <icons-verti-d
                v-if="isVerti&&isDark"
                :class="['rounded-full border-2 z-10 bg-[--bg-2]',VertiColor, isSmall ? 'ml-[-1.2rem] mb-[-0.2rem] w-6 h-6' : 'ml-[-2.2rem] mb-[-0.2rem] w-12 h-12']"/>
          </div>
        </n-gi>
        <n-gi offset="1" span="12">
          <div class="h-full flex flex-col justify-center">
            <div class="">
              <n-text class="text-6" strong depth="1">
                {{ CurrentUser.user_name }}
              </n-text>
            </div>
            <n-flex style="gap: 0px 12px!important;">
              <n-flex v-show="isVerti" align="center" :size="0" >
                <icons-verti
                    v-if="isVerti&&!isDark"
                    :class="['rounded-full w-1rem h-1rem z-10 bg-[--bg-2]',VertiColor]"/>
                <icons-verti-d
                    v-if="isVerti&&isDark"
                    :class="['rounded-full w-1rem h-1rem bg-[--bg-2]',VertiColor]"/>
                <my-user-verti-note :user-note="CurrentUser.v_note" :user-type="CurrentUser.type"/>
              </n-flex>
              <n-text class="text-3 font-320 ml-0.1rem" depth="3">
                关键帧号：{{ CurrentUser.user_id }}丨IP属地：{{ getProvince(CurrentUser.ip_location) }}
              </n-text>
            </n-flex>
            <div v-show="!isSmall" class="mt-1">
              <n-text class="text-4 font-400 whitespace-normal" style="white-space: pre-wrap;" depth="2">
                {{ signatureFormat(CurrentUser.signature) }}
              </n-text>
            </div>
            <div v-show="!isSmall" class="mt-1">
              <n-text class="text-4 mr-0.5" depth="3" code>
                {{ CurrentUser.follow_count }}
              </n-text>
              <n-text class="text-4" depth="2">
                关注
              </n-text>
              <n-text class="text-4 ml-2 mr-0.5" depth="3" code>
                {{ CurrentUser.fans_count }}
              </n-text>
              <n-text class="text-4" depth="2">
                粉丝
              </n-text>
              <n-text class="text-4 ml-2 mr-0.5" depth="3" code>
                {{ CurrentUser.feed_count }}
              </n-text>
              <n-text class="text-4" depth="2">
                帧数
              </n-text>
            </div>
          </div>
        </n-gi>
        <n-gi offset="0 760:1" class="content-center" span="20 760:4">
          <n-flex vertical class="mt-2 mx-8" :size="0">
            <div v-show="isSmall">
              <div>
                <n-text class="text-3.2 font-400" depth="2" style="white-space: pre-wrap;">
                  {{ signatureFormat(CurrentUser.signature) }}
                </n-text>
              </div>
            </div>
            <n-flex class="w-full mt-2" justify="space-between" align="center">
              <n-flex v-if="isSmall">
                <my-user-count name="关注" :value="CurrentUser.follow_count"/>
                <my-user-count name="粉丝" :value="CurrentUser.fans_count"/>
                <my-user-count name="帧数" :value="CurrentUser.feed_count"/>
              </n-flex>
              <n-flex size="small">
                <n-button class="w-6rem" size="large" strong round type="primary">
                  关注
                </n-button>
                <n-button quaternary circle size="large">
                  •••
                </n-button>
              </n-flex>
            </n-flex>
          </n-flex>
        </n-gi>
      </n-grid>
    </div>
    <div class="h-full w-full bg-blue">
      ss
    </div>
  </n-flex>

</template>

<style scoped></style>
