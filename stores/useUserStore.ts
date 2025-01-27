import { defineStore } from "pinia";
import { Login } from "~/apis/user";

export interface UserInfo {
	avatar?: string;
	signature?: string;
	token?: string;
	type?: number;
	user_id?: number;
	user_name?: string;
}

export const useUserStore = defineStore(
	"UserStore",
	() => {
		// 用户信息
		const UserInfo = ref<UserInfo>({});
		// 用户关注
		const UserFollow = ref([]);
		// 用户收藏
		const UserCollect = ref([]);
		// 用户点赞
		const UserLike = ref([]);
		// 登录
		const UserLogin = async ({
			mobile,
			password,
		}: { mobile: string; password: string }) => {
			const {code, msg, data} = await Login(mobile, password);
			console.log(data, msg, data)
			//TODO：还要获取其他用户信息
			if (code === 0) {
				console.log("success", data);
				UserInfo.value = {
					avatar: data.avatar,
					signature: data.signature,
					token: data.token,
					user_id: data.user_id,
					user_name: data.user_name,
					type: data.type,
				};
			}
			return {code, msg, data};
		};
		// 用户退出
		const UserLogout = () => {
			UserInfo.value = {};
		};
		const IsLogin = computed(() => {
			return Object.keys(UserInfo.value).length > 0;
		});
		return {
			UserLogout,
			UserLogin,
			UserInfo,
			UserLike,
			UserCollect,
			UserFollow,
			IsLogin,
		};
	},
	{
		persist: {
			// 设置存储方式为LocalStorage
			storage: piniaPluginPersistedstate.localStorage(),
		},
	},
);
