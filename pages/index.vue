<template>
  <div>
    <Main />
    <MainAbout />
    <MainPartners v-bind="{ partners }" />
    <MainTypes v-bind="{ vehicles }" />
<!--    <ClientOnly>-->
<!--      <MainCalculation />-->
<!--    </ClientOnly>-->
    <MainNews v-bind="{ news }" />
    <MainVideosNews v-bind="{ videoNews }" />
    <div ref="counterRef">
      <AboutStatistics v-bind="{ statistics, isVisible }" />
    </div>
    <MainAppBanner />
    <CommonCollapseTransition :single="data" />
    <ClientOnly>
      <MainContact />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { useSeoStore } from '~/store/seo'

const statistics = ref([])
const counterRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)
const vehicles = ref<any>([])
const mainNews = ref<any>({})
const videoNews = ref<any>({})
const news = ref<any>([])
const partners = ref<any>([])

function getTypes() {
  useApi()
    .$get('cars/CarsTypeList/')
    .then((res: any) => {
      vehicles.value = res?.results
    })
}
const handleIntersect = (entries: IntersectionObserverEntry[]) => {
  if (entries[0].isIntersecting) {
    isVisible.value = true
    if (observer) {
      observer.disconnect()
    }
  }
}
function getStatistics() {
  useApi()
    .$get('/common/Statistic/')
    .then((res: any) => {
      statistics.value = res?.results
    })
}
function getNews() {
  useApi()
    .$get(`/news/NewsList/`, {
      params: {
        limit: 4,
        offset: 0,
      },
    })
    .then((res: any) => {
      news.value = res?.results
    })
}

function getVideoNews() {
  useApi()
    .$get('/news/VideoNewsList/')
    .then((res: any) => {
      videoNews.value = res?.results
    })
}

function getPartners() {
  useApi()
    .$get('common/TrustedUs/', {
      params: {
        limit: 55,
      },
    })
    .then((res: any) => {
      partners.value = res?.results
    })
}

getTypes()
getNews()
getPartners()
getVideoNews()

const seoStore = useSeoStore()
const { data } = await useAsyncData('mainSeo', () => seoStore.getSeo('main'))

let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(handleIntersect)
  if (counterRef.value) {
    observer.observe(counterRef.value)
  }
})
getStatistics()
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
</script>
