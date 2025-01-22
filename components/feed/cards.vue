<script setup lang="ts">
import {IosHeartEmpty} from '@vicons/ionicons4';
import type {Card} from "~/types/feed";

//设置组件传参
const props = defineProps({
  cardColumns: {
    type: Object,
    default: () => {
    }
  }
})
//获取瀑布流列数
const len = computed(() => {

  return Object.keys(props.cardColumns).length;
})

//数字模糊转换
function numFormat(num: number) {
  if (10 < num && num <= 100) {
    return '10+';
  } else if (1000 >= num && num > 100) {
    return '100+';
  } else if (10000 >= num && num > 1000) {
    return '1千+';
  } else if (50000 >= num && num > 10000) {
    return '1万+';
  } else if (100000 >= num && num > 50000) {
    return '5万+';
  } else if (num > 100000) {
    return '10万+';
  } else if (num <= 10) {
    return num.toString();

  } else {
    return num;
  }

}

const emit = defineEmits(['show-detail'])
const showDetails = (id: number) => {
  // const details = (id, event) => {
  // const target = event.target;
  // const left = target.x;
  // const top = target.y;
  emit('show-detail', id)
  console.log('点击显示详情按钮')
}

// 监听容器宽度
const colRef = ref(null);
const {ContainerWidth} = storeToRefs(useConfigStore());

onMounted(() => {
  console.log(props.cardColumns)
})

onUnmounted(() => {
})

// 处理加载状态
const handleLoad = (card: Card) => {
  card.loaded = true
}

const heightCaculate = (len: number, height: number, width: number) => {
  const cardWidth = (ContainerWidth.value / len - 32)
  //   toFixed(3);
  // parseFloat(cardWidthStr);
  const cardHeight = (cardWidth * height / width)
  const formalH = cardWidth * 148 / 105
  // if (height < width) {
  //   console.log("横向",height);
  //   return height;
  // }
  if (cardHeight > formalH) {
    return formalH;
  } else {
    return cardHeight;
  }

  // 当元素尺寸发生变化时，resizeObserver.value会包含最新的尺寸信息
  // resizeObserver.value.height; // 获取高度
}
</script>
<template>
  <div ref="colRef" class="flex flex-row justify-between">
    <div v-for="col in cardColumns" :key="col.id" :style="{width: 100/len + '%'}">
      <section v-for="card in col" :key="card.id">
        <div v-show="card.loaded" style=" padding: 0" class="card">
          <a :href="`/explore/${card.id}`" @click.prevent="showDetails(card.id)">
            <img
                :src="card.media_url"
                class="image"
                :style="{width: 100 + '%',height:heightCaculate(len,card.media.height,card.media.width)+'px'}"
                alt=""
                @load="handleLoad(card)"
            >
          </a>
          <div style="padding: 0.1rem">
            <div
                id="title" style="margin-bottom: 6px;"
                @click="showDetails(card.id)">
              {{ card.title }}
            </div>
            <div class="bottom" style="display:flex; justify-content: space-between; align-content: center;">
              <n-flex align="center" size="small">
                <nuxt-link  class="flex align-center " :to="{name: 'user-uid',params: {uid: card.user.id}}">
                  <n-avatar
                      round
                      :size="24"
                      :src="card.user.avatar"
                      style="border: var(--gray-2) thin solid; border-radius: 100%;transition: all 0.4s ease;"
                      :alt="`${card.user.user_name}的头像`"
                  />
                </nuxt-link>
                <nuxt-link class=" flex align-center decoration-none text-xs user_name" :to="{name: 'user-uid',params: {uid: card.user.id}}">
                  <div class="user_name">{{ card.user.user_name }}</div>
                </nuxt-link>
              </n-flex>
              <n-flex align="center" justify="flex-end" :size="2" class="text-xs flex align-center">
                <!--//TODO:未来来这里实现外部点赞功能-->
                  <n-icon>
                    <IosHeartEmpty/>
                  </n-icon>
                  {{ numFormat(card.like_num) }}
              </n-flex>
            </div>
          </div>
        </div>
        <div v-if="!card.loaded" style=" padding: 0" class="card">
          <div class="card loading">
            <div
                class="image"
                :style="{width: 100 + '%',height:heightCaculate(len,card.media.height,card.media.width)+'px'}"
            />
            <div style="padding: 10px">
              <div
                  id="title" style="margin-bottom: 6px;"
                  @click="showDetails(card.id)">
                {{ card.title }}
              </div>
              <div class="bottom" style="display:flex; justify-content: space-between;">
                <n-flex align="center" size="small">
                  <nuxt-link  class="flex align-center " :to="{name: 'user-uid',params: {uid: card.user.id}}">
                    <n-avatar
                        round
                        :size="24"
                        :src="card.user.avatar"
                        style="border: var(--gray-2) thin solid; border-radius: 100%"
                        :alt="`${card.user.user_name}的头像`"
                    />
                  </nuxt-link>
                  <nuxt-link class=" flex align-center decoration-none text-xs user_name" :to="{name: 'user-uid',params: {uid: card.user.id}}">
                    <div class="user_name">{{ card.user.user_name }}</div>
                  </nuxt-link>
                </n-flex>
                <n-flex align="center" justify="flex-end" :size="2" class="text-xs flex align-center">
                  <!--//TODO:未来来这里实现外部点赞功能-->
                  <n-icon>
                    <IosHeartEmpty/>
                  </n-icon>
                  {{ numFormat(card.like_num) }}
                </n-flex>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
#title {
  transition: all 0.4s ease;
  white-space: normal; /* 允许换行 */
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: start;
  display: -webkit-box; /* 使用 WebKit 线框模型 */
  -webkit-line-clamp: 2; /* 限制显示两行 */
  -webkit-box-orient: vertical; /* 垂直排列内容 */

  margin-bottom: 0.2rem;
  color: var(--gray-10);
  font-size: 0.9rem;
  font-weight: 500;

  width: 100%;
}

.col {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.loading .image,
.loading .avatar {
  background: var(--gray-3) linear-gradient(
      100deg,
      rgba(255, 255, 255, 0) 40%,
      rgba(255, 255, 255, .4) 50%,
      rgba(255, 255, 255, 0) 60%
  );
  background-size: 200% 100%;
  background-position-x: 180%;
  animation: 1s loading ease-in-out infinite;
}

@keyframes loading {
  to {
    background-position-x: -20%;
  }
}

.loading .avatar {
  border-radius: 50%;
  height: 24px;
  width: 24px;
  transition: all 0.4s ease;

}

section {
  break-inside: avoid; /* 防止卡片被分割在两列中 */
  margin: 0.1rem 0.3rem 1.2rem 0.3rem;
  transition: all 0.4s ease;

}

.card {
  border-radius: 1rem;
  background-color: transparent;
  transition: all 0.4s ease;

}

.image {
  border-radius: 1rem;
  border: var(--gray-2) 1px solid;
  object-fit: cover;
  transition: all 0.4s ease;
}

.image:hover {
  opacity: 0.7;
}

.user_name {
  color: var(--gray-10);
  transition: all 0.2s ease;

}

.user_name:hover {
  color: var(--czjB-8);
  transition: all 0.2s ease;

}
</style>