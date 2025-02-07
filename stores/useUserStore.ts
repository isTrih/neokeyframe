/*
 * 版权所有(c) Trih(HUA Haohui) 2025 - 2025
 * Copyright (c)Trih(HUA Haohui) 2025 - 2025, All Rights Reserved.
 */

import { defineStore } from "pinia";
import { Login , GetUserRelation} from "~/apis/user";

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
		const FollowUsers = ref<number[]>([]);
		// 用户收藏
		const CollectFeeds = ref<number[]>([]);
		// 用户帖子点赞
		const LikeFeeds = ref<number[]>([]);
		// 用户评论点赞
		const LikeComments = ref<number[]>([]);

		// 获取用户关注、收藏、喜欢列表
		const GetUserList = async () => {
			GetUserRelation().then((res) => {
				console.log("UserRelation", res);
				if (res.code===0){
					FollowUsers.value = res.data.follow_users.split(",").map(Number);
					CollectFeeds.value = res.data.collect_feeds.split(",").map(Number);
					LikeFeeds.value = res.data.like_comments.split(",").map(Number);
					LikeComments.value = res.data.like_comments.split(",").map(Number);
				}
			});
		};

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
				await GetUserList();
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
			CollectFeeds,
			LikeComments,
			LikeFeeds,
			IsLogin,
			FollowUsers,
			GetUserList,
		};
	},
	{
		persist: {
			// 设置存储方式为LocalStorage
			storage: piniaPluginPersistedstate.localStorage(),
		},
	},
);
