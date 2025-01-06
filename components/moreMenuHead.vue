<template>
  <div class="w-full h-full justify-center items-center">
    <n-grid class="w-full h-full justify-center items-center" :cols="12">
      <n-gi class="ml-2 mt-2" span="2">
        <n-button circle text size="medium" @click="$emit('back', 'back')">
          <template #icon>
            <n-icon>
              <ArrowUndoOutline />
            </n-icon>
          </template>
        </n-button>
      </n-gi>
      <n-gi span="8">
        <div class="fw-700 text-base text-align-center">
          {{ props.title }}
        </div>
      </n-gi>
      <n-gi span="2"></n-gi>
    </n-grid>
  </div>
</template>
<script setup lang="ts">
import { ArrowUndoOutline } from "@vicons/ionicons5";
const props = defineProps({
  title: String,
});
</script>
