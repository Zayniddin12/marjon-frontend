<template>
  <div class="container py-8">
    <div class="md:flex items-center justify-center">
      <CommonSection
        :title="$t('video_news')"
        :subtitle="$t('video_news_text')"
        class="!text-left"
      />
      <NuxtLinkLocale to="/video-news">
        <CommonButton
          :text="$t('view_all')"
          class="ml-auto mt-2 md:mt-0"
          variant="secondary"
        />
      </NuxtLinkLocale>
    </div>
    <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-9 gap-4">
      <MainVideosCard
        v-for="item in videoNews"
        :key="videoNews.id"
        v-bind="{ card: item }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  videoNews: INews
}

defineProps<Props>()
</script>

<style scoped></style>
