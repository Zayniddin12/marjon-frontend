<template>
  <CommonDropdown
    :show="showDropdown"
    :body-class="[
      '!w-[124px] border rounded-xl',
      variant === 'dark'
        ? 'bg-white/[12%] backdrop-blur-[25px] border-white/[12%]'
        : 'border-gray-250 bg-white',
    ]"
    @toggle="handleDropdownToggle"
  >
    <template #head>
      <button class="flex-y-center text-gray-100 gap-1 cursor-pointer group">
        <span
          class="icon-globus text-xl transition-300 group-hover:text-green"
        />
        <span
          class="text-sm transition-300 leading-normal text-dark font-semibold group-hover:text-green"
          :class="variant === 'dark' ? 'text-white' : 'text-dark'"
        >
          {{ currentLang.name }}
        </span>
        <span
          class="icon-chevron transition-300 text-xl group-hover:text-green"
          :class="[
            { 'rotate-180': showDropdown },
            variant === 'dark' ? 'text-white' : 'text-gray-100',
          ]"
        ></span>
      </button>
    </template>
    <template #body>
      <div
        v-for="(lang, index) in availableLocales"
        :key="index"
        class="w-full"
      >
        <nuxt-link :to="switchLocalePath(lang.code)">
          <div
            class="flex items-center justify-between gap-4 py-2 px-2 cursor-pointer transition-300"
            :class="
              variant === 'dark' ? 'hover:bg-white/[12%]' : 'hover:bg-white-100'
            "
            @click="onChangeLocale(lang?.code)"
          >
            <div class="flex-y-center gap-1">
              <img :src="lang?.flag" alt="flag" />
              <span
                class="text-xs font-semibold"
                :class="variant === 'dark' ? 'text-white' : 'text-dark'"
              >
                {{ lang.name }}
              </span>
            </div>
          </div>
        </nuxt-link>
      </div>
    </template>
  </CommonDropdown>
</template>

<script lang="ts" setup>
interface Props {
  variant: 'default' | 'dark'
}

defineProps<Props>()

const { locale, locales } = useI18n()
const { changeLocale } = useLanguageSwitcher()

const switchLocalePath = useSwitchLocalePath()

const showDropdown = ref(false)

const availableLocales = computed(() => {
  return locales.value.filter((i) => i.code !== locale.value)
})
const currentLang = computed(() => {
  return locales.value.find((i) => i.code === locale.value)
})

function handleDropdownToggle(val: boolean) {
  showDropdown.value = val
}

const onChangeLocale = (code: string) => {
  showDropdown.value = false
  changeLocale(code)
}
</script>
