<template>
  <div class="bg-white rounded-20 mb-8">
    <div class="border-b border-gray-200 ml-5 py-5 flex-y-center gap-1">
      <NuxtLinkLocale
        v-if="isMobile || isTablet"
        to="/profile"
        class="icon-chevron text-2xl text-dark font-bold rotate-90"
      />
      <p class="text-2xl leading-130 font-bold text-dark">
        {{ $t('profile') }}
      </p>
    </div>
    <div class="p-5 pt-6">
      <FormGroup :label="$t('photo')" label-class="!text-base !font-normal">
        <ProfileAboutAvatar
          :key="trigger"
          :default-image="form.values.avatar"
          @change="form.values.avatar = $event"
        />
      </FormGroup>

      <div class="grid sm:grid-cols-2 gap-5 mt-5">
        <FormGroup :label="$t('name_company')">
          <FormInput
            v-model="form.values.name"
            class="!bg-gray-200 border-white-100"
            :placeholder="$t('enter_name_company')"
            :error="form.$v.value.name.$error"
          />
        </FormGroup>
        <FormGroup :label="$t('activity_type')">
          <FormSelect
            :key="activityList?.length"
            v-model="form.values.activity"
            :options="activityList"
            label-key="title"
            value-key="id"
            :placeholder="$t('choose_activity_type')"
            :error="form.$v.value.activity.$error"
          />
        </FormGroup>
        <FormGroup :label="$t('account_manager')">
          <FormInput
            v-model="form.values.manager"
            class="!bg-gray-200 border-white-100"
            :placeholder="$t('enter_account_manager')"
            :error="form.$v.value.manager.$error"
          />
        </FormGroup>
        <FormGroup :label="$t('phone_number')">
          <ClientOnly>
            <FormInput
              v-model="form.values.phone"
              v-maska="'## ### ## ##'"
              class="!bg-gray-200 border-white-100"
              :error="form.$v.value.phone?.$error"
              placeholder="000-00-00"
              input-class="pl-1"
            >
              <template #prefix>
                <p class="ml-3 flex-center">+998</p>
              </template>
            </FormInput>
          </ClientOnly>
        </FormGroup>
      </div>

      <div class="flex justify-end mt-8">
        <CommonButton
          :text="$t('save_changes')"
          :loading="buttonLoading"
          @click="submit"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { required } from '@vuelidate/validators'
import { useI18n } from 'vue-i18n'

import { useAuthStore } from '~/store/auth'
import type { IActivity } from '~/types/common'
import { isValidPhone } from '~/utils'

const { isMobile, isTablet } = useDevice()
const { handleError } = useErrorHandling()
const { showToast } = useCustomToast()
const { t } = useI18n()
const authStore = useAuthStore()
const activityList = ref<IActivity[]>([])
const user = computed(() => authStore.user)
const buttonLoading = ref(false)
const trigger = ref(false)

const form = useForm(
  {
    avatar: '',
    name: '',
    activity: '',
    manager: '',
    phone: '',
  },
  {
    name: {
      required,
    },
    activity: {
      required,
    },
    manager: {
      required,
    },
    phone: {
      required,
      isValidPhone,
    },
  }
)

function submit() {
  form.$v.value.$touch()
  if (!form.$v.value.$invalid) {
    buttonLoading.value = true
    const formData = new FormData()
    formData.append('company_name', form.values.name)
    formData.append('activity_type', form.values.activity)
    formData.append('account_manager', form.values.manager)
    formData.append(
      'phone_number',
      `+998${form.values.phone?.replaceAll(' ', '')}`
    )
    if (typeof form.values.avatar !== 'string' || form.values.avatar === null) {
      formData.append('avatar', form.values.avatar || '')
    }

    useApi()
      .$patch(`users/UserEditWeb/${user.value.id}/`, {
        body: formData,
      })
      .then(() => {
        showToast(t('successfully_changed'), 'success')
        authStore.getUser()
      })
      .catch((err) => {
        handleError(err)
      })
      .finally(() => (buttonLoading.value = false))
  }
}

watch(
  () => user.value,
  () => {
    form.values.name = user.value?.company_name
    form.values.activity = user.value?.activity_type
    form.values.manager = user.value?.account_manager
    form.values.phone = user.value?.phone_number?.substring(4)
    form.values.avatar = user.value?.avatar
    trigger.value = trigger.value
  },
  {
    immediate: true,
  }
)

function getActivityList() {
  useApi()
    .$get('users/ActivityTypeList/')
    .then((res: any) => {
      activityList.value = res?.results
    })
}

getActivityList()
</script>
