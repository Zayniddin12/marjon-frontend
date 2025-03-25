<template>
  <div class="container mt-12 md:mb-16 mb-7">
    <div class="md:flex items-center justify-between">
      <CommonSection
        :title="$t('news')"
        :subtitle="$t('news_title')"
        class="!text-left"
      />
      <NuxtLinkLocale to="/news">
        <CommonButton
          :text="$t('view_all')"
          class="ml-auto mt-2 md:mt-0"
          variant="secondary"
        />
      </NuxtLinkLocale>
    </div>
    <div class="grid gap-5 xl:grid-cols-4 grid-cols-1 items-stretch mt-9">
      <NewsCard v-for="(card, index) in news" :key="index" v-bind="{ card }" />
    </div>
  </div>
</template>
<script setup lang="ts">
import type { INews } from '~/types/common'

interface Props {
  mainNews: INews
  news: INews[]
}

defineProps<Props>()
</script>
