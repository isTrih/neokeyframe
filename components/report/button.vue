<!--
  - 版权所有(c) Trih(HUA Haohui) 2025 - 2025
  - Copyright (c)Trih(HUA Haohui) 2025 - 2025, All Rights Reserved.
  -->

<script setup lang="ts">
import { NSelect } from 'naive-ui'
import { doReport } from '~/apis/report'
import Button from '~/components/menu/button.vue'

const dialog = useDialog()
const message = useMessage()
const props = defineProps({
	id: {
		// 1: 用户, 2: 文章, 3: 评论
		type: Number,
		default: 0
	},
	type: {
		type: Number,
		default: 0
	},
	tiny: {
		type: Boolean,
		default: false
	},
	user_id: {
		type: Number,
		default: 0
	}
})
// 1: 色情, 2: 骚扰, 3: 广告, 4: 政治, 5: 引战, 6: 辱骂, 7: 其他
const { UserInfo } = storeToRefs(useUserStore())
const options = [
	{
		label: '色情｜低俗',
		value: 1
	},
	{
		label: '骚扰',
		value: 2
	},
	{
		label: '广告',
		value: 3
	},
	{
		label: '政治敏感',
		value: 4
	},
	{
		label: '引战',
		value: 5
	},
	{
		label: '辱骂',
		value: 6
	},
	{
		label: '其他',
		value: 7
	}
]
const currentType = ref<number>()
// 检查是否是自己
const checkUser = computed(() => {
	return UserInfo.value.user_id === Number(props.user_id)
})
const show = (e: Event) => {
	e.stopPropagation()
	console.log('举报', props.id, props.type, props.user_id)
	if (Object.keys(UserInfo.value).length <= 0) {
		message.warning('请先登录')
		return
	}
	if (checkUser.value) {
		message.warning('不能举报自己哦！')
		return
	}
	const d = dialog.info({
		title: '举报',
		content: () =>
			h(
				'div',
				{
					class: 'w-full'
				},
				[
					h(
						'div',
						{
							class: 'ml-1 mb-2 text-3 font-bold'
						},
						'举报类型'
					),
					h(NSelect, {
						placeholder: '请选择举报类型',
						options: options,
						value: currentType.value,
						'onUpdate:value': (val: number) => {
							currentType.value = val
						}
					})
				]
			),
		positiveText: '确认',
		onPositiveClick: () => {
			d.loading = true
			return doReport(
				currentType.value,
				props.type,
				props.id,
				props.user_id
			).then(res => {
				if (res.code === 0) {
					d.loading = false
					d.destroy()
					message.success(
						'举报成功！感谢您的反馈，我们会尽快处理！'
					)
				} else {
					d.loading = false
					message.error('请求失败，请稍后再试！')
				}
			})
		}
	})
}

const userMore = computed(() => {
	return [
		{
			type: 'render',
			render: () => {
				return h(Button, {
					title: t('ui.report'),
					thin: true,
					tiny: props.tiny,
					icon: false,
					onClick: (e: Event) => {
						e.stopPropagation() // 再次确保阻止事件冒泡
						show(e)
					}
				})
			}
		}
	]
})
</script>

<template>
  <n-dropdown 
    trigger="hover" 
    :class="tiny?'w-36 rounded-3xl':'w-58 rounded-3xl'" 
    :options="userMore"
    @click.stop
  >
    <n-button 
      class="mr-2" 
      text 
      circle 
      size="small"
      @click.stop
    >
      •••
    </n-button>
  </n-dropdown>
</template>

<style scoped>

</style>