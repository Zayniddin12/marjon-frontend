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
      <img src="/images/svg/application.svg" alt="log-out" class="mx-auto" />
      <p class="text-[28px] leading-normal font-bold text-dark">
        {{ $t('application_sent') }}
      </p>
      <p class="mt-3 text-base leading-normal text-gray-100">
        {{ $t('application_sent_text') }}
      </p>

      <div class="mt-16 flex-y-center flex-wrap sm:!flex-nowrap gap-3">
        <CommonButton
          class="w-full"
          variant="secondary"
          :text="$t('my_deals')"
          @click="close"
        />
        <CommonButton
          class="w-full"
          :text="$t('to_main')"
          v-bind="{ loading }"
          @click="$emit('close')"
        />
      </div>
    </div>
  </CommonModal>
</template>

<script setup lang="ts">
interface Props {
  show?: boolean
  loading?: boolean
}

defineProps<Props>()

const emit = defineEmits(['close'])
const router = useRouter()

function close() {
  emit('close')
  router.push('/profile/deals')
}
</script>
