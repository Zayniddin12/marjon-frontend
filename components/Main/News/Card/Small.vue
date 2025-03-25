<template>
  <nuxt-link
    :to="`/news/${card?.slug}`"
    class="w-full header-shadow-white rounded-20 p-4 group cursor-pointer transition-all duration-300"
  >
    <div class="flex items-center justify-between">
      <p class="text-gray-100 leading-[136%] text-base">
        {{ card?.created_at }}
      </p>
      <CommonPreloader width="97px" height="20px" :loading="loading">
        <div
          class="border border-gray rounded-lg py-2 px-3 text-sm font-semibold text-dark !leading-normal"
        >
          {{ $t('todays_news') }}
        </div>
      </CommonPreloader>
    </div>
    <div
      class="flex flex-col justify-between mt-6 gap-3 sm:!gap-6 lg:!gap-10 !transition-all !duration-300"
    >
      <CommonPreloader width="100%" height="60px" :loading="loading">
        <h2
          class="text-base font-semibold leading-136 text-dark group-hover:text-blue !transition-all !duration-300 line-clamp-3 min-h-[66px]"
        >
          {{ card?.title }}
        </h2>
      </CommonPreloader>
      <CommonButton
        variant="secondary"
        :text="$t('more')"
        class="w-max !px-6"
      />
    </div>
  </nuxt-link>
</template>
<script setup lang="ts">
import type { INews } from '~/types/common'

export interface Props {
  card: INews
  loading: boolean
}
defineProps<Props>()
</script>
