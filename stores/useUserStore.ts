import { defineStore } from 'pinia';

export interface UserInfo {
  avatar?: string;
  signature?: string;
  token?: string;
  type?: number;
  user_id?: number;
  user_name?: string;
}

export const useUserStore = defineStore(
  'UserStore',
  () => {
    // 用户信息
    const UserInfo = ref<UserInfo>({});
    // 用户关注
    const UserFollow = ref([]);
    // 用户收藏
    const UserCollect = ref([]);
    // 用户点赞
    const UserLike = ref([]);
    // 请求头
    const HeadersObj = ref([]);
    // 用户退出
    const UserLogout = function () {
      UserInfo.value = {};
    };
    const IsLogin = computed(() => {
      return Object.keys(UserInfo.value).length > 0;
    });
    return {
      UserInfo,
      UserLike,
      UserCollect,
      UserFollow,
      HeadersObj,
      UserLogout,
      IsLogin
    };
  },
  {
    persist: {
      // 设置存储方式为LocalStorage
      storage: piniaPluginPersistedstate.localStorage()
    }
  }
);
