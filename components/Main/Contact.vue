<template>
  <div
    id="contact"
    class="pt-16 border-b-[6px] border-green linear-bg-white relative"
  >
    <i class="icon-star text-[52px] text-green absolute top-3 left-[30%]" />
    <i
      class="icon-star text-[44px] text-[#EE6350] absolute top-[20%] left-[3%]"
    />
    <i
      class="icon-star text-[36px] text-[#67C1E6] absolute top-[20%] right-[3%]"
    />
    <i
      class="icon-star text-[28px] text-[#F8CD33] absolute bottom-[20%] left-[12%]"
    />
    <i
      class="icon-star text-[20px] text-[#58DA84] absolute bottom-[26%] right-[12%]"
    />
    <div class="container !max-w-[782px] relative z-10">
      <CommonSection :title="$t('not_found_what_you_were_looking_for')" />

      <div class="my-8 grid sm:grid-cols-2 gap-6">
        <FormGroup :label="$t('how_can_we_call_you')">
          <FormInput
            v-model="form.values.name"
            name="name"
            :error="form.$v.value.name?.$error"
            :placeholder="$t('enter_name')"
          />
        </FormGroup>
        <FormGroup :label="$t('phone_number')">
          <ClientOnly>
            <FormInput
              v-model="form.values.phone"
              v-maska="'## ### ## ##'"
              name="phone"
              :error="form.$v.value.phone?.$error"
              placeholder="000-00-00"
              input-class="pl-1"
            >
              <template #prefix>
                <p class="ml-3 flex-center -mb-[0.5px]">+998</p>
              </template>
            </FormInput>
          </ClientOnly>
        </FormGroup>
        <FormGroup :label="$t('enter_your_text')" class="sm:col-span-2">
          <FormTextarea
            v-model="form.values.text"
            name="text"
            :placeholder="$t('write_your_text')"
            maxlength="500"
            input-class="min-h-[108px]"
          />
        </FormGroup>
      </div>
      <div
        class="px-6 py-5 rounded-t-[20px] bg-green flex-center-between max-md:flex-col max-md:items-start gap-4"
      >
        <div class="flex-y-center gap-2">
          <FormCheckbox
            :checked="form.values.checkbox"
            :error="form.$v.value.checkbox.$error"
            class="shrink-0"
            @click="form.values.checkbox = !form.values.checkbox"
          />
          <i18n-t
            keypath="i_agree"
            tag="p"
            class="text-base leading-normal text-white cursor-pointer"
            @click="form.values.checkbox = !form.values.checkbox"
          >
            <template #link>
              <NuxtLinkLocale
                to="/profile/public-offers"
                class="text-white hover:underline"
              >
                {{ $t('term_of_use') }}
              </NuxtLinkLocale>
            </template>
          </i18n-t>
        </div>
        <CommonButton
          :text="$t('send')"
          variant="secondary-white"
          :loading="buttonLoading"
          @click="submit"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { required, sameAs } from '@vuelidate/validators'
import { useI18n } from 'vue-i18n'

// import { useReCaptcha } from 'vue-recaptcha-v3'
import { isValidPhone } from '~/utils'

const { handleError } = useErrorHandling()
const { showToast } = useCustomToast()
const { t } = useI18n()

const buttonLoading = ref(false)
// const siteKey = import.meta.env.VITE_APP_SITE_KEY

const form = useForm(
  {
    name: '',
    phone: '',
    text: '',
    checkbox: false,
  },
  {
    name: {
      required,
    },
    phone: {
      required,
      isValidPhone,
    },
    checkbox: {
      sameAs: sameAs(true),
    },
  }
)

// eslint-disable-next-line require-await
async function submit() {
  // const recaptchaInstance = useReCaptcha()
  // await recaptchaInstance?.recaptchaLoaded()
  // const token = await recaptchaInstance?.executeRecaptcha('contact')

  form.$v.value.$touch()
  if (!form.$v.value.$invalid) {
    buttonLoading.value = true
    const data = {
      full_name: form.values.name,
      phone: `+998${form.values.phone.replaceAll(' ', '')}`,
      question: form.values.text,
    }
    useApi()
      .$post('common/ContactUs/', {
        body: data,
      })
      .then(() => {
        showToast(t('successfully_applied'), 'success')
        form.values.name = ''
        form.values.phone = ''
        form.values.text = ''
        form.values.checkbox = false
        form.$v.value.$reset()
      })
      .catch((err) => {
        handleError(err)
      })
      .finally(() => (buttonLoading.value = false))
  }
}
</script>
