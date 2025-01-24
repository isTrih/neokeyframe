import Link from '~/components/menu/link.vue';

// 抽离 title 和 url 到一个数组中，方便添加内容
const linkData = [
    {title: '铅元素动画', url: 'http://www.pbanimation.club/'},
    {title: '大火鸟文化', url: 'http://www.kjjcg.com/'},
    {title: 'MacWk-精品mac软件', url: 'https://macwk.com.cn/'},
    {title: 'Lo研社-Lolita图书馆', url: 'https://lolitalibrary.com/'},
    {title: '有礼贸-外贸实践平台', url: '/doc/socialrule'}
];

// 组装成 fLink
export const fLink = linkData.map(item => {
    return {
        type: 'render',
        render: () => {
            return h(Link, {
                title: item.title,
                icon: false,
                thin: false,
                url: item.url
            });
        },
        show: true
    };
});
// 组装成 fLinkThin 用于窄屏幕比例
export const fLinkThin = linkData.map(item => {
    return {
        type: 'render',
        render: () => {
            return h(Link, {
                title: item.title,
                icon: false,
                thin: true,
                url: item.url
            });
        },
        show: true
    };
});