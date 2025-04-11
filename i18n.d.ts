/*
 * 版权所有(c) Trih(HUA Haohui) 2025 - 2025
 * Copyright (c)Trih(HUA Haohui) 2025 - 2025, All Rights Reserved.
 */

import 'vue-i18n'
import type MessageApiInjection from 'naive-ui';

declare module 'vue' {
  interface ComponentCustomProperties {
    t: (typeof import('vue-i18n'))['t']
  }
}

declare global {
  interface Window {
    $message: MessageApiInjection;
    xhs: {
      share: (options: {
        shareInfo: {
          type: string
          title: string
          content: string
          images: string[]
        }
        verifyConfig: {
          appKey: string
          nonce: string
          timestamp: string
          signature: string
        }
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        fail: (e: any) => void
      }) => void
    }
  }
}