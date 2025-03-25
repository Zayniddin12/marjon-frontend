<template>
  <CommonModal
    max-width
    v-bind="{ show }"
    title=""
    body-class="!max-w-[786px] !bg-transparent !overflow-visible relative"
    header-style="!border-[0px]"
    has-close-icon
    no-header
    close-on-backdrop
    @close="$emit('close')"
  >
    <div :key="show" class="text-white">
      <ProfileDealsGallerySlider
        v-bind="{ images, thumbsSwiper }"
        :active="innerActive"
        @change="innerActive = $event"
      />
      <ProfileDealsGalleryThumbnail
        class="mt-4"
        v-bind="{ images }"
        :active="innerActive"
        @swiper="initSwiper"
      />
    </div>
  </CommonModal>
</template>

<script setup lang="ts">
import SwiperClass from 'swiper'

interface Props {
  show: boolean
  images?: string[]
  active: number
  title: string
}

const props = defineProps<Props>()

const innerActive = ref(props.active)
const thumbsSwiper = ref<SwiperClass>()

const initSwiper = (value) => {
  thumbsSwiper.value = value
}

watch(
  () => props.show,
  () => {
    if (!props.show) {
      innerActive.value = 0
    } else {
      innerActive.value = props.active
    }
  }
)
</script>
