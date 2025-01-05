<script setup lang="ts"></script>

<template>
  <client-only>
    <n-watermark
        content="大家艰苦一下，一切都会有的"
        cross
        fullscreen
        :font-size="16"
        :line-height="16"
        :width="384"
        :height="384"
        :x-offset="12"
        :y-offset="60"
        :rotate="-15"
    />
  </client-only>
  <div class="flex flex-col h-screen">
    <div class="my-4 h-34px">
      <normal-header />
    </div>

    <div class="m-4 h-full">
      <n-grid :cols="14" item-responsive>
        <n-gi span="0 560:4 700:3 1000:2">
          <div>
            <normal-menu />
          </div>
        </n-gi>
        <n-gi span="12 560:4">
          <div>这是默认布局内容</div>
          <slot />
        </n-gi>
      </n-grid>
    </div>
  </div>
</template>

<style scoped></style>
