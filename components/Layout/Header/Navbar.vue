<template>
  <div class="fixed inset-0 bg-[#220E47] h-screen">
    <div class="flex flex-col h-full justify-between pb-10">
      <div>
        <div
          class="container flex-center-between gap-4 py-6 border-b border-white/[12%]"
        >
          <i
            class="icon-close text-white text-2xl cursor-pointer lg:hidden transition-300"
            @click="$emit('close')"
          />
          <NuxtLinkLocale to="/">
            <CommonLogo
              variant="dark"
              class="max-w-[120px]"
              @click="$emit('close')"
            />
          </NuxtLinkLocale>
          <CommonButton
            v-if="!user?.id"
            text=""
            class="!w-10 !h-10 flex-center !p-0 lg:hidden"
            icon="icon-login text-2xl"
            @click="$emit('open-auth')"
          />
          <NuxtLinkLocale
            v-else
            to="/profile"
            class="rounded-full border border-green w-7 h-7 relative overflow-hidden lg:hidden"
            @click="$emit('close')"
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
        <div
          class="flex flex-col items-center gap-7 my-10"
          @click="$emit('close')"
        >
          <RouterLink
            v-for="(item, index) in menu"
            :key="index"
            :to="item?.path"
            class="text-base leading-normal text-white font-semibold"
            @click="$emit('to-route', item?.id)"
          >
            {{ $t(item?.name) }}
          </RouterLink>
        </div>
        <div class="flex-center gap-5 py-1.5 border-y border-white/[12%]">
          <button
            v-for="(lang, index) in languagesList"
            :key="index"
            class="flex-y-center gap-1"
            @click="changeLocale(lang?.code)"
          >
            <img :src="lang?.flag" alt="flag" />
            <p class="text-sm leading-normal font-semibold text-white">
              {{ lang?.name }}
            </p>
            <i
              v-if="lang?.code === currentLanguage?.code"
              class="icon-tick text-green text-base"
            />
          </button>
        </div>
      </div>
      <div class="container">
        <div class="flex-center gap-4">
          <a
            v-for="(item, index) in info"
            :key="index"
            rel="nofollow"
            :href="item?.link"
            class="flex-y-center gap-1 group"
            target="_blank"
          >
            <i
              :class="[item?.icon]"
              class="text-xl transition-300 text-white/20 group-hover:text-green"
            />
            <p
              class="text-xs leading-normal font-semibold group-hover:text-green transition-300 text-white"
            >
              {{ item?.value }}
            </p>
          </a>
        </div>
        <div class="flex-center gap-4 mt-6">
          <a
            v-for="(social, index) in socials"
            :key="index"
            rel="nofollow"
            :href="social?.link"
            target="_blank"
            class="block"
          >
            <i
              v-if="social?.link"
              :class="social?.icon"
              class="text-xl text-gray-100"
            />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { changeLocale, currentLanguage, languagesList } = useLanguageSwitcher()
interface Props {
  menu: any[]
  info: any[]
  socials: any[]
  user: any
}

defineProps<Props>()
</script>
