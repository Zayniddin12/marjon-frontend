<template>
  <div>
    <div class="border-b-[6px] border-green">
      <div class="flex-center py-[62px] container">
        <CommonSection
          :title="$t('video_news')"
          :subtitle="$t('video_news_text')"
        />
      </div>
    </div>
    <div class="py-8 md:pb-16 md:pt-10">
      <div class="container">
        <Transition name="fade" mode="out-in">
          <div :key="loading" class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <template v-if="loading">
              <MainVideosCard
                v-for="(card, index) in 12"
                :key="index"
                v-bind="{ card }"
                loading
              />
            </template>
            <template v-else>
              <MainVideosCard
                v-for="(card, index) in list"
                :key="index"
                v-bind="{ card }"
              />
            </template>
          </div>
        </Transition>
        <div class="mt-6 flex justify-end">
          <CommonPagination
            pagination-buttons
            :total="paginationData?.count"
            :limit="paginationLimit"
            :current-page="currentPage"
            @input="currentPage = $event"
          />
        </div>
      </div>
    </div>
    <AboutSharh />
    <ClientOnly>
      <MainContact />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { useQueryChange } from '~/composables/useQueryChange'
import { useSeoStore } from '~/store/seo'

const { updateQuery } = useQueryChange()
const { t } = useI18n()

const route = useRoute()

const list = ref([])
const currentPage = ref(Number(route.query?.page ?? 1))
const paginationLimit = ref(12)

const loading = ref(true)
const paginationData = reactive({
  count: 0,
  offset: (currentPage.value - 1) * (paginationLimit.value ?? 9),
})

function fetchList() {
  loading.value = true
  useApi()
    .$get('/news/VideoNewsList/', {
      params: {
        offset: paginationData.offset,
        limit: paginationLimit.value,
      },
    })
    .then((res: any) => {
      list.value = res.results
      paginationData.count = res.count
    })
    .finally(() => (loading.value = false))
}

fetchList()

const seoStore = useSeoStore()
const { data } = await useAsyncData('newsSeo', () => seoStore.getSeo('news'))

if (data.value) {
  useSeoMeta({
    title: data.value?.title,
    description: data.value?.description,
    ogTitle: data.value?.title,
    ogDescription: data.value?.description,
    twitterTitle: data.value?.title,
    twitterDescription: data.value?.description,
    ogImage: data.value?.image,
    twitterImage: data.value?.image,
  })
}

// useHead meta keywords
useHead({
  meta: [
    {
      hid: 'keywords',
      name: 'keywords',
      content: data.value?.keywords,
    },
  ],
})

watch(
  () => currentPage.value,
  async () => {
    paginationData.offset = (currentPage.value - 1) * paginationLimit.value
    await updateQuery('page', '' + currentPage.value)
    await fetchList()
  }
)
</script>

<style scoped>
.linear-white-blur {
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.08) -33.55%,
    rgba(255, 255, 255, 0) 81.82%
  );
}
</style>
