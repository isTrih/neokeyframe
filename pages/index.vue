<script setup lang="ts">
//获取查询参数
import {GetFeeds} from '~/apis/feed.ts';
import type {Card} from '~/types/feed.ts';
// import {useRequest} from 'pro-naive-ui'

const query = useRoute().query.query
onMounted(() => {
  console.log(query)
  console.log(GetFeeds(0, ''))
})

const showDetail = () => {
  console.log('点击了卡片')
}

// 主页卡片 //////////////////////////////////////////////////////////////////
// const cards = ref([]);
const cards = ref<Card[]>([]);
const disabled = ref(true); // 初始禁用滚动加载

const isload = ref(true);// 初始加载中

const columns = ref(0)
const card_columns = ref({})
const arrHeight = ref([])

// 主页获取帖子
const doQuery = async (offset: number, query: string) => {
  const res = await GetFeeds(offset, query);
  console.log(res)
  cards.value = res.data.feeds;
  waterFallInit(columns, card_columns, arrHeight, cards)
  disabled.value = false; // 启用滚动加载
};

// 无限滚动
const load = async () => {
  if(disabled.value !== true) {
    disabled.value = true;
    const offset = cards.value.length;
    let res
    if (query == null) {
      res = await GetFeeds(offset, '');
    } else {
      res = await GetFeeds(offset, query as string);
    }
    const more = res.data.feeds;
    if (more == null) {
      disabled.value = true;
      isload.value = false;
    } else {
      cards.value = [...cards.value, ...more];
      waterFallMore(arrHeight, card_columns, more)
      disabled.value = false;
    }
  }
};

// const {run} = useRequest(load, {
//   manual: true,
//   debounceWait: 1000,
// })
// 主页卡片结束////////////////////////////////////////////////////////////////

onMounted(async () => {
  await doQuery(0, '');
  resizeWaterFall(columns, card_columns, arrHeight, cards)
});

const {WaterFallHeight} = storeToRefs(useConfigStore())

</script>

<template>
  <div id="waterfall-container" ref="gridRef" class="h-full w-full">
    <div v-if="cards.length===0" id="waterfall-container" class="h-full w-full flex flex-col justify-center">
      <client-only>
        <n-empty size="huge" description="暂时还没有帖子"/>
      </client-only>
    </div>

    <div v-else id="waterfall-container" class="h-full w-full flex flex-col justify-center">
      <n-infinite-scroll :style="{height: WaterFallHeight+'px'}" :distance="100" @load="load">
        <FeedCards ref="homeCardRef" :card-columns="card_columns" @show-detail="showDetail"/>

        <!--      <div v-for="i in count" :key="i" class="item">-->
        <!--        {{ i }}-->
        <!--      </div>-->
        <div v-if="isload" class="flex justify-center align-center">
          加载中...
        </div>
        <div v-if="disabled" class="flex justify-center align-center">
            已经到底啦！ 🤪
        </div>
        <div v-if="disabled" class="text"/>
      </n-infinite-scroll>
    </div>
  </div>

</template>

<style scoped></style>
