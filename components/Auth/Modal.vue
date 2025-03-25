<template>
  <CommonModal
    v-bind="{ show }"
    no-header
    body-class="!max-w-[782px]"
    @close="$emit('close')"
  >
    <div class="grid md:grid-cols-2">
      <div class="relative max-md:hidden">
        <i18n-t
          keypath="auth_text"
          tag="p"
          class="text-[32px] font-bold leading-130 text-white absolute-x top-[24%] text-center"
        >
          <template #text>
            <span class="text-green">{{ $t('auth_text_2') }}</span>
          </template>
        </i18n-t>
        <img
          v-if="useI18n().locale.value === 'uz'"
          src="/images/banner.png"
          alt="banner"
          class="w-full h-full"
        />
        <img
          v-if="useI18n().locale.value === 'ru'"
          src="/images/bannerru.png"
          alt="banner"
          class="w-full h-full"
        />
      </div>
      <div class="flex flex-col">
        <div class="px-6 py-4 border-b border-white-100 flex-center-between">
          <p class="text-2xl leading-[125%] font-bold">
            {{ $t(ETitle?.[step]) }}
          </p>
          <i
            class="icon-close text-2xl text-gray-100 transition-300 cursor-pointer hover:text-red"
            @click="$emit('close')"
          />
        </div>
        <Transition name="fade" mode="out-in">
          <AuthLogin
            v-if="step === 'login'"
            :form="loginForm"
            :loading="buttonLoading"
            :step="step"
            @register="toRegister"
            @submit-login="submitLogin"
          />
          <AuthRegister
            v-else-if="step === 'register'"
            :form="registerForm"
            :loading="buttonLoading"
            @login="toLogin"
            @submit="
              sendCode(
                `+998${registerForm.values.phone?.replaceAll(' ', '')}`,
                'register'
              )
            "
          />
          <AuthConfirm
            v-else
            :value="phoneNumberFormatter(phoneValue)"
            :loading="buttonLoading"
            :error="otpError"
            @change="otpError = false"
            @login="step = backStep"
            @submit="checkConfirm"
            @resend="sendCode(phoneValue.replaceAll(' ', ''))"
          />
        </Transition>
      </div>
    </div>
  </CommonModal>
</template>

<script setup lang="ts">
import { required } from '@vuelidate/validators'
import { useI18n } from 'vue-i18n'

import { useErrorHandling } from '~/composables/useErrorHandling'
import { useAuthStore } from '~/store/auth'
import { phoneNumberFormatter } from '~/utils'

const authStore = useAuthStore()
interface Props {
  show?: boolean
}

defineProps<Props>()

const { handleError } = useErrorHandling()

const step = ref<'login' | 'register' | 'confirm'>('login')
const backStep = ref<'login' | 'register'>('login')
const buttonLoading = ref(false)
const session = ref('')
const phoneValue = ref('')
const formType = ref<'login' | 'register'>('login')
const otpError = ref(false)

const loginForm = useForm(
  {
    phone: '',
  },
  {
    phone: {
      required,
      isValidPhone,
    },
  }
)

const registerForm = useForm(
  {
    name: '',
    title: '',
    activity: '',
    phone: '',
  },
  {
    name: {
      required,
    },
    title: {
      required,
    },
    activity: {
      required,
    },
    phone: {
      required,
      isValidPhone,
    },
  }
)

function toRegister() {
  registerForm.values.phone = loginForm.values.phone
  loginForm.values.phone = ''
  loginForm.$v.value.$reset()
  step.value = 'register'
  backStep.value = 'register'
}

function toLogin() {
  registerForm.values.name = ''
  registerForm.values.title = ''
  registerForm.values.activity = ''
  registerForm.values.phone = ''
  registerForm.$v.value.$reset()
  step.value = 'login'
  backStep.value = 'login'
}

function sendCode(phone: string, type: 'login' | 'register') {
  formType.value = type
  buttonLoading.value = true
  useApi()
    .$post('users/Registration/SmsVerification/Entrypoint/Register', {
      body: {
        phone,
      },
    })
    .then((res: { session: string }) => {
      session.value = res?.session
      phoneValue.value = phone
      step.value = 'confirm'
    })
    .catch((err) => {
      handleError(err)
    })
    .finally(() => (buttonLoading.value = false))
}

function submitLogin(phone: string, sessions: string) {
  step.value = 'confirm'
  phoneValue.value = phone
  session.value = sessions
}

function login(otp: string) {
  buttonLoading.value = true
  useApi()
    .$post('users/LoginWeb/', {
      body: {
        phone_number: phoneValue.value,
        code: otp,
        session: session.value,
      },
    })
    .then(async (res: any) => {
      await authStore.setTokens(res)
      await authStore.getUser()
      authStore.showAuth = false
      step.value = 'login'
    })
    .catch((err) => {
      otpError.value = true
      handleError(err)
    })
    .finally(() => (buttonLoading.value = false))
}

function register(otp: string) {
  buttonLoading.value = true

  const data = {
    full_name: registerForm.values.name,
    company_name: registerForm.values.title,
    phone_number: phoneValue.value,
    activity_type: registerForm.values.activity,
    code: otp,
    session: session.value,
  }

  useApi()
    .$post('users/RegistrationWeb/', {
      body: data,
    })
    .then(async (res: any) => {
      await authStore.setTokens(res?.token)
      await authStore.getUser()
      authStore.showAuth = false
      step.value = 'login'
    })
    .catch((err) => {
      otpError.value = true
      handleError(err)
    })
    .finally(() => (buttonLoading.value = false))
}

function checkConfirm(otp: string) {
  if (formType.value === 'login') {
    login(otp)
  } else {
    register(otp)
  }
}
enum ETitle {
  login = 'auth_login',
  register = 'auth_register',
  confirm = 'auth_confirm',
}
</script>
