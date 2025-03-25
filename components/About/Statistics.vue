<template>
  <div class="py-8 md:py-16 linear-purple relative">
    <div
      class="w-[652px] h-[652px] rounded-full linear-white-blur absolute left-[-34%] top-0 flex-center"
    >
      <div class="w-[492px] h-[492px] rounded-full linear-white-blur" />
    </div>
    <div class="container">
      <CommonSection
        :title="$t('we_in_numbers')"
        title-class="text-left text-white"
      />

      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <div v-for="(card, index) in statistics" :key="index" class="relative">
          <div
            class="py-[25.5px] px-5 rounded-20 bg-white/10 border border-white/[24%] backdrop-blur-[20px] text-center relative z-10 h-full"
          >
            <div ref="counterRef" class="flex-center gap-1">
              <p class="text-[32px] leading-130 font-bold text-white">
                <vue3-autocounter
                  v-if="isVisible"
                  class="text-[32px] leading-130 font-bold text-white"
                  :start-amount="0"
                  :end-amount="+card?.value"
                  :duration="5"
                  separator=" "
                  decimal-separator="."
                  :autoinit="true"
                />
              </p>
              <div class="relative">
                <img src="/images/svg/plus.svg" alt="plus" />
                <p
                  class="blur-[12px] font-bold leading-130 text-green text-[32px] absolute-center"
                >
                  +
                </p>
              </div>
            </div>
            <p class="text-sm leading-normal font-normal text-white mt-1.5">
              {{ card?.description }}
            </p>
          </div>
          <i
            class="icon-star text-green text-[36px] absolute -right-4"
            :class="index % 2 === 0 ? 'max-md:-top-3 md:-bottom-3' : '-top-3'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import vue3Autocounter from 'vue3-autocounter/src/vue3-autocounter.vue'

import type {IStatistics} from '~/types/common'

interface Props {
  statistics: IStatistics[]
  isVisible: boolean
}

defineProps<Props>()

const cards = [
  {
    title: 'Клиенты, которые нам доверяют',
    count: '5 000',
  },
  {
    title: 'Клиенты, которые нам доверяют',
    count: '5 000',
  },
  {
    title: 'Клиенты, которые нам доверяют',
    count: '5 000',
  },
  {
    title: 'Клиенты, которые нам доверяют',
    count: '5 000',
  },
]
</script>

<style scoped>
.linear-white-blur {
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.08) -33.55%,
    rgba(255, 255, 255, 0) 81.82%
  );
}
</style>
