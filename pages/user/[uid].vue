<script setup lang="ts">
import { GetUserInfo } from '~/apis/user'
import type { User } from '~/types/user'
import { IosArrowBack } from '@vicons/ionicons4'
import { NText } from 'naive-ui'
import Link from '~/components/menu/link.vue'
const { ContainerWidth, CurrentColor } = storeToRefs(
	useConfigStore()
)
const { UserInfo } = storeToRefs(useUserStore())
const userId = useRoute().params.uid
// 签名格式化
const signatureFormat = (signature: string) => {
	if (signature === 'CHAOZJ' || signature === '') {
		return t('ui.lazyUserMsg')
	}
	return signature
}
// 属地格式化
const ipLocationFormat = (location: string): string => {
	const parts = location.split('–')
	if (parts.length >= 3) {
		// 去除省份名称中的 "省", "特别行政区", "自治区" 等字符
		return parts[1]
	}
	return t('ui.unknown')
}
// 检查是否是自己
const checkUser = () => {
	return UserInfo.value.user_id === Number(userId)
}

const containerIsSmall = computed(() => {
	return ContainerWidth.value < 760
})
const isVerti = computed(() => {
	return CurrentUser.value.type > 1
})
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
	ip_location: ''
})
const router = useRouter()
// 初始化菜单
const InitMenu = () => {
	const { CurrentMenu } = storeToRefs(useConfigStore())
	CurrentMenu.value = 'user'
}

const isFullSignature = ref(false)

// 显示签名详情
const showSig = computed(() => {
	return isFullSignature.value === true ? 999 : 1
})
const changeSig = () => {
	isFullSignature.value = !isFullSignature.value
}
onMounted(async () => {
	const { data } = await GetUserInfo(Number(userId))

	if (checkUser()) {
		InitMenu()
	}

	CurrentUser.value = data
})
import Button from '~/components/menu/button.vue'
const userMore = computed(() => {
  return [
		{
			type: 'render',
			render: () => {
				return h(
					'div',
					{
						style:
							'display: flex; align-items: center; padding: 8px 12px;'
					},
					[
						h('div', null, [
							h(
								'div',
								{
									style:
										'font-size: 12px;margin-left:1rem'
								},
								[
									h(
										NText,
										{ depth: 3 },
										{ default: () => t('ui.menu') }
									)
								]
							)
						])
					]
				)
			},
			show: true
		},
		{
			type: 'render',
			render: () => {
				return h(Button, {
					title: t('ui.report'),
					thin: true,
          icon: false,
					onClick: () => {
            //TODO:举报逻辑
						console.log('举报逻辑')
					}
				})
			}
		}
	]
})
</script>

