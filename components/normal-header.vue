<script setup lang="ts">
  import { Search } from '@vicons/ionicons5';
</script>
<template>
  <client-only>
    <n-grid :cols="24" item-responsive>
      <n-gi offset="1" span="9 320:8 340:7 420:6 550:5 780:3" class="flex justify-center">
        <icons-keyframe />
      </n-gi>
      <n-gi offset="2 " span="10 320:12">
        <n-input id="search" round placeholder="搜索更多内容">
          <!--          TODO:实现搜索逻辑-->
          <template #suffix>
            <n-icon :component="Search" />
          </template>
        </n-input>
      </n-gi>
    </n-grid>
  </client-only>
</template>

<style scoped></style>
