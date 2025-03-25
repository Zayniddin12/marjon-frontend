<template>
  <div
    class="w-full modal-button group rounded-xl overflow-hidden transition-all duration-300 main-news relative py-4 sm:py-8 px-5 sm:px-9 flex flex-col justify-between header-shadow-white"
  >
    <img
      :src="card?.cover_image"
      alt="news img"
      class="absolute w-full h-full top-0 left-0 object-cover"
    />
    <div
      class="news-linear-dark absolute w-full h-full left-0 bottom-0 text-white z-2 opacity-100 transition-all duration-300"
    />
    <div class="flex items-center justify-between relative z-2">
      <p
        v-if="card?.created_at"
        class="text-white opacity-80 text-base leading-normal"
      >
        {{ card?.created_at }}
      </p>
      <div
        class="border border-white-100 rounded-lg z-1 py-2 px-4 h-9 flex-center"
      >
        <p class="text-base font-semibold text-white leading-normal">
          {{ $t('main_news') }}
        </p>
      </div>
    </div>
    <div class="relative z-2">
      <h1
        class="transition-all duration-300 text-lg sm:text-2xl font-semibold text-white mb-5 leading-130 line-clamp-2"
      >
        {{ card?.title }}
      </h1>
      <NuxtLinkLocale :to="`/news/${card?.slug}`">
        <CommonButton variant="dark" :text="$t('more')" />
      </NuxtLinkLocale>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

import type { INews } from '~/types/common'

export interface Props {
  card: INews
  loading: boolean
}
defineProps<Props>()
</script>
<style>
.main-news {
  background: linear-gradient(180deg, rgba(34, 35, 44, 0) 0%, #22232c 106.25%);
}
.news-linear {
  background: linear-gradient(
    180deg,
    rgba(25, 204, 129, 0.11) -4.96%,
    #19cc81 112.6%
  );
}
.news-linear-dark {
  background: linear-gradient(
    180deg,
    rgba(34, 35, 44, 0.5) 2%,
    rgba(34, 35, 44, 0) 37.6%,
    #22232c 102.29%
  );
}
/*.medium-bg {*/
/*  background: url('/images/uzb-in-dots.png');*/
/*}*/
</style>
