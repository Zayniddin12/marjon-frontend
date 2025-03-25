<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <CommonModalLogOut
      v-bind="{ show }"
      @close="useAuthStore().showLogout = false"
    />
    <AuthModal :show="showAuth" @close="useAuthStore().showAuth = false" />
    <Transition name="fade">
      <CommonLoading v-if="loading" />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useAboutStore } from '~/store/about'
import { useAuthStore } from '~/store/auth'

const authStore = useAuthStore()
const aboutStore = useAboutStore()

const show = computed(() => authStore.showLogout)
const showAuth = computed(() => authStore.showAuth)

const tokens = authStore.getTokens()

const loading = ref(true)

if (process.client) {
  document.body.style.overflow = 'hidden'
}

aboutStore.getAbout()

if (tokens.value?.access || tokens.value?.refresh) {
  authStore.getUser().finally(() => {
    loading.value = false
    if (process.client) {
      document.body.style.overflow = 'auto'
    }
  })
} else {
  setTimeout(() => {
    loading.value = false
    if (process.client) {
      document.body.style.overflow = 'auto'
    }
  }, 1000)
}

useSeoMeta({
  description: 'Marjon.uz',
  ogTitle: 'Marjon',
  twitterCard: 'summary',
  twitterSite: '@ijtimoiysayt',
  ogImage: '/og.png',
  twitterImage: '/og.png',
})
</script>
<style>
.amo-button-holder {
  position: fixed !important;
}
@media screen and (max-width: 700px) {
  .amo-button-holder{
    right: 15px !important;
    bottom: 20px !important;
  }
}
</style>
