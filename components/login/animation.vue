<script setup lang="ts">
  const tips = [
    '你知道吗？关键帧还有一个名字叫做“正片叠底”',
    'CheckPoint也是关键帧的意思',
    '关键帧的创始人之一正在为恋爱苦恼',
    '超正经科技中，绝大部分人都是INFP',
    '不知道说什么了，随便再来一条',
    '讨厌上大学',
    '如果一天有48小时就好了',
    '希望可以每天多睡一会'
  ];
  const currentText = ref('');

  // 随机选择文本的函数
  function getRandomText() {
    return tips[Math.floor(Math.random() * tips.length)];
  }

  // 更新文本的函数
  function updateText() {
    currentText.value = getRandomText();
  }

  // 页面加载完成后更新文本
  onMounted(() => {
    updateText();
    setInterval(updateText, 2800); // 每2.8秒更新一次
  });
</script>

<template>
  <div class="container m-2">
    <!-- 绘制齿轮 -->
    <div class="load">
      <div class="gear first flex justify-center items-center">
        <n-icon :size="40">
          <icons-home />
        </n-icon>
      </div>
      <div class="gear second flex justify-center items-center">
        <n-icon :size="80">
          <icons-home />
        </n-icon>
      </div>
      <div class="gear third flex justify-center items-center">
        <n-icon :size="60">
          <icons-home />
        </n-icon>
      </div>

      <!-- 绘制圆形水珠 -->
      <div class="lil-circle" />
      <svg class="blur-circle">
        <filter id="blur">
          <feGaussianBlur in="SourceGraphic" stdDeviation="13" />
        </filter>
        <circle cx="70" cy="70" r="66" fill="transparent" stroke="currentColor" stroke-width="40" filter="url(#blur)" />
      </svg>
    </div>

    <!-- 文字 -->
    <div id="n" class="text2">{{ currentText }}</div>
  </div>
</template>

<style>
  @import url('https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css');
  .container {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .load {
    position: relative;
    transform: translate(33%, 0%);
  }

  .gear {
    position: relative;
    color: #afb4db;
    top: 7.6rem;
    left: 1%;
    z-index: -10;
    width: 40px;
    height: 40px;
    animation: spin 5.2s infinite cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  .second {
    color: #ffb5c5;
    left: 20%;
    top: 6.8rem;
    width: 40px;
    height: 40px;
    animation: spin-reverse 5.2s infinite cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
  .third {
    top: 6rem;
    color: #fedcbd;
    left: 2%;
    width: 40px;
    height: 40px;
    animation: spin-reverse 5.2s infinite cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  .lil-circle {
    position: relative;
    border-radius: 50%;
    box-shadow:
      inset 0 0 10px 2px var(--gray-8),
      0 0 50px var(--n-color-modal);
    width: 100px;
    height: 100px;
    opacity: 0.65;
  }

  .blur-circle {
    position: relative;
    visibility: var(--czj-showLight);
    top: -119px;
    left: -19px;
    color: var(--n-color-modal);
  }

  .text2 {
    transform: translate(0, -90%);

    position: relative;
    width: 100%;
    color: var(--n-item-text-color);
    font-size: 0.8rem;
    text-align: center;
    transition: all 0.8s ease;
  }

  @-webkit-keyframes spin {
    50% {
      transform: rotate(720deg);
    }
  }

  @keyframes spin {
    50% {
      transform: rotate(720deg);
    }
  }

  @-webkit-keyframes spin-reverse {
    50% {
      transform: rotate(-720deg);
    }
  }

  @keyframes spin-reverse {
    50% {
      transform: rotate(-720deg);
    }
  }
</style>
