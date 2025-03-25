<template>
  <CommonModal
    v-bind="{ show }"
    :title="$t('share')"
    body-class="!max-w-[378px]"
    header-style="border-b-0"
    @close="$emit('close')"
  >
    <div class="p-4 pb-5">
      <div class="py-2.5 px-4 bg-gray-200 w-full rounded-lg flex-center gap-6">
        <button
          v-for="(social, index) in shareData"
          :key="index"
          :class="social?.icon"
          class="text-[32px] text-gray-100"
          @click="share(social?.type)"
        />
      </div>
      <CommonButtonCopy
        class="mt-3 w-full !max-w-full p-1"
        button-style="!rounded-md !w-11 !h-11"
        :copy_text="link"
        text-style="!text-dark"
      />
    </div>
  </CommonModal>
</template>

<script setup lang="ts">
interface Props {
  show?: boolean
  title?: string
}

const props = defineProps<Props>()

const link = computed(() => {
  if (process.client) {
    return window.location.href
  }
})

const share = (network: string) => {
  if (process.client) {
    switch (network) {
      case 'telegram':
        window.open(`https://t.me/share/url?url=${link.value} `, '_blank')
        break
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?text=${props.title}\n\n+${link.value}`,
          '_blank'
        )
        break
      case 'facebook':
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${link.value}`,
          '_blank'
        )
        break
      case 'whatsapp':
        window.open(
          `https://api.whatsapp.com/send?text=${props.title}\n${link.value}`,
          '_blank'
        )
        break
    }
  }
}

const shareData = [
  {
    icon: 'icon-telegram',
    type: 'telegram',
  },
  {
    icon: 'icon-facebook',
    type: 'facebook',
  },
  {
    icon: 'icon-twitter',
    type: 'twitter',
  },
]
</script>
