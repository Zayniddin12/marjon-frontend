<template>
  <div class="c-date-picker relative">
    <VueDatePicker
      v-bind="{ range, formatLocale }"
      ref="datePicker"
      auto-apply
      :month-change-on-scroll="false"
      text-input
      :position
      :text-input-options="{
        enterSubmit: true,
        openMenu: false,
        format: 'dd.MM.yyyy',
      }"
      :hide-navigation="[
        'month',
        'year',
        'calendar',
        'time',
        'minutes',
        'hours',
        'seconds',
      ]"
      :min-date="startDate"
      :max-date="endDate"
      ignore-time-validation
      :model-value="pickerValue"
      format="dd.MM.yyyy"
      @update:model-value="onChangeValue"
    >
      <template #dp-input>
        <FormInput
          v-maska="inputMask"
          class="!bg-gray-200 border-white-100"
          v-bind="{ error }"
          :model-value="value"
          :placeholder="inputPlaceholder"
          @update:model-value="value = $event"
          @blur="emit('blur')"
        />
      </template>
    </VueDatePicker>
    <div class="flex-center absolute-y gap-1 right-px">
      <button
        v-if="pickerValue"
        class="w-5 h-5 flex-center bg-gray rounded-full p-1 transition-300 group hover:bg-red"
        @click="clearDateFilter"
      >
        <span
          class="icon-close text-dark text-[10px] transition-200 group-hover:text-white"
        />
      </button>

      <button
        class="flex-center group px-3 h-[43px] w-[43px] rounded-r-xl bg-gray"
        type="button"
        aria-label="Open calendar"
        @click="toggleMenu"
      >
        <i
          class="icon-calendar transition-200 text-[18px] text-gray-700 group group-hover:text-primary"
        />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import '@vuepic/vue-datepicker/dist/main.css'

import VueDatePicker from '@vuepic/vue-datepicker'
import { enUS, ru, uz } from 'date-fns/locale'
import dayjs from 'dayjs'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

interface Props {
  modelValue: string
  error?: boolean
  range?: boolean
  startDate?: string
  endDate?: string
  position?: 'left' | 'right' | 'center'
}
const props = defineProps<Props>()

interface Emits {
  (event: 'blur'): void
  (event: 'update:modelValue', value: string): void
}
const emit = defineEmits<Emits>()

const { locale, t } = useI18n()

const value = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  },
})

const formatLocale = computed(() => {
  if (process.client) {
    const locales = {
      uz,
      ru,
      en: enUS,
    }

    return locales[locale.value as keyof typeof locales]
  }
})

const datePicker = ref()

const showMenu = ref(false)
const toggleMenu = () => {
  showMenu.value ? datePicker.value?.closeMenu() : datePicker.value?.openMenu()
  showMenu.value = !showMenu.value
}

const inputMask = computed(() =>
  props.range ? '##.##.#### - ##.##.####' : '##.##.####'
)

const inputPlaceholder = computed(() =>
  props.range ? `${t('dd_mm_yyyy')} - ${t('dd_mm_yyyy')}` : t('dd_mm_yyyy')
)
const clearDateFilter = () => {
  value.value = ''
}

const onChangeValue = (val: string) => {
  value.value = props.range
    ? `${dayjs(val[0]).format('DD.MM.YYYY')} - ${dayjs(val[1]).format(
        'DD.MM.YYYY'
      )}`
    : dayjs(val).format('DD.MM.YYYY')
  showMenu.value = false
}

const pickerValue = computed(() => {
  if (!props.modelValue) return undefined

  if (props.range) {
    const [start, end] = props.modelValue.split(' - ')
    const formattedStart = dayjs(start?.split('.').reverse().join('-')).format(
      'YYYY-M-D'
    )
    const formattedEnd = dayjs(end.split('.').reverse().join('-')).format(
      'YYYY-M-D'
    )
    return [new Date(formattedStart), new Date(formattedEnd)]
  } else {
    const formattedDate = dayjs(
      props.modelValue.split('.').reverse().join('-')
    ).format('YYYY-M-D')
    return new Date(formattedDate)
  }
})
</script>

<style>
.c-date-picker .dp__overlay_container {
  height: 288px !important;
}

.c-date-picker .dp__input {
  padding: 8px 12px !important;
}

.c-date-picker .dp__input_wrap svg {
  display: none !important;
}
</style>
