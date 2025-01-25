<script setup lang="ts">
import { Close } from "@vicons/ionicons5";
import { FeedBPlayer } from "#components";
// 组件属性
const props = defineProps({
	fid: {
		type: Number,
		required: true,
	},
	single: {
		type: Boolean,
		default: false,
	},
});
const richTextConfig = ref({
	markers: ["bp"],
	//使用方式是先在markers中添加标记文本
	//[!xxx param=??!]
	//再在components中添加文本对应的组件
	components: {
		bp: FeedBPlayer,
	},
});
// 定义组件方法
const emit = defineEmits(["closeDetail"]);
//
const { IsSmall, WaterFallHeight } = storeToRefs(useConfigStore());

function singleClick() {
	if (props.single) {
		navigateTo("/");
	} else {
		emit("closeDetail");
	}
}
</script>

<template>

  <div>

    <n-tooltip v-if="!IsSmall&&!single" trigger="hover" :show-arrow="false"
               :style="[{fontSize: '0.6rem'},{height: '1rem'},{ width: '2.8rem' },{ background: `var(--bg-2)`},{ color: `var(--text-1)` }]">
      <template #trigger>
        <n-float-button position="absolute" class="op-80 hover-op-100" height="30" :right="20"
                        :top="20" @click="emit('closeDetail')"
        >
          <n-icon>
            <Close/>
          </n-icon>
        </n-float-button>
      </template>
      <n-text class="color-[--text-2]">关闭</n-text>
      <n-text class="color-[--text-2]" code>ESC</n-text>
    </n-tooltip>


    <n-grid v-if="!IsSmall">
      <n-gi class="mediaContainer" span="12">
        大图片组{{ fid }}
        <div v-rich-text-render="richTextConfig">
          这是一个包含 [!bp aid="{{ fid }}"!] 的示例文本。
        </div>
      </n-gi>
      <n-gi class="InfoContainer" span="12">
        这是文字
      </n-gi>
    </n-grid>
    <n-scrollbar :style="{maxHeight: WaterFallHeight+'px'}">
      <n-flex v-if="IsSmall" vertical>
        <n-flex class="w-full" align="center" justify="space-between">
          <n-button class="op-80 hover-op-100" height="30" @click="singleClick">
            <n-icon>
              <Close/>
            </n-icon>
          </n-button>
        </n-flex>
        <div>
          详情部分
          <div v-rich-text-render="richTextConfig">
            这是一个使用变量的，当前id为{{ fid }}
            [!bp aid="{{ fid }}"!]
            <br>
            这是使用av号的
            [!bp aid=1155780864!]
            <br>
            这是使用bv号的
            [!bp bvid=BV1Bz421Y7Zc!]
          </div>
        </div>
        <div>
          评论部分
        </div>
      </n-flex>
    </n-scrollbar>
  </div>
</template>

<style scoped>

</style>