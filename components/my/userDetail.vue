<template>
  <div class="menu-wrapper">
    <!-- 按钮组 -->
    <div class="button-group">
      <button
          v-for="(item, index) in menuItems"
          :key="index"
          :class="[{ active: activeIndex === index },'color-[--text-1]']"
          @click="handleButtonClick(index)"
      >
        {{ item }}
      </button>
      <!-- 动画元素，半透明灰色圆角矩形 -->
      <div
          class="hover-rectangle"
          :style="{
          transform: `translateX(${rectanglePosition}px)`,
          width: rectangleWidth + 'px'
        }"
      />
    </div>
    <!-- 容器组 -->
    <div class="content-group">
      <transition-group
          name="slide-transition"
          tag="div"
          :css="true"
      >
        <div
            v-if="activeIndex!== null"
            id="userContainer"
            :key="activeIndex"
            :data-direction="getDirection"
            class="content-container"
        >

          <n-spin class="w-full content-center" :show="isload">
            <div v-if="showLogic" :style="{height: userContainerHeight+'px'}"
                 class="w-full flex flex-col justify-center">
              <client-only>
                <n-empty size="huge" description="只能看自己的哦">
                  <template #icon>
                    <n-icon>
                      <IosEyeOff/>
                    </n-icon>
                  </template>
                </n-empty>
              </client-only>
            </div>
            <n-infinite-scroll
                v-else
                class="rounded-2xl w-full content-center" :style="{height: userContainerHeight+'px'}"
                :distance="100" @load="load">
              <LazyFeedCards ref="homeCardRef" class="rounded-2xl" :card-columns="card_columns"
                             @show-detail="showDetail"/>

              <!--      <div v-for="i in count" :key="i" class="item">-->
              <!--        {{ i }}-->
              <!--      </div>-->
              <div v-if="isload" class="flex justify-center align-center">
                加载中...
              </div>
              <div v-if="disabled" class="flex justify-center align-center">
                没有更多喽！
              </div>
            </n-infinite-scroll>

          </n-spin>

        </div>
      </transition-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import {IosEyeOff} from '@vicons/ionicons4';
import {GetUserFeeds} from '~/apis/feed.ts';
import type {Card} from '~/types/feed.ts';
import {throttle} from '~/composables/utils.ts';
// 查看用户ID
const props = defineProps({
  // eslint-disable-next-line vue/require-default-prop
  userId: {
    type: Number as () => number | undefined, // 明确指定类型
    required: false // 由于可以为 undefined，所以设置为 false
  },
  currentId: {
    type: Number,
    required: true,
  },
})

// 主页卡片 //////////////////////////////////////////////////////////////////
// const cards = ref([]);
const cards0 = ref<Card[]>([]);
const cards1 = ref<Card[]>([]);
const cards2 = ref<Card[]>([]);
const disabled = ref(true); // 初始禁用滚动加载
const isload = ref(true);// 初始加载中

const columns = ref(0)
const card0_columns = ref({})
const card1_columns = ref({})
const card2_columns = ref({})

const card_columns = computed(() => {
  if (activeIndex.value === 0) {
    return card0_columns.value
  }if (activeIndex.value === 1) {
    return card1_columns.value
  }if (activeIndex.value === 2) {
    return card2_columns.value
  }
  return card0_columns.value
})
const arrHeight = ref([])

// 主页获取帖子
const doQuery = async (offset: number) => {
  const res = await GetUserFeeds(offset, props.currentId, activeType.value);
  console.log(res)
  switch (activeIndex.value) {
    case 0:
      cards0.value = res.data.feeds;
      waterFallInit(columns, card0_columns, arrHeight, cards0)
      break;
    case 1:
      cards1.value = res.data.feeds;
      waterFallInit(columns, card1_columns, arrHeight, cards1)
      break;
    case 2:
      cards2.value = res.data.feeds;
      waterFallInit(columns, card2_columns, arrHeight, cards2)
      break;
    default:
      break;
  }
  isload.value = false;// 加载完成
  disabled.value = false; // 启用滚动加载
};
// 防抖查询
const debounceDoQuery = throttle(doQuery, 500);
// 无限滚动
const load = async () => {
  if (disabled.value !== true) {
    switch (activeIndex.value) {
      case 0: {
        isload.value = true;
        disabled.value = true;
        const offset = cards0.value.length;
        const res = await GetUserFeeds(offset, props.currentId, activeType.value);
        const more = res.data.feeds;
        if (more.length === 0) {
          disabled.value = true;
          isload.value = false;
          console.log('没有更多了')
        } else {
          console.log('继续获取')
          cards0.value = [...cards0.value, ...more];
          waterFallMore(arrHeight, card0_columns, more)
          disabled.value = false;
          isload.value = false;
        }
        break;

      }
      case 1: {
        isload.value = true;
        disabled.value = true;
        const offset = cards1.value.length;
        const res = await GetUserFeeds(offset, props.currentId, activeType.value);
        const more = res.data.feeds;
        if (more.length === 0) {
          disabled.value = true;
          isload.value = false;
        } else {
          cards1.value = [...cards1.value, ...more];
          waterFallMore(arrHeight, card1_columns, more)
          disabled.value = false;
          isload.value = false;
        }
        break;
      }
      case 2: {
        isload.value = true;
        disabled.value = true;
        const offset = cards2.value.length;
        const res = await GetUserFeeds(offset, props.currentId, activeType.value);
        const more = res.data.feeds;
        if (more.length === 0) {
          disabled.value = true;
          isload.value = false;
        } else {
          cards2.value = [...cards2.value, ...more];
          waterFallMore(arrHeight, card2_columns, more)
          disabled.value = false;
          isload.value = false;
        }
        break;
      }
      default:
        break;
    }

  }
};

