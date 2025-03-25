<template>
  <div class="relative">
    <button
      class="slide-prev w-8 h-8 flex-center bg-white absolute-y -left-14 rounded-full hover:bg-white/[12%] transition-300 group active:scale-95"
    >
      <i
        class="icon-arrow text-2xl text-dark rotate-180 group-hover:text-white transition-300"
      />
    </button>
    <Swiper
      v-bind="settings"
      watch-slides-progress
      :prevent-clicks="false"
      :prevent-clicks-propagation="false"
      @swiper="onInit"
    >
      <SwiperSlide
        v-for="(image, index) in images"
        :key="index"
        class="!w-[128px]"
      >
        <div
          class="w-full cursor-pointer overflow-hidden transition-300 aspect-video relative overflow-hidden"
        >
          <div
            class="w-full h-full bg-[#07091CA3] absolute inset-0 transition-300"
            :class="{ 'opacity-0': active === index }"
          />
          <img :src="image?.photo" alt="images" class="w-full h-full object-cover" />
        </div>
      </SwiperSlide>
    </Swiper>
    <button
      class="slide-next w-8 h-8 flex-center bg-white absolute-y -right-14 rounded-full hover:bg-white/[12%] transition-300 group active:scale-95"
    >
      <i
        class="icon-arrow text-2xl text-dark group-hover:text-white transition-300"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/thumbs'

import { Swiper, SwiperSlide } from 'swiper/vue'

interface Props {
  images: string[]
  active: number
}

defineProps<Props>()
const emit = defineEmits(['change', 'init'])
const settings = {
  spaceBetween: 16,
  slidesPerView: 'auto',
}

const imageSlider = ref()

function onInit(swiper: any) {
  imageSlider.value = swiper
  emit('swiper', swiper)
}

</script>

<style>
.swiper-button-disabled {
  background: #ffffff1f !important;
}

.swiper-button-disabled i {
  color: #fff !important;
}
</style>
