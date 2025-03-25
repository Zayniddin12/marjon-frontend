<template>
  <div class="bg-[#FDFEFE]">
    <ClientOnly>
      <LayoutHeader
        variant="default"
        header-class="header-shadow-white w-full"
      />
    </ClientOnly>
    <div class="min-h-[90vh] relative">
      <div class="absolute-center text-center z-20">
        <img src="/images/svg/404.svg" alt="404" class="mx-auto" />
        <ClientOnly>
          <p class="text-xl md:text-[32px] font-bold leading-130 text-dark">
            {{ $t('error_text') }}
          </p>
        </ClientOnly>
        <NuxtLinkLocale to="/">
          <ClientOnly>
            <CommonButton
              :text="$t('to_home')"
              icon-position="right"
              icon="icon-home"
              class="mt-4"
            />
          </ClientOnly>
        </NuxtLinkLocale>
      </div>
      <img
        src="/images/svg/bg-error.svg"
        class="w-full min-w-[1100px] absolute bottom-0 left-0"
        alt="error"
      />
      <img
        src="/images/svg/error-truck.svg"
        class="absolute-x bottom-0"
        alt="truck-error"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useAboutStore } from '~/store/about'

const aboutStore = useAboutStore()
interface Props {
  error?: string
}
defineProps<Props>()

aboutStore.getAbout()
</script>
