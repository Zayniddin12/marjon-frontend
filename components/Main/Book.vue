<template>
  <CommonModal
    v-bind="{ show }"
    body-class="!max-w-[403px]"
    :title="t('book')"
    @close="closeModal"
  >
    <div class="flex flex-col p-6 gap-4">
      <FormGroup :label="t('your_name')">
        <FormInput
          v-model="form.values.name"
          :error="form.$v.value.name.$error"
          :placeholder="t('enter_name')"
        />
      </FormGroup>
      <FormGroup :label="t('phone_number')">
        <FormInputIntarnationalNumber
          v-model="form.values.phone"
          :error="form.$v.value.phone.$error"
          :placeholder="t('phone_number')"
          variant="phone-white-input"
          @trigger="checkValidate"
        />
      </FormGroup>

      <FormGroup :label="t('company_name')">
        <FormInput
          v-model="form.values.company"
          :error="form.$v.value.company.$error"
          :placeholder="t('enter_company_name')"
        />
      </FormGroup>
      <vue-recaptcha
        ref="recaptcha"
        class="mt-5 mb-8 mx-aut"
        :sitekey="siteKey"
        @verify="verifyMethod"
        @expired="expiredMethod"
      />
      <CommonButton
        :text="t('send')"
        v-bind="{ buttonLoading }"
        :disabled="captchaToken.length == 0"
        @click="submitBook"
      />
    </div>
  </CommonModal>
</template>

<script setup lang="ts">
import { required } from '@vuelidate/validators'
import { useI18n } from 'vue-i18n'
import { VueRecaptcha } from 'vue-recaptcha'

import { useErrorHandling } from '~/composables/useErrorHandling'

const siteKey = import.meta.env.VITE_APP_SITE_KEY
const { t } = useI18n()
interface Props {
  show?: boolean
}

defineProps<Props>()
const { showToast } = useCustomToast()
const { handleError } = useErrorHandling()
const captchaToken = ref('')
const buttonLoading = ref(false)

function checkValidate(item: boolean) {
  return item
}
function verifyMethod(response: any) {
  captchaToken.value = response
}
function expiredMethod() {
  captchaToken.value = null
}
const form = useForm(
  {
    name: '',
    company: '',
    position: '',
    phone: '+998',
  },
  {
    name: {
      required,
    },
    company: {},
    position: {},
    phone: {
      required,
    },
  }
)

interface Emits {
  (e: 'submit', v: boolean): void
  (e: 'close', v: boolean): void
}
const $emit = defineEmits<Emits>()
function toLogin() {
  form.values.name = ''
  form.values.position = ''
  form.values.company = ''
  form.values.phone = ''
  form.$v.value.$reset()
}

function submitBook() {
  form.$v.value.$touch()
  buttonLoading.value = true
  if (captchaToken?.value) {
    if (!form.$v.value.$invalid) {
      useApi()
        .$post('/contracts/OrderBooking/', {
          body: {
            full_name: form.values.name,
            phone: form.values.phone,
            company: form.values.company,
            position: form.values.position,
          },
        })
        .then(() => {
          showToast(t('request_successfully_submitted'), 'success')
          form.$v.value.$reset()
          captchaToken.value = ''
          $emit('submit', true)
        })
        .catch((err) => {
          handleError(err)
        })
        .finally(() => (buttonLoading.value = false))
    }
  }
}
function closeModal() {
  captchaToken.value = ''
  form.$v.value.$reset()
  $emit('close')
}
</script>
<style>
.rc-anchor-normal {
  height: 48px !important;
  width: 196px !important;
}
</style>
