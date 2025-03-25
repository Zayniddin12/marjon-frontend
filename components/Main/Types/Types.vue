<template>
  <div id="vehicles" :class="{ 'py-12 bg-white': vehicles?.length }">
    <div v-if="vehicles?.length" class="container">
      <CommonSection :title="$t('vehicle_types')" />

      <div class="flex-center-between max-lg:block">
        <button
          id="slide-prev"
          class="max-lg:hidden icon-chevron w-11 h-11 bg-white-100 rounded-full border border-gray text-2xl font-bold rotate-90 hover:border-green transition-300"
          aria-label="Previous"
        />
        <div class="max-w-[782px] h-[260px] mx-auto">
          <Swiper
            v-if="trigger"
            v-bind="settings"
            :thumbs="{ swiper: sliderThumb }"
            class="!h-full"
            :initial-slide="activeVehicle"
            @active-index-change="sliderChange"
          >
            <SwiperSlide v-for="(vehicle, index) in vehicles" :key="index">
              <img
                :src="vehicle?.image"
                alt="images"
                class="w-full h-full object-contain"
              />
            </SwiperSlide>
          </Swiper>
        </div>
        <button
          id="slide-next"
          class="max-lg:hidden icon-chevron w-11 h-11 bg-white-100 rounded-full border border-gray text-2xl font-bold -rotate-90 hover:border-green transition-300"
          aria-label="Next"
        />
      </div>
      <div class="mt-5">
        <div class="flex-center gap-1.5 mb-6">
          <!--          <div-->
          <!--            class="flex-center bg-gray-200 border border-white-100 w-8 h-8 rounded-full"-->
          <!--          >-->
          <!--            <i class="icon-360 text-xl text-gray-100" />-->
          <!--          </div>-->
          <p class="text-xl leading-140 font-semibold text-dark">
            {{ vehicles?.[activeVehicle]?.title }}
          </p>
        </div>
        <div class="mx-auto">
          <Swiper
            v-if="trigger"
            :slides-per-view="'auto'"
            :space-between="16"
            centered-slides
            :initial-slide="activeVehicle"
            class="container"
            @swiper="onInit"
          >
            <SwiperSlide
              v-for="(vehicle, index) in vehicles"
              :key="index"
              class="!w-[184px]"
            >
              <div
                class="w-[184px] h-[58px] border border-gray rounded-lg bg-gray-200 transition-300 hover:border-green flex-center cursor-pointer"
                :class="{
                  '!border-green active-vehicle-shadow':
                    index === activeVehicle,
                }"
                @click="activeVehicle = index"
              >
                <img
                  :src="vehicle?.image"
                  alt="vehicle"
                  :class="{
                    grayscale: index !== activeVehicle,
                  }"
                  class="max-w-[90%] mx-auto transition-300 h-full w-full object-contain"
                />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import 'swiper/css'
import 'swiper/css/thumbs'

import { EffectFade, Navigation, Thumbs } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'

interface Props {
  vehicles: {
    id: number
    title: string
    slug: string
    image: string
    ordering: number
  }[]
}

const props = defineProps<Props>()

const activeVehicle = ref(2)
const sliderThumb = ref()
const trigger = ref(false)

const settings = {
  spaceBetween: 20,
  grabCursor: true,
  navigation: {
    nextEl: '#slide-next',
    prevEl: '#slide-prev',
  },
  keyboard: { enabled: true },
  modules: [Navigation, EffectFade, Thumbs],
}

function onInit(swiper: any) {
  sliderThumb.value = swiper
}

function sliderChange(e: any) {
  activeVehicle.value = e?.activeIndex
}

watch(
  () => props.vehicles?.length,
  () => {
    setTimeout(() => {
      trigger.value = true
    }, 400)
  },
  {
    immediate: true,
  }
)
</script>

<style scoped>
.active-vehicle-shadow {
  box-shadow: 0 0 40px 0 rgba(89, 222, 190, 0.32);
}
</style>
