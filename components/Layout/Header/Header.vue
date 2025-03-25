<template>
  <div>
    <header
      :class="[
        { 'bg-white': variant === 'default' },
        { 'header-shadow bg-purple': y > 1 && variant === 'dark' },
        { 'header-shadow-white': y > 1 && variant === 'default' },
        headerClass,
      ]"
      class="fixed w-full top-0 left-0 transition-300 z-30"
    >
      <CollapseTransition>
        <div v-if="y < 1" class="max-lg:hidden">
          <div
            class="container flex-center-between gap-4 py-5 px-[30px] rounded-20 border border-transparent relative"
          >
            <div class="flex-y-center gap-4">
              <a
                v-for="(item, index) in info"
                :key="index"
                rel="nofollow"
                :href="item?.link"
                class="flex-y-center gap-1 group"
                target="_blank"
              >
                <i
                  :class="[
                    item?.icon,
                    variant === 'dark'
                      ? 'text-white/20 group-hover:text-green'
                      : 'text-green',
                  ]"
                  class="text-xl transition-300"
                />
                <p
                  class="text-xs leading-normal font-semibold group-hover:text-green transition-300"
                  :class="variant === 'dark' ? 'text-white' : 'text-dark'"
                >
                  {{ item?.value }}
                </p>
              </a>
            </div>
            <div class="flex-center gap-4 absolute py-5 absolute-center">
              <a
                v-for="(social, index) in socials"
                :key="index"
                v-tooltip.bottom="social?.name"
                rel="nofollow"
                :href="social.link"
                target="_blank"
                class="block"
              >
                <i
                  v-if="social.link"
                  :class="social?.icon"
                  class="text-xl text-gray-100"
                />
              </a>
            </div>
            <div>
              <LayoutHeaderLanguage v-bind="{ variant }" />
            </div>
          </div>
        </div>
      </CollapseTransition>
      <div
        class="container flex-center-between p-5 lg:rounded-20 border-b lg:border border-transparent"
        :class="[{ 'border-white/[12%]': variant === 'dark' && y < 1 }]"
      >
        <i
          class="icon-burger text-white text-2xl cursor-pointer lg:hidden transition-300"
          :class="{ '!text-dark': variant === 'default' }"
          @click="isOpen = true"
        />
        <NuxtLinkLocale to="/" aria-label="home logo">
          <CommonLogo
            v-bind="{ variant }"
            class="max-w-[120px] pl-2"
            :color="variant === 'default' ? '#190A35' : 'white'"
          />
        </NuxtLinkLocale>
        <div class="flex-center gap-3">
          <a
            v-for="(item, index) in infoPhone"
            :key="index"
            rel="nofollow"
            :href="item?.link"
            class="flex-y-center gap-1 group bg-green rounded-lg p-2 lg:hidden"
            target="_blank"
          >
            <i
              :class="[item?.icon]"
              class="text-2xl transition-300 text-white"
            />
          </a>
          <CommonButton
            v-if="!user?.id"
            text=""
            class="!w-10 !h-10 flex-center !p-0 lg:hidden"
            icon="icon-login text-2xl"
            @click="openAuth"
          />
          <NuxtLinkLocale
            v-else
            to="/profile"
            class="rounded-full border border-green w-7 h-7 relative overflow-hidden lg:hidden"
          >
            <img
              v-if="user?.avatar"
              :src="user?.avatar"
              class="w-full h-full object-cover"
              alt="profile"
            />
            <img
              v-else
              src="/images/default/default.svg"
              class="w-full h-full object-cover"
              alt="default"
            />
          </NuxtLinkLocale>
        </div>
        <div class="flex-center gap-7 max-lg:hidden">
          <template
              v-for="(item, index) in menu"
              :key="index"
          >
            <NuxtLinkLocale
                v-if="item?.path"
                :to="localePath(item?.path)"
                active-class="!text-green"
                class="text-sm leading-normal font-semibold hover:text-green transition-300 cursor-pointer"
                :class="variant === 'dark' ? 'text-white' : 'text-dark'"
                @click="scrollElement(item?.id)"
            >
              <ClientOnly>
                {{ $t(item?.name) }}
              </ClientOnly>
            </NuxtLinkLocale>

            <p
                v-else="item?.id"
                class="text-sm leading-normal font-semibold hover:text-green transition-300 cursor-pointer"
                :class="variant === 'dark' ? 'text-white' : 'text-dark'"
                @click="scrollElement(item?.id)"
            >
              <ClientOnly>
                {{ $t(item?.name) }}
              </ClientOnly>
            </p>
          </template>
        </div>
        <div class="flex-y-center justify-end max-lg:hidden">
          <CommonButton
            v-if="!user?.id"
            :text="$t('enter')"
            class="h-11 flex-center"
            icon="icon-login text-2xl font-bold"
            icon-position="right"
            @click="openAuth"
          />
          <CommonDropdown v-else>
            <template #head>
              <div
                class="p-2 flex-y-center gap-2 rounded-xl bg-gray-200 hover:bg-green/10 cursor-pointer transition-300"
                :class="{
                  '!bg-white/10 hover:!bg-white/40': variant === 'dark',
                }"
              >
                <div
                  class="rounded-full border border-green w-7 h-7 relative overflow-hidden"
                >
                  <img
                    v-if="user?.avatar"
                    :src="user?.avatar"
                    class="w-full h-full object-cover"
                    alt="profile"
                  />
                  <img
                    v-else
                    src="/images/default/default.svg"
                    class="w-full h-full object-cover"
                    alt="default"
                  />
                </div>
                <p
                  class="text-sm leading-normal font-bold text-dark transition-300"
                  :class="{
                    'text-white': variant === 'dark',
                  }"
                >
                  {{ user?.company_name }}
                </p>
                <i class="icon-chevron text-xl text-gray-300" />
              </div>
            </template>
            <template #body>
              <div class="p-2">
                <button
                  v-for="(link, index) in links"
                  :key="index"
                  class="flex-y-center gap-2 py-2 px-3 rounded-xl hover:bg-green/10 transition-300 cursor-pointer group w-full"
                  :class="{ 'hover:bg-red/10': link?.name === 'log_out' }"
                  @click="toAction(link)"
                >
                  <i
                    class="text-xl text-gray-100 transition-300 group-hover:text-green"
                    :class="[
                      link?.icon,
                      {
                        '!text-red': link?.name === 'log_out',
                      },
                    ]"
                  />
                  <p
                    class="text-sm leading-normal font-semibold text-dark"
                    :class="{
                      '!text-red': link?.name === 'log_out',
                    }"
                  >
                    {{ $t(link?.name) }}
                  </p>
                </button>
              </div>
            </template>
          </CommonDropdown>
        </div>
      </div>
    </header>
    <Transition name="from-left">
      <LayoutHeaderNavbar
        v-if="isOpen"
        class="z-40"
        v-bind="{ menu, info, socials, user }"
        @close="isOpen = false"
        @open-auth="openAuth"
        @to-route="scrollElement"
      />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import CollapseTransition from '@ivanv/vue-collapse-transition/src/CollapseTransition.vue'

