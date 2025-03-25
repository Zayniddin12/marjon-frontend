<template>
  <div class="py-8 md:py-16">
    <div class="container lg:grid lg:grid-cols-2 gap-16">
      <div class="w-full max-w-[480px] flex items-center">
        <div>
          <CommonSection class="!text-left" :title="$t('comments_title')" />
          <div
            v-if="feedbacks?.length > 2"
            class="flex-y-center gap-5 mt-8 max-lg:hidden"
          >
            <button
              class="prev-comment w-11 h-11 flex-center rounded-full bg-green transition-300 hover:bg-white group active:scale-95 shadow-swiper-button"
            >
              <i
                class="icon-chevron text-white font-bold text-2xl rotate-90 group-hover:text-dark transition-300"
              />
            </button>
            <button
              class="next-comment w-11 h-11 flex-center rounded-full bg-green transition-300 hover:bg-white group active:scale-95 shadow-swiper-button"
            >
              <i
                class="icon-chevron text-white font-bold text-2xl -rotate-90 group-hover:text-dark transition-300"
              />
            </button>
          </div>
        </div>
      </div>
      <div v-if="feedbacks?.length" class="w-full max-lg:mt-5">
        <Swiper v-bind="swiperConfig" class="!py-[60px]">
          <SwiperSlide
            v-for="(card, index) in feedbacks"
            :key="index"
            class="!h-auto"
          >
            <AboutCommentsCard v-bind="{ card }" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import 'swiper/css'

import {Navigation} from 'swiper'
import {Swiper, SwiperSlide} from 'swiper/vue'

import type {IFeedback} from '~/types/common'

interface Props {
  feedbacks: IFeedback[]
}

defineProps<Props>()

const swiperConfig = {
  slidesPerView: 'auto',
  spaceBetween: 24,
  breakpoints: {
    '640': {
      slidesPerView: 2,
    },
  },
  navigation: {
    nextEl: '.next-comment',
    prevEl: '.prev-comment',
  },
  modules: [Navigation],
}
</script>

<style scoped>
.swiper-button-disabled {
  background: #fff !important;
  box-shadow: unset !important;
}
.swiper-button-disabled i {
  color: #190a35 !important;
}

.shadow-swiper-button {
  box-shadow: 0 4px 24px 0 rgba(89, 222, 190, 0.36);
}
</style>
