<template>
  <nuxt-link
    :to="`/news/${card?.slug}`"
    class="transition duration-300 bg-[#22232C] hover:bg-[#1D2D40] w-full block modal-button p-6 bg-dark rounded-xl cursor-pointer group relative overflow-hidden flex flex-col gap-14 justify-between"
  >
    <div class="flex items-center justify-between z-2 relative">
      <p
        v-if="card?.created_at"
        class="text-white text-opacity-80 text-base leading-normal"
      >
        {{ card?.created_at }}
      </p>
      <div class="border border-white-100 py-2 px-4 rounded-lg">
        <span class="text-white font-semibold text-base leading-normal">{{
          $t('todays_news')
        }}</span>
      </div>
    </div>
    <div class="relative z-2">
      <h2
        class="font-semibold text-xl leading-140 text-white line-clamp-2 z-2 relative mb-5"
      >
        {{ card?.title }}
      </h2>
      <CommonButton :text="$t('more')" variant="dark" />
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
