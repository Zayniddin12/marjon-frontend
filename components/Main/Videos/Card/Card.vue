<template>
  <NuxtLinkLocale
    :to="`/video-news/${card?.slug}`"
    class="news-card bg-white rounded-2xl relative overflow-hidden flex flex-col border border-gray hover:border-green transition-300"
  >
    <div class="aspect-video max-h-[150px] shrink-0 relative">
      <CommonPreloader v-bind="{ loading }" width="100%" height="100%">
        <img
          :src="card?.cover_image"
          alt="news"
          class="w-full h-full object-cover rounded-b-2xl"
        />
      </CommonPreloader>
      <div class="bg-black/50 absolute w-full h-full top-0 rounded-2xl"></div>
      <i class="icon-play1 text-4xl text-white absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2"></i>
    </div>
    <div class="p-4 flex flex-col h-full justify-between gap-3">
      <CommonPreloader height="20.8px" width="100%" v-bind="{ loading }">
        <p class="text-base leading-130 font-semibold text-dark line-clamp-3">
          {{ card?.title }}
        </p>
      </CommonPreloader>
      <CommonPreloader
        v-for="i in 2"
        :key="i"
        height="20.8px"
        width="100%"
        v-bind="{ loading }"
      />
      <CommonPreloader height="30.8px" width="100px" v-bind="{ loading }">
        <p
          class="text-base leading-130 text-gray-100 py-1 px-2 border border-gray rounded w-max"
        >
          {{ card?.created_at }}
        </p>
      </CommonPreloader>
    </div>
  </NuxtLinkLocale>
</template>

<script setup lang="ts">
import type { INews } from '~/types/common'

interface Props {
  card: INews
  loading?: boolean
}

defineProps<Props>()
</script>

<style scoped>
.news-card:hover {
  box-shadow: 0px 0.27766px 0px 0px rgba(28, 78, 66, 0),
  0px -0.58577px 1.0426px 0px rgba(28, 78, 66, 0),
  0px -2.41971px 8.12411px 0px rgba(28, 78, 66, 0.01),
  0px -4.35376px 31.5454px 0px rgba(28, 78, 66, 0.01),
  10px 9px 32px 0px rgba(25, 10, 53, 0.2);
}
</style>
