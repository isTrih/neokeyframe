<script setup lang="ts"></script>

<template>
  <div class="flex flex-col h-screen">
    <n-modal-provider>
      <div class="my-4 h-34px">
        <normal-header />
      </div>

      <div class="mb-4 h-full">
        <n-grid class="h-full" :cols="14" item-responsive>
          <n-gi class="ml-4" span="0 560:4 700:3 1000:2">
            <div class="h-full">
              <normal-menu />
            </div>
          </n-gi>
          <n-gi class="mx-4" span="14 560:10 700:11 1000:12">
            <slot />
          </n-gi>
        </n-grid>
      </div>
    </n-modal-provider>
  </div>
</template>

<style scoped></style>
