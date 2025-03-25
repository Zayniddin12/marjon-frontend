<template>
  <div id="countdown" class="the-counter-component">
    <div
      id="countdown-number"
      class="!flex items-center justify-center w-full h-full text-center transition-300"
    >
      <span class="text-[10px] font-semibold text-dark">{{ time }}</span>
    </div>
    <svg style="transform: scale(1.5) rotate(270deg)">
      <circle r="30" cx="34" cy="14" fill="#D8DDE5" class="bg-circle" />
      <circle
        r="10"
        cx="14"
        cy="14"
        :style="{
          animationName: 'CountDownAnimation',
          animationDuration: `${props.seconds}s`,
          animationTimingFunction: 'linear',
          animationFillMode: 'forwards',
        }"
      />
    </svg>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  seconds: number
}
const props = withDefaults(defineProps<Props>(), {
  seconds: 60,
})

interface Emits {
  (e: 'finished'): void
}
const $emit = defineEmits<Emits>()
const seconds = ref(0)
const time = ref('')

const countDown = () => {
  seconds.value--

  const mm = Math.floor(seconds.value / 60)
  const ss = Math.floor(seconds.value % 60)

  if (seconds.value < 60) {
    time.value = `${ss > 9 ? ss : '0' + ss}`
  } else {
    time.value = `${mm > 9 ? mm : '0' + mm}:${ss > 9 ? ss : '0' + ss}`
  }
}

watch(
  () => props.seconds,
  () => {
    seconds.value = props.seconds
    countDown()
  },
  { immediate: true }
)

const interval = setInterval(function () {
  countDown()

  if (seconds.value < 0) {
    clearInterval(interval)
    time.value = '0'
    $emit('finished')
  }
}, 1000)
</script>

<style>
.the-counter-component#countdown {
  position: relative;
  height: 28px;
  width: 28px;
  text-align: center;
}

.the-counter-component#countdown-number {
  display: inline-block;
  line-height: 28px;
  color: #59debe;
}

.the-counter-component svg {
  position: absolute;
  top: 0;
  right: 0;
  width: 28px;
  height: 28px;
  transform: rotateY(-180deg) rotateZ(-90deg);
}

.the-counter-component svg circle {
  stroke-dasharray: 62px;
  stroke-dashoffset: 0px;
  stroke-linecap: round;
  stroke-width: 3px;
  stroke: #59debe;
  fill: none;
  /*animation: countdown 60s linear forwards;*/
}

.the-counter-component .bg-circle {
  stroke: #f6f5f7 !important;
}

@keyframes CountDownAnimation {
  from {
    stroke-dashoffset: 0px;
  }
  to {
    stroke-dashoffset: 62px;
  }
}
</style>
