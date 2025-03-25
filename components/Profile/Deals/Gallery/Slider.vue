<template>
  <div class="relative">
    <ClientOnly>
      <Swiper
        v-bind="settings"
        :thumbs="{ swiper: thumbsSwiper }"
        @swiper="onInit"
        @activeIndexChange="sliderChange"
      >
        <SwiperSlide v-for="(image, index) in images" :key="index">
          <div class="aspect-video overflow-hidden relative">
            <img :src="image?.photo" alt="images" class="w-full h-full object-contain " />
          </div>
        </SwiperSlide>
      </Swiper>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/thumbs'

import SwiperClass, { EffectFade, Keyboard, Navigation, Thumbs } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'

interface Props {
  images: string[]
  active: number
  thumbsSwiper?: SwiperClass
}

const props = defineProps<Props>()

const settings = {
  spaceBetween: 20,
  grabCursor: true,
  effect: 'fade',
  navigation: {
    nextEl: '.slide-next',
    prevEl: '.slide-prev',
  },
  keyboard: { enabled: true },
  modules: [Navigation, Keyboard, EffectFade, Thumbs],
}

const emit = defineEmits(['change'])
const imageSlider = ref()

function sliderChange(e: any) {
  emit('change', e?.activeIndex)
}

function onInit(swiper: any) {
  imageSlider.value = swiper
}
onMounted(() => {
  setTimeout(() => {
    imageSlider.value.slideTo(props.active)
  }, 100)
})
</script>

<style scoped>
.gallery-shadow {
  background: linear-gradient(180deg, rgba(7, 9, 28, 0) 57.52%, #07091c 100%);
}
</style>
