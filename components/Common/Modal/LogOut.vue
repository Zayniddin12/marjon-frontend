<template>
  <CommonModal
    v-bind="{ show }"
    body-class="!max-w-[580px]"
    no-header
    has-close-icon
    button-close-class="!top-6 !right-6 text-gray-100 hover:!text-red"
    @close="$emit('close')"
  >
    <div class="p-6 pt-10 text-center">
      <img src="/images/svg/log-out.svg" alt="log-out" class="mx-auto" />
      <p class="text-[28px] leading-normal font-bold text-dark">
        {{ $t('log_out_account') }}
      </p>
      <p class="mt-3 text-base leading-normal text-gray-100">
        {{ $t('log_out_account_text') }}
      </p>

      <div class="mt-16 flex-y-center gap-3">
        <CommonButton
          class="w-full"
          variant="secondary"
          :text="$t('cancel')"
          @click="$emit('close')"
        />
        <CommonButton
          class="w-full"
          :text="$t('log_out')"
          variant="danger"
          v-bind="{ loading }"
          @click="submit"
        />
      </div>
    </div>
  </CommonModal>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth'

interface Props {
  show?: boolean
  loading?: boolean
}

defineProps<Props>()
const emit = defineEmits(['close'])
const router = useRouter()

async function submit() {
  await useAuthStore().logout()
  await router.push('/')
  await window.location.reload()
  emit('close')
}
</script>
