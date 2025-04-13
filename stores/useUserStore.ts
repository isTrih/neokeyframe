/*
 * 版权所有(c) Trih(HUA Haohui) 2025 - 2025
 * Copyright (c)Trih(HUA Haohui) 2025 - 2025, All Rights Reserved.
 */
import {
	type JetStreamClient,
	jetstream
} from '@nats-io/jetstream'
import {
	type Codec,
	type NatsConnection,
	wsconnect
} from '@nats-io/nats-core'
import type { MessageApiInjection } from 'naive-ui/es/message/src/MessageProvider'
import { defineStore } from 'pinia'
import { likeComment } from '~/apis/comment'
import { GetUserRelation, Login } from '~/apis/user'

export interface UserInfo {
	avatar?: string
	signature?: string
	token?: string
	type?: number
	user_id?: number
	user_name?: string
}

export const useUserStore = defineStore(
	'UserStore',
	() => {
		// 用户信息
		const UserInfo = ref<UserInfo>({})
		// 用户关注
		const FollowUsers = ref<number[]>([])
		// 用户收藏
		const CollectFeeds = ref<number[]>([])
		// 用户帖子点赞
		const LikeFeeds = ref<number[]>([])
		// 用户评论点赞
		const LikeComments = ref<number[]>([])
		// 用户操作临时缓存
		const LikeCommentsADD = []
		const LikeCommentsMINUS = []
		const LikeFeedsADD = []
		const LikeFeedsMINUS = []
		const CollectFeedsADD = []
		const CollectFeedsMINUS = []

		// 用来清除临时缓存
		function ClearActionCache() {
			LikeCommentsADD.length = 0
			LikeCommentsMINUS.length = 0
			LikeFeedsADD.length = 0
			LikeFeedsMINUS.length = 0
			CollectFeedsADD.length = 0
			CollectFeedsMINUS.length = 0
		}
		const CheckFollow = (uid: number) => {
			return FollowUsers.value.includes(uid)
		}

		// 获取用户关注、收藏、喜欢列表
		const GetUserList = async () => {
			GetUserRelation().then(res => {
				console.log('UserRelation', res)
				if (res.code === 0) {
					FollowUsers.value = res.data.follow_users
						.split(',')
						.map(Number)
					CollectFeeds.value = res.data.collect_feeds
						.split(',')
						.map(Number)
					LikeFeeds.value = res.data.like_feeds
						.split(',')
						.map(Number)
					LikeComments.value = res.data.like_comments
						.split(',')
						.map(Number)
				}
			})
		}

		// region 点赞收藏
		function likeNumFormat(num: number, id: number) {
			if (1000 <= num && num < 10000) {
				return `${(num / 1000).toFixed(1)}${t('ui.k')}+`
			}
			if (50000 >= num && num > 10000) {
				return `1${t('ui.w')}+`
			}
			if (100000 >= num && num > 50000) {
				return `5${t('ui.w')}+`
			}
			if (num > 100000) {
				return `10${t('ui.w')}+`
			}
			return LikeFeedsADD.includes(id)
				? (num + 1).toString()
				: LikeFeedsMINUS.includes(id)
					? (num + -1).toString()
					: num.toString()
		}
		const checkLike = (id: number) => {
			return LikeFeeds.value.includes(id)
		}
		const handleLike = (
			id: number,
			message: MessageApiInjection
		) => {
			if (Object.keys(UserInfo.value).length <= 0) {
				message.warning('请先登录')
				return
			}
			if (LikeFeeds.value.includes(id)) {
				console.log('取消点赞', id)
				// 这是移除本地点赞缓存
				removeItem(LikeFeeds.value, id)
				LikeFeedsMINUS.push(id)
			} else {
				console.log('点赞', id)
				LikeFeeds.value.push(id)
				LikeFeedsADD.push(id)
			}
		}

		function commentLikeNumFormat(
			num: number,
			id: number
		) {
			if (1000 <= num && num < 10000) {
				return `${(num / 1000).toFixed(1)}${t('ui.k')}+`
			}
			if (50000 >= num && num > 10000) {
				return `1${t('ui.w')}+`
			}
			if (100000 >= num && num > 50000) {
				return `5${t('ui.w')}+`
			}
			if (num > 100000) {
				return `10${t('ui.w')}+`
			}
			return LikeCommentsADD.includes(id)
				? (num + 1).toString()
				: LikeCommentsMINUS.includes(id)
					? (num + -1).toString()
					: num.toString()
		}

		const checkCommentLike = (id: number) => {
			return LikeComments.value.includes(id)
		}
		const handleCommentLike = (
			id: number,
			message: MessageApiInjection
		) => {
			if (Object.keys(UserInfo.value).length <= 0) {
				message.warning('请先登录')
				return
			}
			likeComment(id).then(res => {
				if (res.code === 0 && res.data.status === 'ok') {
					message.success('操作成功')
					if (LikeComments.value.includes(id)) {
						console.log('取消点赞', id)
						// 这是移除本地点赞缓存
						removeItem(LikeComments.value, id)
						LikeCommentsMINUS.push(id)
					} else {
						console.log('点赞', id)
						LikeComments.value.push(id)
						LikeCommentsADD.push(id)
					}
				} else {
					message.error(res.msg)
				}
			})
		}

		const collectNumFormat = (
			num: number,
			id: number
		) => {
			if (1000 <= num && num < 10000) {
				return `${(num / 1000).toFixed(1)}${t('ui.k')}+`
			}
			if (50000 >= num && num > 10000) {
				return `1${t('ui.w')}+`
			}
			if (100000 >= num && num > 50000) {
				return `5${t('ui.w')}+`
			}
			if (num > 100000) {
				return `10${t('ui.w')}+`
			}
			return CollectFeedsADD.includes(id)
				? (num + 1).toString()
				: CollectFeedsMINUS.includes(id)
					? (num + -1).toString()
					: num.toString()
		}
		const checkCollect = (id: number) => {
			return CollectFeeds.value.includes(id)
		}
		const handleCollect = (
			id: number,
			message: MessageApiInjection
		) => {
			if (!IsLogin.value) {
				message.warning('请先登录')
				return
			}
			if (CollectFeeds.value.includes(id)) {
				console.log('取消收藏', id)
				// 这是移除本地点赞缓存
				removeItem(CollectFeeds.value, id)
				CollectFeedsMINUS.push(id)
			} else {
				console.log('收藏', id)
				CollectFeeds.value.push(id)
				CollectFeedsADD.push(id)
			}
		}
		// endregion

		// 登录
		const UserLogin = async ({
			mobile,
			password
		}: { mobile: string; password: string }) => {
			const { code, msg, data } = await Login(
				mobile,
				password
			)
			console.log(data, msg, data)
			//TODO：可能获取其他用户信息
			if (code === 0) {
				console.log('success', data)
				UserInfo.value = {
					avatar: data.avatar,
					signature: data.signature,
					token: data.token,
					user_id: data.user_id,
					user_name: data.user_name,
					type: data.type
				}
				await GetUserList()
			}
			return { code, msg, data }
		}
		// 用户退出
		const UserLogout = () => {
			UserInfo.value = {}
		}
		const IsLogin = computed(() => {
			return Object.keys(UserInfo.value).length > 0
		})

		const notificationNum = ref(0)

		// NATS 连接和 JetStream
		const nc = ref<NatsConnection>(null)
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const js = ref<any>(null) // JetStream 客户端
		// 使用 Codec<string> 来处理消息的编解码
		const codec: Codec<string> = {
			encode: (data: string) =>
				new TextEncoder().encode(data),
			decode: (data: Uint8Array) =>
				new TextDecoder().decode(data)
		}
		// 订阅 NATS 消息
		const NatsInit = async () => {
			try {
				// 初始化 NATS 连接
				nc.value = await wsconnect({
					servers: 'wss://apix.checkpoint321.com/wss'
				})
				js.value = jetstream(nc.value)

				// 如果用户已经登录，订阅该用户的通知
				if (UserInfo.value.user_id) {
					const consumer = await js.value.consumers.get(
						'MESSAGES',
						{
							filterSubjects: [
								`KEYFRAME.MSG.${UserInfo.value.user_id}`
							],
							deliver_policy: 'new',
							ack_policy: 'explicit'
						}
					)
					const consumerMessages = await consumer.consume(
						{}
					)
					await (async () => {
						for await (const m of consumerMessages) {
							const msg = codec.decode(m.data)
							console.log('收到消息:', msg)

							// 更新未读通知计数
							notificationNum.value += 1

							// 这里可以将通知添加到你的通知列表中
							// 你可以根据自己的需求来处理通知的展示、分类等

							// 确认消息
							m.ack()
						}
					})()
				}
			} catch (e) {
				console.error('NATS连接或订阅失败', e)
			}
		}

		// 断开 NATS 连接
		const NatsClose = () => {
			if (nc.value) {
				nc.value.close()
				nc.value = null
			}
		}

		// 更新通知数
		const setNotificationNum = (num: number) => {
			notificationNum.value = num
		}

		// 查询未读通知数
		const getNotificationNum = () => {
			return notificationNum.value
		}
		return {
			ClearActionCache,
			NatsClose,
			NatsInit,
			UserLogout,
			UserLogin,
			UserInfo,
			CollectFeeds,
			LikeComments,
			LikeFeeds,
			IsLogin,
			FollowUsers,
			GetUserList,
			CheckFollow,
			likeNumFormat,
			handleLike,
			checkLike,
			checkCommentLike,
			handleCommentLike,
			commentLikeNumFormat,
			collectNumFormat,
			checkCollect,
			handleCollect,
			notificationNum
		}
	},
	{
		persist: {
			// 设置存储方式为LocalStorage
			storage: piniaPluginPersistedstate.localStorage()
		}
	}
)
