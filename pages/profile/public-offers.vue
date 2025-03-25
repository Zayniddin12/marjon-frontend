<template>
  <div class="bg-white p-6 rounded-20 header-shadow-white mb-6">
    <div class="flex-y-center gap-1">
      <NuxtLinkLocale
        v-if="isMobile || isTablet"
        to="/profile"
        class="icon-chevron text-2xl text-dark font-bold rotate-90"
      />
      <p class="text-2xl leading-130 font-bold text-dark">
        {{ single?.title }}
      </p>
    </div>

    <div class="static-text mt-5" v-html="single?.content" />
  </div>
</template>

<script setup lang="ts">
const { isMobile, isTablet } = useDevice()

interface ISingle {
  title: string
  slug: string
  public_offer: string
}

const single = ref<ISingle>()

function getSingle() {
  useApi()
    .$get('/common/StaticPage/public-offers')
    .then((res) => {
      single.value = res
    })
}

getSingle()
</script>
