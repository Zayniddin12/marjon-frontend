<template>
  <div class="flex flex-col h-full justify-between p-6 gap-5">
    <div class="max-md:hidden"></div>
    <div>
      <p class="text-xl leading-130 font-semibold text-dark">
        {{ $t('confirm_text') }}
      </p>
      <button
        class="flex-y-center bg-gray-200 rounded-md relative overflow-hidden mt-2"
        @click="$emit('login')"
      >
        <p class="pl-2 pr-2.5 text-xs leading-130 text-dark">
          {{ value }}
        </p>
        <div class="w-7 h-7 bg-gray flex-center">
          <i class="icon-edit-pen text-gray-100 text-base" />
        </div>
      </button>
      <div class="mt-4">
        <FormGroup :label="$t('enter_otp')" label-class="!text-base">
          <FormOtp
            v-model="confirmForm.values.otp"
            :error="confirmForm.$v.value.otp.$error || error"
            @complete="submit"
          />
        </FormGroup>

        <div class="mt-4">
          <Transition name="fade" mode="out-in">
            <div v-if="!isFinished" class="flex-y-center gap-3">
              <p class="text-sm leading-140 text-dark">
                {{ $t('resend_in_time') }}
              </p>
              <CommonElementsCounter
                :seconds="120"
                @finished="isFinished = true"
              />
            </div>
            <button
              v-else
              class="text-sm leading-140 text-green hover:text-dark transition-300"
              @click="resend"
            >
              {{ $t('send_code') }}
            </button>
          </Transition>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-3">
      <CommonButton :text="$t('enter')" v-bind="{ loading }" @click="submit" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { minLength, required } from '@vuelidate/validators'

interface Props {
  value?: string
  loading?: boolean
  error?: boolean
}

defineProps<Props>()
const emit = defineEmits(['resend', 'submit', 'change'])

const confirmForm = useForm(
  {
    otp: '',
  },
  {
    otp: {
      required,
      minLength: minLength(6),
    },
  }
)

const isFinished = ref(false)

function submit() {
  confirmForm.$v.value.$touch()
  if (!confirmForm.$v.value.$invalid) {
    emit('submit', confirmForm.values.otp)
  }
}

function resend() {
  isFinished.value = false
  emit('resend')
}

watch(
  () => confirmForm.values.otp,
  () => {
    emit('change')
    confirmForm.$v.value.$reset()
  }
)
</script>
