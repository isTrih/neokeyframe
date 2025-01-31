<script setup lang="ts">
//获取查询参数
import {GetFeeds} from '~/apis/feed'
import type {Card} from '~/types/feed'

const query = computed(() => {
	const { query } = useRoute()
	return query.q ? query.q : ''
})

const cards = ref<Card[]>([])
const disabled = ref(true) // 初始禁用滚动加载

const isload = ref(true) // 初始加载中

const columns = ref(0)
const card_columns = ref({})
const arrHeight = ref([])

useHead({
  title: '每一秒都是关键帧',
  meta: [
    { name: 'keywords', content: '关键帧, 关键帧社区, 关键帧动画, 动画社区, 二次元社区, 半次元, 二次元, 约稿, 米画师，画加, 优动漫, csp ,动画, 小红书' }
  ]
})


onMounted(async () => {
	InitMenu()
  GetFeeds(0, query.value as string).then(res=>{
    console.log('data', res)
    cards.value = res.data.feeds
    waterFallInit(columns, card_columns, arrHeight, cards)

    isload.value = false // 加载完成
    disabled.value = false // 启用滚动加载
    resizeWaterFall(columns, card_columns, arrHeight, cards)
  })
})

const showDetail = () => {
	console.log('点击了卡片')
}

// 主页卡片 //////////////////////////////////////////////////////////////////
// const cards = ref([]);

// 无限滚动
const load = async () => {
	if (disabled.value !== true) {
		isload.value = true
		disabled.value = true
		const offset = cards.value.length
		const res = await GetFeeds(
			offset,
			query.value as string
		)
    console.log('load:res', res)
		const more = res.data.feeds
		if (more == null) {
			disabled.value = true
			isload.value = false
		} else {
			cards.value = [...cards.value, ...more]
			waterFallMore(arrHeight, card_columns, more)
			disabled.value = false
			isload.value = false
		}
	}
}

// 主页卡片结束////////////////////////////////////////////////////////////////
const InitMenu = () => {
	//store客户端
	const { CurrentMenu } = storeToRefs(useConfigStore())
	CurrentMenu.value = 'home'
}

const { WaterFallHeight } = storeToRefs(useConfigStore())
</script>

<template>
  <div>
  </div>
  <client-only>
  <div id="waterfall-container" ref="gridRef" class="h-full w-full ">
    <div
        v-if="cards.length===0" id="waterfall-container"
        class="h-full w-full flex flex-col justify-center align-center">
      <n-empty description="正在加载中...">
        <template #icon>
          <n-spin/>
        </template>
      </n-empty>
    </div>
    <div v-else id="waterfall-container" class="h-full w-full flex flex-col justify-center">
      <n-spin :show="isload">
        <n-infinite-scroll class="rounded-2xl" :style="{height: WaterFallHeight+'px'}" :distance="100" @load="load">
          <FeedCards ref="homeCardRef" class="rounded-2xl" :card-columns="card_columns" @show-detail="showDetail"/>
          <div v-if="isload" class="flex justify-center align-center">
            加载中...
          </div>
          <div v-if="disabled" class="flex justify-center align-center">
            已经到底啦！ 🤪
          </div>
          <div v-if="disabled" class="text"/>
        </n-infinite-scroll>
      </n-spin>

    </div>
  </div>
  </client-only>
</template>

<style scoped></style>
