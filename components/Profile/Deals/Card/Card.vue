<template>
  <div class="rounded-20 relative overflow-hidden bg-white">
    <CommonPreloader height="226px" width="100%" v-bind="{ loading }">
      <div class="relative aspect-video">
        <Swiper
          v-if="card?.photo_reports?.length"
          @swiper="onInit"
          @activeIndexChange="sliderChange"
        >
          <SwiperSlide
            v-for="(item, index) in card?.photo_reports"
            :key="index"
            @click="$emit('open', index)"
          >
            <div class="aspect-video relative">
              <img
                :src="item?.photo"
                alt="swiper"
                class="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        </Swiper>
        <img
          v-else
          src="/images/default/default-truck.svg"
          class="w-full h-full object-cover"
          alt="default"
        />

        <p
          class="text-center absolute-x bottom-6 text-lg leading-130 font-semibold text-dark whitespace-nowrap"
        >
          {{ $t('not_uploaded_yet') }}
        </p>

        <img
          v-if="card?.photo_reports?.length"
          src="/images/svg/overlay-swiper.svg"
          alt="overlay"
          class="w-full absolute left-0 bottom-0 z-10 pointer-events-none"
        />

        <div
          v-if="card?.photo_reports?.length"
          class="z-20 absolute w-full bottom-3 flex justify-between items-end gap-2 px-5"
        >
          <div class="flex-y-center gap-2">
            <p class="text-xs leading-130 font-normal text-white">
              {{ card?.location1 }}
            </p>
            <div class="w-[3px] h-[3px] rounded-full bg-green" />
            <p class="text-xs leading-130 font-normal text-white">
              {{ card?.location2 }}
            </p>
          </div>

          <div class="flex-y-center gap-0.5 p-0.5 rounded-full bg-white/[12%]">
            <div
              v-for="(bullet, index) in card?.photo_reports"
              :key="index"
              class="w-1.5 h-1.5 rounded-full bg-white/[16%] hover:bg-white/30 transition-300 cursor-pointer"
              :class="{ '!bg-white': index === activeIndex }"
              @click="changeActive(index)"
            />
          </div>
        </div>
      </div>
    </CommonPreloader>

    <div class="p-5 flex-center-between gap-4">
      <div class="flex-y-center gap-2">
        <div
          class="border border-white-100 w-8 h-8 rounded-full relative overflow-hidden"
        >
          <CommonPreloader width="100%" height="100%" v-bind="{ loading }">
            <img
              :src="card?.car?.car_mark_logo"
              class="w-full h-full object-cover"
              alt="image"
            />
          </CommonPreloader>
        </div>
        <CommonPreloader height="26px" width="120px" v-bind="{ loading }">
          <p class="text-xl leading-130 font-bold text-dark">
            {{ card?.car?.car_model }}
          </p>
        </CommonPreloader>
      </div>

      <CommonPreloader width="142px" height="32px" v-bind="{ loading }">
        <ProfileDealsCardPlate
          v-bind="{
            plate: card?.car?.state_number
              ?.substring(2)
              .replace(/(\d)([a-zA-Z])/g, '$1 $2'),
            series: card?.car?.state_number?.substring(0, 2),
          }"
        />
      </CommonPreloader>
    </div>
  </div>
</template>

<script setup lang="ts">
import 'swiper/css'
import 'swiper/css/pagination'

import { Swiper, SwiperSlide } from 'swiper/vue'

import type { IReport } from '~/types/common'

interface Props {
  card: IReport
  loading?: boolean
}

defineProps<Props>()

const imageSlider = ref()
const activeIndex = ref(0)

function sliderChange(e: any) {
  activeIndex.value = e?.activeIndex
}

function changeActive(i: number) {
  imageSlider.value.slideTo(i)
}

function onInit(swiper: any) {
  imageSlider.value = swiper
}
</script>

<style scoped>
.shadow-linear-black {
  background: linear-gradient(
    270deg,
    rgba(7, 4, 13, 0) 0%,
    rgba(7, 4, 13, 0.68) 100%
  );
}
</style>
