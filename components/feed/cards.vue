<script setup lang="ts">
import {IosHeartEmpty} from '@vicons/ionicons4';
import type {Card} from "~/types/feed";
import {h} from 'vue';
import {FeedDetail} from '#components';
import {useModal} from 'naive-ui';
// 监听容器宽度
const {ContainerWidth, IsSmall} = storeToRefs(useConfigStore());
// 设置组件传参
const props = defineProps({
  cardColumns: {
    type: Object,
    default: () => {
    }
  }
});

// 获取瀑布流列数
const len = computed(() => {
  return Object.keys(props.cardColumns).length;
});

// 数字模糊转换
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

const modal = useModal();

const showDetails = (id: number) => {
  console.log(id);
  const m = modal.create({
    class: IsSmall.value ? 'w-100dvw h-100dvh' : 'rounded-xl w-80dvw h-80dvh',
    preset: 'card',
    closable: false,
    content: () => h(FeedDetail, {
      class: 'flex items-center justify-center',
      fid: id,
      onCloseDetail: () => {
        m.destroy()
      }
    }, {}),
  });

  console.log('点击显示详情按钮');
};


onMounted(() => {
  // 检查图片是否已加载并添加 'loaded' 类
  Object.values(props.cardColumns).forEach((col: Card[]) => {
    col.forEach((card: Card) => {
      if (card.loaded) {
        const imgElement = document.getElementById(`img-${card.id}`);
        if (imgElement) {
          imgElement.classList.add('loaded');
        }
      }
    });
  });
});

onUnmounted(() => {
});

// 处理加载状态
const handleLoad = (card: Card) => {
  card.loaded = true;
};

const heightCaculate = (len: number, height: number, width: number) => {
  const cardWidth = (ContainerWidth.value / len - 32);
  const cardHeight = (cardWidth * height / width);
  const formalH = cardWidth * 148 / 105;
  if (cardHeight > formalH) {
    return formalH;
  } else {
    return cardHeight;
  }
};
</script>

<template>

  <div ref="colRef" class="flex flex-row justify-between">
    <div v-for="col in cardColumns" :key="col.id" :style="{width: 100/len + '%'}">
      <section v-for="card in col" :key="card.id">
        <div style="padding: 0" class="card">
          <a class="w-full" :href="`/frame/${card.id}`" @click.prevent="showDetails(card.id)">

            <n-image
                lazy
                :id="`img-${card.id}`"
                width="100%"
                object-fit="cover"
                preview-disabled
                :src="card.media_url"
                class="image"
                :height="heightCaculate(len, card.media.height, card.media.width)"
                alt=""
                @load="handleLoad(card)"
            >
              <template #placeholder>
                <n-skeleton
                    class="skeleton"
                    :height="heightCaculate(len, card.media.height, card.media.width)"
                />
              </template>
            </n-image>
          </a>
          <div style="padding: 0.1rem">
            <div
                id="title"
                style="margin-bottom: 6px;"
                @click="showDetails(card.id)"
            >
              {{ card.title }}
            </div>
            <div class="bottom" style="display:flex; justify-content: space-between; align-content: center;">
              <n-flex align="center" size="small">
                <nuxt-link class="flex align-center" :to="{name: 'user-uid', params: {uid: card.user.id}}">
                  <n-skeleton v-if="!card.loaded" circle height="24px"/>
                  <n-avatar
                      v-else
                      round
                      :size="24"
                      :src="card.user.avatar"
                      style="border: var(--gray-2) thin solid; border-radius: 100%; transition: all 0.4s ease;"
                      :alt="`${card.user.user_name}的头像`"
                  />
                </nuxt-link>
                <nuxt-link
                    class="flex align-center decoration-none text-xs user_name"
                    :to="{name: 'user-uid', params: {uid: card.user.id}}"
                >
                  <div class="user_name">{{ card.user.user_name }}</div>
                </nuxt-link>
              </n-flex>
              <n-flex align="center" justify="flex-end" :size="2" class="text-xs flex align-center">
                <n-icon>
                  <IosHeartEmpty/>
                </n-icon>
                {{ numFormat(card.like_num) }}
              </n-flex>
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
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: start;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
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

section {
  break-inside: avoid;
  margin: 0.1rem 0.3rem 1.2rem 0.3rem;
  transition: all 0.4s ease;
}

.card {
  border-radius: 1rem;
  background-color: transparent;
  transition: all 0.4s ease;
}

.skeleton {
  border-radius: 1rem;
  border: var(--gray-2) 1px solid;
  transition: all 0.4s ease;
}

.image {
  border-radius: 1rem;
  width: 100%;
  object-fit: cover;
  border: var(--gray-2) 1px solid;
  transition: all 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19);
  opacity: 1;
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