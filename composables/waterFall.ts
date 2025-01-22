/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * 获取瀑布流的列数
 */
function calculateWaterFallCols() {
    // 1.获取主容器的宽度
    const {ContainerWidth} = storeToRefs(useConfigStore())
    // const content = document.getElementById('waterfall-container') as HTMLElement
    const contentWidth = ContainerWidth.value
    if (Math.floor(contentWidth / (260)) < 2) {
        return 2
    } else return Math.floor(contentWidth / (260))
}

/**
 * 瀑布流初始化
 */
export function waterFallInit(columns: any, card_columns: any, arrHeight: any, cards: any) {
    columns.value = calculateWaterFallCols()
    card_columns.value = {}
    arrHeight.value = []
    for (let i = 0; i < columns.value; i++) {
        card_columns.value[i] = []
    }
    for (let i = 0; i < cards.value.length; i++) {
        const height = cards.value[i].media.height / (cards.value[i].media.width / 250)
        if (i < columns.value) {
            card_columns.value[i].push(cards.value[i])
            arrHeight.value.push(height)
        } else {
            const obj = {
                minH: arrHeight.value[0],
                minI: 0
            }
            for (let j = 0; j < arrHeight.value.length; j++) {
                if (arrHeight.value[j] < obj.minH) {
                    obj.minH = arrHeight.value[j]
                    obj.minI = j
                }
            }
            card_columns.value[obj.minI].push(cards.value[i])
            arrHeight.value[obj.minI] += height
        }
    }
}

/**
 * 获取更多瀑布流
 */
export function waterFallMore(arrHeight: any, card_columns: any, more: any) {
    for (let i = 0; i < more.length; i++) {
        const height = more[i].media.height / (more[i].media.width / 250)
        const obj = {
            minH: arrHeight.value[0],
            minI: 0
        }
        for (let j = 0; j < arrHeight.value.length; j++) {
            if (arrHeight.value[j] < obj.minH) {
                obj.minH = arrHeight.value[j]
                obj.minI = j
            }
        }
        card_columns.value[obj.minI].push(more[i])
        arrHeight.value[obj.minI] += height
    }
}

/**
 * 瀑布流重置大小
 */
export function resizeWaterFall(columns: any, card_columns: any, arrHeight: any, cards: any) {
    let timerId: number | null = null;
    window.onresize = function () {
        if (timerId !== null) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(() => {
            waterFallInit(columns, card_columns, arrHeight, cards)
        }, 300) as unknown as number;
    }
}

