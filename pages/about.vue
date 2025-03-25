<template>
  <div>
    <About />
    <AboutAdvantages v-bind="{ advantages }" />
    <div ref="counterRef">
      <AboutStatistics v-bind="{ statistics, isVisible }" />
    </div>
    <AboutComments v-bind="{ feedbacks }" />
    <AboutSharh />
    <ClientOnly>
      <MainContact />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import {useSeoStore} from '~/store/seo'
import type {IAboutAdvantage} from '~/types/common'

const { t } = useI18n()
const advantages = ref<IAboutAdvantage[]>([])
const statistics = ref([])
const feedbacks = ref([])

const isVisible = ref(false)
const counterRef = ref<HTMLElement | null>(null)

const handleIntersect = (entries: IntersectionObserverEntry[]) => {
  if (entries[0].isIntersecting) {
    isVisible.value = true
    if (observer) {
      observer.disconnect()
    }
  }
}

let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(handleIntersect)
  if (counterRef.value) {
    observer.observe(counterRef.value)
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})

function getAdvantages() {
  useApi()
    .$get('/common/WhyChooseUs/')
    .then((res: any) => {
      advantages.value = res?.results
    })
}

function getStatistics() {
  useApi()
    .$get('/common/Statistic/')
    .then((res: any) => {
      statistics.value = res?.results
    })
}

function getFeedbacks() {
  useApi()
    .$get('/common/CustomerFeedback/')
    .then((res: any) => {
      feedbacks.value = res?.results
    })
}

getAdvantages()
getStatistics()
getFeedbacks()

const seoStore = useSeoStore()
const { data } = await useAsyncData('aboutSeo', () => seoStore.getSeo('about'))

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