<template>
  <n-flex vertical class="h-full" align="center" :size="0">
    <n-flex class="w-full mt-1" align="center" justify="space-between">
      <n-button circle size="small" text @click="() => router.back()">
        <template #icon>
          <n-icon>
            <IosArrowBack/>
          </n-icon>
        </template>
        {{ $t('ui.back') }}
      </n-button>
      <n-dropdown trigger="hover" class="w-58 rounded-3xl" :options="userMore">
        <n-button class="mr-2" text circle size="small">
          •••
        </n-button>
      </n-dropdown>


    </n-flex>
    <div class="w-full">
      <n-grid class="w-full" cols="20 760:24" item-responsive>
        <n-gi span="1"/>
        <n-gi class="flex flex-col justify-center" offset="1" span="4">
          <div class="flex items-end justify-end">
            <n-avatar
                round
                :src="CurrentUser.avatar"
                :class="['relative z-0', containerIsSmall ? 'w-16 h-16' : 'w-28 h-28']"
            />
            <!-- 认证图标 -->
            <icons-verti
                v-if="isVerti&&!isDark"
                :class="['rounded-full border-2 z-10 bg-[--bg-2]',VertiColor, containerIsSmall ? 'ml-[-1.2rem] mb-[-0.2rem] w-6 h-6' : 'ml-[-2.2rem] mb-[-0.2rem] w-12 h-12']"/>
            <icons-verti-d
                v-if="isVerti&&isDark"
                :class="['rounded-full border-2 z-10 bg-[--bg-2]',VertiColor, containerIsSmall ? 'ml-[-1.2rem] mb-[-0.2rem] w-6 h-6' : 'ml-[-2.2rem] mb-[-0.2rem] w-12 h-12']"/>
          </div>
        </n-gi>
        <n-gi offset="1" span="12">
          <div class="h-full flex flex-col justify-center">
            <div class="">
              <n-text class="text-6" strong depth="1">
                {{ CurrentUser.user_name }}
              </n-text>
            </div>
            <n-flex style="gap: 0 12px!important;">
              <n-flex v-show="isVerti" align="center" :size="0">
                <icons-verti
                    v-if="isVerti&&!isDark"
                    :class="['rounded-full w-1rem h-1rem z-10 bg-[--bg-2]',VertiColor]"/>
                <icons-verti-d
                    v-if="isVerti&&isDark"
                    :class="['rounded-full w-1rem h-1rem bg-[--bg-2]',VertiColor]"/>
                <my-user-verti-note :user-note="CurrentUser.v_note" :user-type="CurrentUser.type"/>
              </n-flex>
              <n-text class="text-3 font-320 ml-0.1rem" depth="3">
                {{ $t('ui.kid') }}：{{ CurrentUser.user_id }}丨{{ $t('ui.ipLocation') }}：{{ ipLocationFormat(CurrentUser.ip_location) }}
              </n-text>
            </n-flex>
            <div v-show="!containerIsSmall" class="mt-1">
              <n-text class="text-4 font-400 whitespace-normal" style="white-space: pre-wrap;" depth="2">
                {{ signatureFormat(CurrentUser.signature) }}
              </n-text>
            </div>
            <div v-show="!containerIsSmall" class="mt-1 content-center">
              <n-text class="text-4 mr-0.5" depth="3" code>
                {{ numFormat(CurrentUser.follow_count) }}
              </n-text>
              <n-text class="text-4" depth="2">
                {{ $t('ui.follow') }}
              </n-text>
              <n-divider vertical/>
              <n-text class="text-4 ml-2 mr-0.5" depth="3" code>
                {{ numFormat(CurrentUser.fans_count) }}
              </n-text>
              <n-text class="text-4" depth="2">
                {{ $t('ui.fans') }}
              </n-text>
              <n-divider vertical/>
              <n-text class="text-4 ml-2 mr-0.5" depth="3" code>
                {{ numFormat(CurrentUser.feed_count) }}
              </n-text>
              <n-text class="text-4" depth="2">
                {{ $t('ui.posts') }}
              </n-text>
            </div>
          </div>
        </n-gi>
        <n-gi offset="0 760:1" class="content-center" span="20 760:4">
          <n-flex vertical class="mt-2 px-4 pr-4" justify="center" align="center" :size="0">
            <div v-show="containerIsSmall" class="rounded-1.8 w-full bg-[--fill-1] px-2">

              <n-ellipsis
                  class="rounded-1.8 pt-1 pb-0.5 mb-0 w-full mr-8" :line-clamp="showSig"
                  :tooltip="false" style="white-space: pre-wrap;">
                <n-text class=" text-3.5 font-400 sig" depth="2">
                  {{ signatureFormat(CurrentUser.signature) }}
                </n-text>
              </n-ellipsis>

              <div
                  class="mr-3 bt-1rem pt-0 mt-0 float-left w-3.8rem text-2.8 cursor-pointer color-[--czjB-5] hover-color[--czjB-7]"
                  @click="changeSig">{{isFullSignature===true? $t('ui.collapse'):$t('ui.details')}}
              </div>

            </div>
            <n-flex class="w-full mt-2" justify="space-between" align="center">
              <n-flex v-if="containerIsSmall" align="center" :size="0">
                <my-user-count :name="$t('ui.follow')" :value="CurrentUser.follow_count"/>
                <n-divider vertical/>
                <my-user-count :name="$t('ui.fans')" :value="CurrentUser.fans_count"/>
                <n-divider vertical/>
                <my-user-count :name="$t('ui.posts')" :value="CurrentUser.feed_count"/>
              </n-flex>
              <n-flex size="small">
                <n-button class="w-6rem" strong round type="primary">
                  {{ $t('ui.follow') }}
                </n-button>
              </n-flex>
            </n-flex>
          </n-flex>
        </n-gi>
      </n-grid>
    </div>
    <div class="h-full w-full">
      <my-user-detail v-if="CurrentUser.user_id!==0" :user-id="UserInfo.user_id" :current-id="CurrentUser.user_id"/>
    </div>
  </n-flex>

</template>

<style scoped>
</style>