import { menu } from '~/data'
import { useAboutStore } from '~/store/about'
import { useAuthStore } from '~/store/auth'
import type { THeaderVariants } from '~/types/common'
import { phoneNumberFormatter } from '~/utils'

interface Props {
  variant?: THeaderVariants
  headerClass?: string
}

defineProps<Props>()

const aboutStore = useAboutStore()
const aboutData = computed(() => aboutStore.dataAbout)
const socials = computed(() => aboutStore.socials)

const router = useRouter()
const route = useRoute()
const { y } = useWindowScroll()
const user = computed(() => useAuthStore().user)

const localePath = useLocalePath()

const isOpen = ref(false)

const info = computed(() => [
  {
    icon: 'icon-phone',
    value: phoneNumberFormatter(aboutData.value?.phone_number),
    link: `tel:${aboutData.value?.phone_number}`,
  },
  {
    icon: 'icon-pin',
    value: aboutData.value?.location?.name,
    link: `https://www.google.com/maps/@${aboutData?.value?.location?.latitude},${aboutData?.value?.location?.longitude},14z?entry=ttu`,
  },
])
const infoPhone = computed(() => [
  {
    icon: 'icon-phone',
    value: phoneNumberFormatter(aboutData.value?.phone_number),
    link: `tel:${aboutData.value?.phone_number}`,
  },
])

function openAuth() {
  useAuthStore().showAuth = true
}

const names = ['index', 'news', 'about']

async function scrollElement(id: string) {
  if (id) {
    if (id !== '#contact') {
      await router.push('/')
    } else if (id === '#contact' && !names.includes(route.name)) {
      await router.push('/')
    }
    setTimeout(() => {
      const el = document.querySelector(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }, 500)
  }
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

function toAction(link: any) {
  if (link?.link) {
    router.push(link?.link)
  } else if (link?.emit) {
    if (link?.emit === 'log-out') {
      useAuthStore().showLogout = true
    } else if (link?.emit === 'help') {
      window.open('https://t.me/marjonuzb_bot', '_blank')
    }
  }
}
</script>

<style scoped>
.header-shadow {
  box-shadow: 0 8px 16px 0 rgba(60, 24, 128, 0.2);
}
</style>
