<script setup lang="ts">
const gridRef = ref(null)

const { WaterFallHeight, ContainerWidth, IsSmall } =
	storeToRefs(useConfigStore())
const { stop } = useResizeObserver(
	gridRef,
	debounce((entries: ResizeObserverEntry[]) => {
		for (const entry of entries) {
			const { height, width } = entry.contentRect
			ContainerWidth.value = width
			WaterFallHeight.value = height - 20
			console.log(
				'当前容器高度',
				WaterFallHeight.value,
				'容器宽度度',
				width
			)
			IsSmall.value = window.innerWidth < 600
		}
	}, 30)
)
const notClient = ref(true)
onMounted(() => {
	notClient.value = false
})
onUnmounted(() => {
	stop()
})
</script>

<template>
  <div class="flex flex-col h-100dvh">
    <n-modal-provider>
        <client-only>
          <n-watermark
        content="开发版本，注册无效"
        cross
        fullscreen
        :font-size="16"
        :line-height="16"
        :width="384"
        :height="384"
        :x-offset="12"
        :y-offset="60"
        :rotate="-15"
    /></client-only>
        <div class="pt-4 pb-2 h-34px">
        <layout-header/>
      </div>
        <div class="h-full">
        <n-flex vertical class="h-full" :size="0">

          <n-grid class="h-full" :cols="14" item-responsive>
            <n-gi span="3 1:0 600:4 700:3 1000:2">
              <div class="h-full pl-4 pr-2">
                <layout-side-nav/>
              </div>
            </n-gi>
            <n-gi ref="gridRef" class="mb-2 px-2 mx-2 bg-[--bg-2] shadow-[--shadow-i-c] rounded-2xl" span="11 1:14 600:10 700:11 1000:12">
              <div v-if="notClient" class="h-full w-full flex flex-col justify-center align-center">
                <n-empty description="正在加载中...">
                  <template #icon>
                    <n-spin />
                  </template>
                </n-empty>
              </div>
              <!--            <Suspense>-->
                <slot/>
              <!--            </Suspense>-->
            </n-gi>
          </n-grid>

            <div v-show="IsSmall" class="h-6dvh">
            <layout-bottom/>
          </div>

        </n-flex>
      </div>
    </n-modal-provider>
  </div>
</template>

<style scoped></style>