// 主页卡片结束////////////////////////////////////////////////////////////////

// 检查是否是自己
const showLogic = computed(() => {
  return props.currentId !== Number(props.userId) && activeIndex.value !== 0;
})

const showDetail = () => {
  console.log('点击了详情按钮')
}

// 定义菜单按钮的文本内容
const menuItems = ['帧动态', '收藏', '喜欢'];
// 记录当前选中按钮的索引，初始为 0
const activeIndex = ref(0);
const activeType = ref('帧动态');
// 记录上一次选中按钮的索引
const prevActiveIndex = ref<number | null>(null);// 记录半透明灰色圆角矩形的水平位置
const rectanglePosition = ref(0);
// 记录半透明灰色圆角矩形的宽度
const rectangleWidth = ref(0);
const userContainerHeight = ref(80);
// 重新计算半透明灰色圆角矩形的位置和宽度
const recalculateRectangle = () => {
  const button = document.querySelectorAll('.button-group button')[activeIndex.value] as HTMLElement;
  const userContainer = document.getElementById('userContainer') as HTMLElement;
  if (userContainer) {
    userContainerHeight.value = userContainer.offsetHeight - 20;
  }
  if (button) {
    rectanglePosition.value = button.offsetLeft;
    rectangleWidth.value = button.offsetWidth;
  }
};

// 处理按钮点击事件
const handleButtonClick = (index: number) => {
  prevActiveIndex.value = activeIndex.value;
  activeIndex.value = index;
  activeType.value = menuItems[index];
  switch (index) {
    case 0:
      if (cards0.value.length === 0) {
        debounceDoQuery(0, '')
      }
      break;
    case 1:
      if (cards1.value.length === 0 && !showLogic.value) {
        debounceDoQuery(0, '')
      }
      break;
    case 2:
      if (cards2.value.length === 0 && !showLogic.value) {
        debounceDoQuery(0, '')
      }
      break;
    default:
      break;
  }
  console.log(activeType.value);
};

// 计算切换方向
const getDirection = computed(() => {
  if (prevActiveIndex.value !== null) {
    console.log('上一个:', prevActiveIndex.value, '现在:', activeIndex.value);
    return activeIndex.value > prevActiveIndex.value ? 'forward' : 'backward';
  }
  return '';
});

onMounted(() => {
  // 组件挂载时，先进行一次初始计算
  recalculateRectangle();
  // 监听窗口大小变化事件，当窗口缩放时重新计算矩形的位置和宽度
  window.addEventListener('resize', recalculateRectangle);
  // 获取详情
  console.log(props.currentId);
  debounceDoQuery(0, '')
});

onUnmounted(() => {
  // 组件卸载时，移除窗口大小变化的监听器，避免内存泄漏
  window.removeEventListener('resize', recalculateRectangle);
});

// 监听 activeIndex 的变化，当选中按钮改变时重新计算矩形的位置和宽度
watch(() => activeIndex.value, () => {
  recalculateRectangle();
});
</script>

<style scoped>
.menu-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 1.2rem;
  position: relative;
  padding-top: 1.2rem;
  padding-bottom: 0.4rem;
}

.button-group button {
  background: none;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  position: relative;
  z-index: 1;
}

.hover-rectangle {
  position: absolute;
  bottom: 0.6rem;
  left: 0;
  height: 48%;
  background-color: var(--fill-1);
  border-radius: 20rem;
  transition: transform 0.3s ease, width 0.3s ease;
  z-index: -0;
}

.content-group {
  flex: 1;
  position: relative;
  overflow: hidden;
}

.content-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  background-color: var(--fill-1);
  box-shadow: var(--shadow-i-c);
  border-radius: 1rem;
  overflow: hidden;
}

/* 定义 slide-transition 过渡动画 */
.slide-transition-move {
  transition: transform 0.3s ease;
}

.slide-transition-enter-active {
  transition: transform 0.3s ease;
}

.slide-transition-leave-active {
  transition: transform 0.3s ease;
}

/* 小数字容器到大数字容器的动画 */
.slide-transition-enter-from[data-direction="forward"] {
  transform: translateX(100%);
}

.slide-transition-leave-to[data-direction="forward"] {
  transform: translateX(100%);
}

/* 大数字容器到小数字容器的动画 */
.slide-transition-enter-from[data-direction="backward"] {
  transform: translateX(-100%);
}

.slide-transition-leave-to[data-direction="backward"] {
  transform: translateX(-100%);
}
</style>