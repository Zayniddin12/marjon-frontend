<template>
  <div
    class="linear-purple lg:min-h-[800px] relative overflow-hidden flex-center-between"
  >
    <div class="container flex-y-center pt-20 relative">
      <div class="lg:min-w-[50%] mt-9 sm:mt-[140px] lg:mt-0 pb-6">
        <i18n-t
          keypath="main_text"
          tag="p"
          class="text-2xl md:text-[40px] leading-130 font-bold text-white whitespace-pre-line"
        >
          <template #each
            ><span
              class="text-green bg-green/[22%] rounded-[10px] px-2 h-[50px]"
              >{{ $t('each') }}</span
            ></template
          >
        </i18n-t>
        <p
          class="mt-6 lg:mt-10 text-base leading-130 font-normal text-gray-100"
        >
          {{ $t('main_subtitle') }}
        </p>
        <img
          v-if="useI18n().locale.value === 'ru'"
          src="/images/isuzurus.webp"
          alt="cargo-res"
          class="w-full mt-6 lg:hidden"
        />
        <img
          v-else-if="useI18n().locale.value === 'uz'"
          src="/images/isuzu.webp"
          alt="cargo-res"
          class="w-full mt-6 lg:hidden"
        />
        <div class="flex-y-center gap-4 mt-6 lg:mt-[70px]">
          <CommonButton
            class="!h-11 flex-center max-sm:!px-3"
            :text="$t('book')"
            icon="icon-arrow text-2xl"
            icon-position="right"
            @click="show = true"
          />
          <CommonButton
            variant="dark"
            class="h-11 flex-center max-sm:!px-3"
            icon-position="right"
            icon="icon-categories text-2xl"
            :text="$t('categories')"
            @click="toTypes"
          />
        </div>
      </div>
      <img
        v-if="useI18n().locale.value === 'ru'"
        style="left: 40% !important"
        src="/images/isuzurus.webp"
        alt="cargo"
        class="max-w-[862px] max-lg:hidden z-10 pointer-events-none w-full mt-10 ml-16"
        width="2472"
        height="1374"
      />
      <img
        v-else-if="useI18n().locale.value === 'uz'"
        style="left: 40% !important"
        src="/images/isuzu.webp"
        class="max-w-[862px] max-lg:hidden z-10 pointer-events-none w-full mt-10 ml-16"
        alt="Isuzu"
        width="1590"
        height="846"
      />
    </div>
    <img
      src="/images/svg/logo/logo-linear.svg"
      alt="logo"
      class="absolute max-lg:top-[30%] lg:bottom-[-12%] lg:min-w-[2500px] pointer-events-none left-[10%]"
    />
    <MainBook :show="show" @submit="show = false" @close="show = false" />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { toEmbed } from '~/utils'

const show = ref(false)
function toCalculator() {
  const element = document.getElementById('calculator')
  element?.scrollIntoView({ behavior: 'smooth' })
}

function toTypes() {
  const element = document.getElementById('vehicles')
  element?.scrollIntoView({ behavior: 'smooth' })
}
</script>
