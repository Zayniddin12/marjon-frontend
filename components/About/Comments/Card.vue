<template>
  <div
    class="bg-white px-5 pb-[46px] rounded-20 border border-white-100 w-full h-full"
  >
    <div
      class="w-[100px] h-[100px] rounded-full relative overflow-hidden mx-auto border border-white-100 comment-avatar-shadow translate-y-[-50px]"
    >
      <img
        :src="card?.avatar"
        class="w-full h-full object-cover"
        alt="comment-image"
      />
    </div>
    <div class="text-center mt-[-22px]">
      <i class="icon-blockquote text-green" />
      <p class="mt-3 text-xl leading-130 font-bold text-dark">
        {{ card?.full_name }}
      </p>
      <p class="mt-4 text-base leading-140 text-gray-100">
        {{ card?.feedback }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {IFeedback} from '~/types/common'

interface Props {
  card: IFeedback
}

defineProps<Props>()
</script>

<style scoped>
.comment-avatar-shadow {
  box-shadow: 0 4px 32px 0 rgba(25, 10, 53, 0.16);
}
</style>
