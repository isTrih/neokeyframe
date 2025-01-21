<script setup lang="ts">

const gridRef = ref(null);
const isSmall = ref(false)

const {WaterFallHeight, ContainerWidth} = storeToRefs(useConfigStore())
const {stop} = useResizeObserver(gridRef, debounce((entries: ResizeObserverEntry[]) => {
  for (const entry of entries) {
    const {height, width} = entry.contentRect;
    ContainerWidth.value = width
    WaterFallHeight.value = height - 20
    console.log('当前容器高度', WaterFallHeight.value, '容器宽度度', width);
    isSmall.value = window.innerWidth < 600;
  }
},30));
onMounted(() => {
})
onUnmounted(() => {
  stop()
})
</script>

<template>
  <div class="flex flex-col h-100dvh">
    <n-modal-provider>
      <div class="mt-4 mb-2 h-34px">
        <layout-header/>
      </div>

      <div class="h-full">
        <n-flex vertical class="h-full" :size="0">
          <n-grid class="h-full" :cols="14" item-responsive>
            <n-gi span="0 600:4 700:3 1000:2">
              <div class="h-full ml-4">
                <layout-side-nav/>
              </div>
            </n-gi>
            <n-gi ref="gridRef" class="mx-2" span="14 600:10 700:11 1000:12">
              <!--            <Suspense>-->
              <client-only>
                <slot/>
              </client-only>
              <!--            </Suspense>-->
            </n-gi>
          </n-grid>
          <div v-show="isSmall" class="h-7dvh bg-amber">
            <layout-bottom/>
          </div>
        </n-flex>
      </div>
    </n-modal-provider>
  </div>
</template>

<style scoped></style>
