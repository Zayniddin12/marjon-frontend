<template>
  <div class="container mt-9">
    <div v-if="isMobile || isTablet">
      <NuxtPage />
    </div>
    <div v-else class="grid lg:grid-cols-12 gap-6">
      <div class="col-span-3">
        <ProfileSidebar
          :links="user?.id ? links : linksAuth"
          @log-out="logOut"
          @help="toHelp"
          @login="authStore.showAuth = true"
        />
      </div>
      <div class="lg:col-span-9">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth'

const { isMobile, isTablet } = useDevice()
const authStore = useAuthStore()
const user = computed(() => authStore.user)
const tokens = computed(() => authStore.tokens)

definePageMeta({
  middleware: 'auth',
})

if (tokens.value?.access) {
  const { data } = await useAsyncData('fetchProfile', () => authStore.getUser())

  useSeoMeta({
    title: data.value?.company_name,
    description: data.value?.account_manager,
    ogTitle: data.value?.company_name,
    ogDescription: data.value?.account_manager,
    twitterTitle: data.value?.company_name,
    twitterDescription: data.value?.account_manager,
    ogImage: data.value?.avatar,
    twitterImage: data.value?.avatar,
  })
}

function logOut() {
  authStore.showLogout = true
}

function toHelp() {
  window.open('https://t.me/jonibek_mustafaev', '_blank')
}

const links = [
  {
    id: 1,
    name: 'about_company',
    icon: 'icon-briefcase',
    link: '/profile',
    emit: '',
  },
  {
    id: 1,
    name: 'deals',
    icon: 'icon-file-dollar',
    link: '/profile/deals',
    emit: '',
  },
  {
    id: 1,
    name: 'transaction_history',
    icon: 'icon-time',
    link: '/profile/transactions',
    emit: '',
  },
  {
    id: 1,
    name: 'help',
    icon: 'icon-file-dollar',
    link: '',
    emit: 'help',
  },
  {
    id: 1,
    name: 'public_offers',
    icon: 'icon-file',
    link: '/profile/public-offers',
    emit: '',
  },
  {
    id: 1,
    name: 'log_out',
    icon: 'icon-log-out',
    link: '',
    emit: 'log-out',
  },
]

const linksAuth = [
  {
    id: 1,
    name: 'help',
    icon: 'icon-file-dollar',
    link: '',
    emit: 'help',
  },
  {
    id: 1,
    name: 'public_offers',
    icon: 'icon-file',
    link: '/profile/public-offers',
    emit: '',
  },
  {
    id: 1,
    name: 'enter_auth',
    icon: 'icon-login',
    link: '',
    emit: 'login',
  },
]
</script>
