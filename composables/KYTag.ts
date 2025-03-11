import {type Commands, Node} from '@tiptap/core'
import { Plugin } from 'prosemirror-state'


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        KYTag: {
            setKYTag: (id: string) => ReturnType
            toggleKYTag: () => ReturnType
        }
        // Ensure 'chain' is included if it's missing in your context
        chain: () => any
    }
}

export interface KYTagOptions {
    allowClick: boolean
    navigate: (id: string) => void
}

export const KYTag = Node.create<KYTagOptions>({
    name: 'kyTag',
    inline: true,
    group: 'inline',
    selectable: true,
    atom: false,
    renderText: ({ node }) => {
        return `#${node.attrs.id} `
    },
    addOptions() {
        return {
            allowClick: true,
            navigate: (id) => console.warn('请通过配置提供 navigate 函数'),
        }
    },
    addAttributes() {
        return {
            id: {
                default: null,
                parseHTML: element => element.getAttribute('data-id'),
                renderHTML: attributes => ({
                    'data-id': attributes.id,
                }),
            },
        }
    },

    parseHTML() {
        return [
            {
                tag: 'span.kyTag',
            },
        ]
    },

    renderHTML({ node }) {
        return [
            'span',
            {
                class: 'kyTag',
                'data-id': node.attrs.id,
            },
            ['i', { class: 'ri-eth-fill'},''],
            node.attrs.id
        ]
    },

    addCommands() {
        return {
            setKYTag: (id) => ({ commands }) => {
                return commands.insertContent({
                    type: this.name,
                    attrs: { id },
                    text: id
                })
            },

            toggleKYTag: () => ({ commands, state }) => {
                const { from, to } = state.selection
                const text = state.doc.textBetween(from, to, '')
                if (!text) return false
                // commands.deleteRange({ from, to })
                return commands.insertContent({ type: this.name, text:text,attrs: { id: text } })
            },
        }
    },

    addProseMirrorPlugins() {
        return [
            new Plugin({
                props: {
                    handleClick: (view, pos, event) => {
                        const target = event.target as HTMLElement
                        const kyTag = target.closest?.('.kyTag')

                        if (kyTag && this.options.allowClick) {
                            const id = kyTag.getAttribute('data-id')
                            if (id) {
                                this.options.navigate(id)
                                return true
                            }
                        }
                        return false
                    },
                },
            }),
        ]
    },
})