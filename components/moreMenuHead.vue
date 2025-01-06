<template>
  <n-grid :cols="12">
    <n-gi span="2">
      <n-button circle ghost>
        <template #icon>
          <n-icon>
            <ArrowUndoOutline />
          </n-icon>
        </template>
      </n-button>
    </n-gi>
    <n-gi span="8">
      <div class="font-bold text-l">
        {{ props.title }}
      </div>
    </n-gi>
    <n-gi span="2"></n-gi>
  </n-grid>
</template>
<script setup lang="ts">
import { ArrowUndoOutline } from "@vicons/ionicons5";
import { defineProps } from "vue";

const props = defineProps({
  title: String,
});
</script>
