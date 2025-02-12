/*
 * 版权所有(c) Trih(HUA Haohui) 2025 - 2025
 * Copyright (c)Trih(HUA Haohui) 2025 - 2025, All Rights Reserved.
 */

import { Node } from '@tiptap/core'

export interface BilibiliOptions {
    allowFullscreen: boolean,
    HTMLAttributes: {
        [key: string]: any
    },
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        bilibili: {
            /**
             * Add a Bilibili player
             */
            // setBilibili: (options: { bvid: string, aid?: string, page?: string, as_wide?: string, high_quality?: string, danmaku?: string }) => ReturnType,

            setBilibili: (options: { bvid: string}) => ReturnType,
        }
    }
}

export default Node.create<BilibiliOptions>({
    name: 'bilibili',

    group: 'block',

    atom: true,

    addOptions() {
        return {
            allowFullscreen: true,
            HTMLAttributes: {
                class: 'bilibili-wrapper',
            },
        }
    },

    addAttributes() {
        return {
            bvid: {
                default: '',
            },
            allowfullscreen: {
                default: this.options.allowFullscreen,
                parseHTML: () => this.options.allowFullscreen,
            },
        }
    },

    parseHTML() {
        return [{
            tag: 'iframe[src*="bilibili.com"]',
        }]
    },

    renderHTML({ HTMLAttributes }) {
        const { bvid } = HTMLAttributes
        return ['div', this.options.HTMLAttributes, ['iframe', {
            src: `//player.bilibili.com/player.html?isOutside=true&aid=bvid=${bvid}&p=1&high_quality=1&danmaku=1`,
            allowfullscreen: this.options.allowFullscreen,
            width: '100%',
            height: '320',
            scrolling: 'no',
            frameborder: '0',
        }]]
    },

    addCommands() {
        return {
            setBilibili: (options: { bvid: string}) => ({ tr, dispatch }) => {
                const { selection } = tr
                const node = this.type.create(options)

                if (dispatch) {
                    tr.replaceRangeWith(selection.from, selection.to, node)
                }

                return true
            },
        }
    },
})