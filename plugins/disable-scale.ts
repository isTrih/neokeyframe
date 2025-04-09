/*
 * 版权所有(c) Trih(HUA Haohui) 2025 - 2025
 * Copyright (c)Trih(HUA Haohui) 2025 - 2025, All Rights Reserved.
 */

import type { App } from 'vue';

export default defineNuxtPlugin((nuxtApp: { vueApp: App<Element> }) => {
    if (import.meta.client) {
        window.addEventListener('nuxt:ready', () => {
            // 禁止双击缩放
            document.documentElement.addEventListener(
                'touchstart',
                (event: TouchEvent) => {
                    if (event.touches.length > 1) {
                        event.preventDefault();
                    }
                },
                false
            );

            // 禁止双指缩放
            let lastTouchEnd = 0;
            document.documentElement.addEventListener(
                'touchend',
                (event: TouchEvent) => {
                    const now = Date.now();
                    if (now - lastTouchEnd <= 300) {
                        event.preventDefault();
                    }
                    lastTouchEnd = now;
                },
                false
            );
        });
    }
});


