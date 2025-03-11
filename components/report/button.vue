<!--
  - 版权所有(c) Trih(HUA Haohui) 2025 - 2025
  - Copyright (c)Trih(HUA Haohui) 2025 - 2025, All Rights Reserved.
  -->

<script setup lang="ts">
import {NText} from 'naive-ui';
import Button from '~/components/menu/button.vue';

const userMore = computed(() => {
  return [
    {
      type: 'render',
      render: () => {
        return h(
            'div',
            {
              style:
                  'display: flex; align-items: center; padding: 8px 12px;'
            },
            [
              h('div', null, [
                h(
                    'div',
                    {
                      style:
                          'font-size: 12px;margin-left:1rem'
                    },
                    [
                      h(
                          NText,
                          { depth: 3 },
                          { default: () => t('ui.menu') }
                      )
                    ]
                )
              ])
            ]
        )
      },
      show: true
    },
    {
      type: 'render',
      render: () => {
        return h(Button, {
          title: t('ui.report'),
          thin: true,
          icon: false,
          onClick: () => {
            //TODO:举报逻辑
            console.log('举报逻辑')
          }
        })
      }
    }
  ]
})

</script>

<template>
  <n-dropdown trigger="hover" class="w-58 rounded-3xl" :options="userMore">
    <n-button class="mr-2" text circle size="small">
      •••
    </n-button>
  </n-dropdown>
</template>

<style scoped>

</style>