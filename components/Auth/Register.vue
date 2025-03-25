<template>
  <div class="flex flex-col gap-4 h-full justify-between p-6">
    <div class="flex flex-col gap-4">
      <FormGroup :label="$t('fio')">
        <FormInput
          v-model="form.values.name"
          :error="form.$v.value.name.$error"
          :placeholder="$t('enter_name')"
        />
      </FormGroup>
      <FormGroup :label="$t('company_name')">
        <FormInput
          v-model="form.values.title"
          :error="form.$v.value.title.$error"
          :placeholder="$t('enter_company_name')"
        />
      </FormGroup>
      <FormGroup :label="$t('activity_type')">
        <FormSelect
          v-model="form.values.activity"
          selected-option-styles="border-gray bg-transparent"
          :options="activityList"
          label-key="title"
          value-key="id"
          :placeholder="$t('choose_activity_type')"
          :error="form.$v.value.activity.$error"
        />
      </FormGroup>
      <FormGroup :label="$t('phone_number')">
        <ClientOnly>
          <FormInput
            v-model="form.values.phone"
            v-maska="'## ### ## ##'"
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
    <div class="flex flex-col gap-3">
      <CommonButton
        class="w-full"
        :text="$t('registration')"
        v-bind="{ loading }"
        @click="submit"
      />
      <CommonButton
        class="w-full"
        variant="secondary"
        :text="$t('auth_login')"
        @click="emit('login')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IActivity } from '~/types/common'

interface Props {
  form: any
  loading: boolean
}

const props = defineProps<Props>()
const { form } = unref(props)
const emit = defineEmits(['submit', 'login'])

const activityList = ref<IActivity[]>([])

function submit() {
  form.$v.value.$touch()
  if (!form.$v.value.$invalid) {
    emit('submit')
  }
}

function getActivityList() {
  useApi()
    .$get('users/ActivityTypeList/')
    .then((res: any) => {
      activityList.value = res?.results
    })
}

getActivityList()
</script>
