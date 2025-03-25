<template>
  <div>
    <div v-if="isMobile || isTablet">
      <ProfileSidebar
        :links="user?.id ? links : linksAuth"
        @help="toHelp"
        @log-out="logOut"
        @login="authStore.showAuth = true"
      />
    </div>
    <div v-else>
      <ProfileAbout />
    </div>
  </div>
</template>

<script setup lang="ts">
import {useAuthStore} from '~/store/auth'

const { isMobile, isTablet } = useDevice()
const authStore = useAuthStore()
const user = computed(() => authStore.user)

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
    link: '/profile/about',
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
