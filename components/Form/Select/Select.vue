<template>
  <div ref="select" class="relative">
    <!--  SELECTED OPTION  -->
    <div
      class="bg-gray-200 rounded-xl px-3 py-2.5 cursor-pointer flex items-center gap-2 justify-between border border-white-100 transition-300"
      :class="[selectedOptionStyles, { '!border-red !bg-red/5': error }]"
      @click="toggleSelect(!showOptions)"
    >
      <slot name="selectedOption" :value="value">
        <ClientOnly>
          <div
            v-if="!value"
            class="text-gray-100 text-base leading-normal truncate"
          >
            {{ placeholder }}
          </div>
          <div v-else class="text-dark text-base leading-normal">
            {{ value[labelKey] || value }}
          </div>
        </ClientOnly>
        <slot name="chevron">
          <span
            class="icon-chevron transition-all duration-200 inline-block text-dark text-2xl"
            :class="{ 'rotate-180': showOptions }"
          ></span>
        </slot>
      </slot>
    </div>

    <!--  OPTIONS  -->
    <Transition name="select">
      <div
        v-if="showOptions"
        :key="showOptions"
        class="absolute top-full w-full bg-white border border-white-100 rounded-xl z-40 translate-y-3 overflow-x-hidden max-h-[245px] scroll-style"
      >
        <slot name="options">
          <template v-if="options?.length">
            <div
              v-for="(option, idx) in options"
              :key="idx"
              class="transition-all duration-200 p-3 hover:bg-gray-200 cursor-pointer flex-center-between border-b border-white-100 last:border-[0px]"
              @click="onSelect(option)"
            >
              <slot name="option" :option="option" :index="idx">
                <Highlighter
                  :text-to-highlight="option[labelKey]"
                  class="text-dark text-sm leading-normal"
                  highlight-class-name="bg-yellow-100 rounded-sm p-0.5"
                  :search-words="[searchText]"
                />
              </slot>

              <i v-if="isActive(option)" class="icon-tick text-xl text-green" />
            </div>
          </template>
          <div v-else class="text-center py-2 text-sm text-dark">
            {{ $t('no_search_data') }}
          </div>
          <div v-if="infiniteScroll" ref="target" class="py-0.5 w-full" />
          <Transition name="fade">
            <CommonElementsLoader v-if="loading" />
          </Transition>
        </slot>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside, useIntersectionObserver } from '@vueuse/core'
import Highlighter from 'vue-highlight-words'

type TOption = string | number | { [key: string]: string | number }

export interface Props {
  modelValue: TOption
  options: TOption[]
  labelKey?: string
  valueKey?: string
  selectedOptionStyles?: string
  placeholder?: string
  infiniteScroll?: boolean
  searchText?: string
  loading?: boolean
  error?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  labelKey: 'name',
  valueKey: 'id',
  selectedOptionStyles: '',
  searchText: '',
})

const emit = defineEmits<{
  (e: 'on-toggle', value: boolean): void
  (e: 'on-select', value: any): void
  (e: 'update:modelValue', value: boolean): void
  (e: 'infinite-scroll'): void
}>()

const showOptions = ref(false)
const target = ref(null)
const targetIsVisible = ref(false)

function toggleSelect(newValue = showOptions.value) {
  showOptions.value = newValue
  emit('on-toggle', showOptions.value)
}

function findOption(option: TOption) {
  return props.options?.find(
    (o) => o === option || o[props.valueKey] === option
  )
}

const value = ref(findOption(props.modelValue))
function onSelect(option: TOption) {
  value.value = option
  toggleSelect(false)
  emit('update:modelValue', option[props.valueKey])
  emit('on-select', option)
}

const select = ref()
onClickOutside(select, () => toggleSelect(false))

function isActive(option: TOption) {
  return (
    option === value.value ||
    (value.value && value.value[props.valueKey] === option[props.valueKey]) ||
    option[props.valueKey] === value.value
  )
}
const { stop } = useIntersectionObserver(
  target,
  ([{ isIntersecting }], observerElement) => {
    targetIsVisible.value = isIntersecting
  }
)
watch(
  () => targetIsVisible.value,
  (newValue) => {
    if (newValue) {
      emit('infinite-scroll')
    }
  }
)
watch(
  () => props.modelValue,
  (val) => {
    value.value = findOption(props.modelValue)
  },
  {
    immediate: true,
  }
)

watch(
  () => props.options,
  () => {
    value.value = findOption(props.modelValue)
  },
  {
    deep: true,
  }
)
</script>

<style scoped>
.select-enter-active,
.select-leave-active {
  transition: all 0.2s ease-in-out;
}

.select-enter-from,
.select-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

.scroll-style::-webkit-scrollbar {
  width: 3px;
}

.scroll-style::-webkit-scrollbar-track {
  background: #dce0e4;
}

.scroll-style::-webkit-scrollbar-thumb {
  background: #8e9ba8;
}
</style>
