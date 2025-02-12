/*
 * 版权所有(c) Trih(HUA Haohui) 2025 - 2025
 * Copyright (c)Trih(HUA Haohui) 2025 - 2025, All Rights Reserved.
 */

// 随机选择文本的函数
const tips = [
    '粒粒粒啦啦：我想有很多很多钱和很多很多爱',
    '我不会 我不会 我不会 我改不了 我不会改',
    '我是牛马 牛马为什么要难为牛马',
    '上班好累，我不想上班',
    '你知道吗？关键帧还有一个名字叫做“正片叠底”',
    'CheckPoint也是关键帧的意思',
    'Persicum somnium frigida, te videre cupio.',
    '超正经科技中，绝大部分人都是INFP',
    '不知道说什么了，随便再来一条',
    '讨厌上大学',
    '如果一天有48小时就好了',
    '希望可以每天多睡一会',
    '不去想两小时之后和八公里以外的事',
    '有好多废话要讲',
    '被爱包围的杂七杂八',
    '世界是一张密密麻麻的备忘录',
    '人总是在无限接近幸福的时候最幸福',
    'Noli de mundo meo evanescere',
    '咕嘟咕嘟',
    '希望有一天我可以看懂所有的艺术，看不懂也没关系，我原谅自己',
    '是某一天是一瞬间',
    'I CAN STILL FEEL YOU',
    '此刻我安宁',
    '花香蕉的钱就只能请到猴子'
];


export function getRandomText() {
    return tips[Math.floor(Math.random() * tips.length)];
}