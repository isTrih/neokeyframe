import { Extension } from '@tiptap/core';
import type { RawCommands } from '@tiptap/core';

const KYTag = Extension.create({
    name: 'KYTag',

    addOptions() {
        return {
            allowClick: true,
        };
    },

    addNode() {
        return {
            group: 'inline',
            inline: true,
            selectable: true,
            atom: true,
            parseDOM: [
                {
                    tag: '.kyTag',
                    getAttrs: (dom) => ({
                        id: dom.getAttribute('data-id'),
                    }),
                },
            ],
            toDOM: (node) => [
                'span',
                {
                    class: 'kyTag',
                    'data-id': node.attrs.id,
                },
                ['i', { class: 'ri-eth-fill', style: 'transform: rotate(30deg);' }],
                node.attrs.id,
            ],
        };
    },

    addCommands() {
        return {
            setKYTag:
                (id: string) =>
                    ({ commands }) => {
                        return commands.insertContent({
                            type: this.name,  // 使用 this.name
                            attrs: { id },
                        });
                    },

            toggleKYTag:
                (id: string) =>
                    ({ commands, editor }) => {
                        const { from, to } = editor.state.selection;
                        const selectedText = editor.state.doc.textBetween(from, to, ' ', ' ');
                        return commands.insertContent({
                            type: this.name,
                            attrs: { id: selectedText || id },
                        });
                    },
        } as Partial<RawCommands>;  // 显式指定返回类型为 Partial<RawCommands>
    },

    addProseMirrorPlugins() {
        return [
            // 插件代码
        ];
    },
});

export default KYTag;
