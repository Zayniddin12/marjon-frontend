<template>
  <footer class="linear-purple relative pt-[92px] overflow-hidden">
    <img
      src="/images/svg/logo/logo-linear.svg"
      alt="logo"
      class="absolute top-4 min-w-[1800px] pointer-events-none left-[10%]"
    />
    <div class="flex-center flex-col gap-10 pb-10">
      <CommonLogo class="w-[195px]" variant="dark" />

      <div class="flex-center gap-10 max-md:flex-col">
        <template
            v-for="(item, index) in menu"
            :key="index"
        >

          <nuxt-link
              v-if="item?.path"
              :to="localePath(item?.path)"
              class="text-xl leading-normal text-white hover:text-green transition-300 cursor-pointer"
              @click="scrollElement(item?.id)"
          >
            {{ $t(item?.name) }}
          </nuxt-link>

          <p
              v-else="item?.id"
              class="text-xl leading-normal text-white hover:text-green transition-300 cursor-pointer"
              @click="scrollElement(item?.id)"
          >
            {{ $t(item?.name) }}
          </p>

        </template>
      </div>
      <div
        class="flex-y-center text-white rounded-lg border border-[#ffffff1a] p-2"
      >
        <a
          v-for="(item, index) in info"
          :key="index"
          rel="nofollow"
          :href="item?.link"
          class="flex-y-center gap-1 group"
          target="_blank"
        >
          <i :class="[item?.icon]" class="text-xl transition-300 text-green" />
          <p
            class="text-xs leading-normal font-semibold group-hover:text-green transition-300"
          >
            {{ item?.value }}
          </p>

          <hr
            v-if="index !== info.length - 1"
            class="border border-[#ffffff1a] h-5 w-[1px] mx-4"
          />
        </a>
      </div>
    </div>
    <div
      class="container py-[26px] border-t border-white/[12%] flex-center-between relative max-sm:flex-col-reverse max-sm:flex-col gap-4"
    >
      <p class="text-xs leading-136 text-white">
        {{ $t('footer_verified') }}
      </p>
      <div
        class="flex-center gap-4 absolute py-5 absolute-center max-md:hidden"
      >
        <a
          v-for="(social, index) in socials"
          :key="index"
          v-tooltip="social?.name"
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
      <div class="flex-y-center gap-2.5">
        <p class="text-xs leading-136 text-white">{{ $t('created_by') }}</p>
        <CommonLogoUIC main-color="#fff" />
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { menu } from '~/data'
import { useAboutStore } from '~/store/about'
import { phoneNumberFormatter } from '~/utils'

const router = useRouter()
const route = useRoute()
const localePath = useLocalePath()
const aboutData = computed(() => aboutStore.dataAbout)
const names = ['index', 'news', 'about']

const aboutStore = useAboutStore()
const socials = computed(() => aboutStore.socials)

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
</script>
