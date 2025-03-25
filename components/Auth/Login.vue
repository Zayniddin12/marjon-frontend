<template>
  <div class="flex flex-col h-full justify-between p-6 gap-5">
    <div class="max-md:hidden"></div>
    <div>
      <FormGroup :label="$t('phone_number')">
        <ClientOnly>
          <FormInput
            v-model="form.values.phone"
            v-maska="'## ### ## ##'"
            :error="form.$v.value.phone?.$error"
            placeholder="00 000-00-00"
            input-class="pl-1"
            @keydown.enter="submitLogin()"
          >
            <template #prefix>
              <p class="ml-3 flex-center">+998</p>
            </template>
          </FormInput>
        </ClientOnly>
      </FormGroup>
    </div>
    <div class="flex flex-col gap-3">
      <CommonButton
        :text="$t('enter')"
        v-bind="{ buttonLoading }"
        @click="submitLogin()"
      />
      <CommonButton
        variant="secondary"
        :text="$t('to_register')"
        @click="$emit('register')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { useErrorHandling } from '~/composables/useErrorHandling'
import type { TForm } from '~/composables/useForm'

interface Props {
  form: TForm<any>
  loading?: boolean
  step?: string
}

const props = defineProps<Props>()
const { form } = unref(props)
const emit = defineEmits(['register', 'submitLogin'])
const buttonLoading = ref(false)
const { t } = useI18n()
const { handleError } = useErrorHandling()

function submitLogin() {
  form.$v.value.$touch()
  buttonLoading.value = true
  if (!form.$v.value.$invalid) {
    useApi()
      .$post('/users/Registration/SmsVerification/Entrypoint/', {
        body: {
          phone: '+998' + form.values.phone.replaceAll(' ', ''),
        },
      })
      .then((res) => {
        emit(
          'submitLogin',
          `+998${form.values.phone.replaceAll(' ', '')}`,
          `${res.session}`
        )
      })
      .catch((err) => {
        handleError(err)
      })
      .finally(() => {
        buttonLoading.value = false
      })
  }
}
</script>
