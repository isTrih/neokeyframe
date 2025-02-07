/*
 * 版权所有(c) Trih(HUA Haohui) 2025 - 2025
 * Copyright (c)Trih(HUA Haohui) 2025 - 2025, All Rights Reserved.
 */

import 'vue-i18n'

declare module 'vue' {
  interface ComponentCustomProperties {
    t: (typeof import('vue-i18n'))['t']
  }
}
