<template>
  <div
    class="i-counter h-11 grid grid-cols-[36px_1fr_36px] gap-2 w-[172px] rounded-xl d-grid gap-2 align-items-center"
  >
    <CommonButton
      :text="''"
      icon="icon-minus text-xl -mb-0.5 block"
      class="!p-0 !w-9 h-9 flex-center !rounded-lg"
      variant="secondary"
      :disabled="disableDecrease"
      @click="decrease"
    />
    <div :class="{ readonly }" class="h-9">
      <input
        v-model="count"
        v-maska="inputMask"
        type="text"
        :readonly="readonly"
        :min="min"
        :max="max"
        class="w-full flex-center border border-white-100 text-center rounded-lg text-base leading-normal text-dark h-9 focus:border-green outline-none transition-300"
        :class="{ error }"
        @input="onChangeCount"
      />
    </div>
    <CommonButton
      :text="''"
      icon="icon-plus text-xl -mb-0.5 block"
      class="!p-0 !w-9 h-9 flex-center !rounded-lg bg-green-100"
      :disabled="disableIncrease"
      @click="increase"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  defaultCount?: number
  disableIncrease?: boolean
  disableDecrease?: boolean
  error?: boolean
  readonly?: boolean
  residentValidation?: boolean
  inputMask?: string
  max?: number
  min?: number
}
const props = withDefaults(defineProps<Props>(), {
  defaultCount: 0,
  min: 0,
  max: 999,
  inputMask: '###',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
  (e: 'increase'): void
  (e: 'decrease'): void
}>()

const count = ref(0)

watch(
  () => props.defaultCount,
  (newValue) => {
    if (newValue) {
      count.value = newValue
    }
  },
  { immediate: true }
)

watch(
  () => count.value,
  () => {
    if (count.value < props.min) {
      count.value = props.min
    }
    if (count.value > props.max) {
      count.value = props.max
    }
    emit('update:modelValue', count.value)
  },
  { immediate: true, deep: true }
)

const decrease = () => {
  if (
    count.value > 0 &&
    !props.disableDecrease &&
    ((props.residentValidation && count.value - 1 >= props.defaultCount) ||
      !props.residentValidation)
  ) {
    emit('decrease')
    count.value--
  }
}
const increase = () => {
  if (!props.disableIncrease) {
    emit('increase', count.value)
    count.value++
  }
}
const onChangeCount = (event: InputEvent) => {
  const target = event.target as HTMLInputElement

  if (target?.value.includes('-') || event.data?.includes('-')) {
    return event.preventDefault()
  }
}

watch(
  () => count.value,
  () => {
    if (count.value < props.min) {
      count.value = props.min
    }
    if (count.value > props.max) {
      count.value = props.max
    }
  },

  { deep: true, immediate: true }
)
</script>
