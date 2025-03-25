<template>
  <div ref="inputWrapper" :class="variant" class="relative flex !w-full">
    <VueTelInput
      ref="phoneInput"
      v-model="phone"
      :enabled-country-code="false"
      :enabled-flags="false"
      default-country="uz"
      :input-options="{ placeholder, maxlength: 20, autofocus: autofocus }"
      :disabled="readonly"
      name="phone_number"
      autocomplete="+998"
      valid-characters-only
      class="w-full"
      input-classes="text-white"
      @validate="handleValidatedPhone"
      @keydown.enter="$emit('enter')"
    />

    <span :class="[suffixClass]" class="absolute-y right-2">
      <slot name="suffix" />
    </span>
  </div>
</template>

<script lang="ts" setup>
import 'assets/vue-tel-input.css'

import { useEventListener } from '@vueuse/core'
import { VueTelInput } from 'vue-tel-input'

interface Props {
  error?: boolean
  modelValue?: string
  placeholder?: string
  loading?: boolean
  readonly?: boolean
  suffixClass?: string
  autofocus?: boolean
  variant?: string
}

const props = defineProps<Props>()

interface Emits {
  (event: 'update:modelValue', value: string): void

  (event: 'trigger', value: boolean): void

  (event: 'blur', value: string): void

  (event: 'reset-validation'): void

  (event: 'enter'): void
}

const emit = defineEmits<Emits>()

const valid = ref(false)
const invalidError = ref(false)

const phoneInput = ref<HTMLElement>()
const inputWrapper = ref<HTMLElement>()
const phone = defineModel<string>('modelValue')
useEventListener(phoneInput, 'keydown', (e: KeyboardEvent) => {
  if (e.key === 'Backspace' && phone.value === '+') {
    e.preventDefault()
  }
})

watch(
  () => phone.value,
  (value) => {
    emit('update:modelValue', value)
  }
)

watch(
  () => props.modelValue,
  () => {
    phone.value = props.modelValue ?? ''
  },
  { immediate: true }
)

const onFocus = () => {
  if (phone.value?.length === 0) {
    emit('update:modelValue', '+')
  }
}

const onBlur = () => {
  if (phone.value?.length === 1) {
    phone.value = ''
    setTimeout(() => {
      emit('reset-validation')
    }, 10)
  }

  // On change tab validation touch method fires immediately. So we need to wait
  setTimeout(() => emit('blur', phone.value), 500)
}

const onPaste = (e: ClipboardEvent) => {
  e.preventDefault()

  const pastedText = e.clipboardData?.getData('text/plain') ?? ''

  const hasDefaultPlus = phone.value.startsWith('+998')
  const hasPastedPlus = pastedText?.startsWith('+998')

  if (hasDefaultPlus && hasPastedPlus) {
    phone.value = pastedText
  } else if (hasDefaultPlus && !hasPastedPlus) {
    phone.value = `+${pastedText}`
  } else if (!hasDefaultPlus && hasPastedPlus) {
    phone.value = pastedText
  } else if (!hasDefaultPlus && !hasPastedPlus) {
    phone.value = `+${pastedText}`
  }
}

onMounted(() => {
  const telInputElement = inputWrapper.value?.querySelector(
    '.vue-tel-input'
  ) as HTMLElement

  // Set placeholder, flag, and other initializations
  if (props?.variant === 'phone-white-input') {
    const phoneInput = inputWrapper.value?.querySelector(
      '.phone-white-input input'
    ) as HTMLInputElement
    phoneInput.setAttribute('placeholder', props.placeholder ?? '')
    const flagElement = inputWrapper.value?.querySelector('.vti__flag')
    if (flagElement) {
      flagElement.classList.add('uz')
    }
    phoneInput.onblur = onBlur
    phoneInput.onfocus = onFocus
    phoneInput.onpaste = onPaste
  }

  // Set initial value if provided
  if (props.modelValue) {
    phone.value = props.modelValue
  }

  // Watch for error prop changes to update the error class on .vti__input
  watch(
    () => props.error,
    (newError: boolean) => {
      if (telInputElement) {
        if (newError) {
          telInputElement.classList.add('error')
          console.log(telInputElement)
        } else {
          telInputElement.classList.remove('error')
        }
      }
    },
    { immediate: true }
  )
})

interface IValidateOptions {
  country: {
    dialCode: string
    iso2: string
    name: string
  }
  countryCode: string | undefined
  formatted: string | ''
  valid: boolean | undefined
  countryCallingCode?: string
  nationalNumber?: string
  number?: string
}

function handleValidatedPhone(options: IValidateOptions) {
  valid.value = !!options?.countryCode ?? false
  invalidError.value =
    !options.valid &&
    !!options?.countryCode &&
    options.formatted.length > String(options.number)?.length
  emit('trigger', invalidError.value)
}
</script>

<style>
.vti__input {
  @apply !pl-[6px] !py-3;
}
.vti__flag {
  @apply !mr-[0] !rounded-sm;
}

.phone-white-input .vti__dropdown {
  @apply !pr-0;
}
.phone-white-input .vue-tel-input {
  @apply bg-white border border-gray focus-within:border-green flex items-center rounded-xl transition-all duration-300;
}
.phone-white-input .error {
  @apply bg-white border !border-red focus-within:border-red !bg-red/5 flex items-center rounded-xl transition-all duration-300;
}
.phone-white-input .vti__input {
  @apply w-full h-full text-base sm:text-sm px-3 py-2.5 text-dark bg-transparent outline-none font-medium leading-5 placeholder:text-gray-100;
}

.phone-white-input .vti__dropdown {
  @apply pointer-events-none transition-all duration-300;
}

.phone-white-input .invalid .vti__dropdown {
  @apply invisible opacity-0;
}

.phone-white-input input {
  @apply py-[10.5px] pl-0 bg-transparent text-sm text-dark;
}

.phone-white-input input::placeholder {
  @apply text-sm text-gray;
}

.phone-white-input .vti__dropdown-list {
  @apply hidden;
}

.phone-white-input .vti__dropdown .vti__dropdown-arrow {
  @apply hidden;
}
</style>
