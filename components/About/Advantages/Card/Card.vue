<template>
  <div class="px-6 pb-4 rounded-20 bg-gray-200">
    <div class="w-[60px] h-[60px] rounded-xl bg-green flex-center mt-[-30px]">
      <img :src="card?.icon" alt="icon" class="w-10 h-10" />
    </div>
    <p class="mt-4 text-xl leading-130 font-semibold text-dark">
      {{ card?.title }}
    </p>
    <p class="text-gray-100 mt-2 text-base leading-130">
      {{ card?.description }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { IAboutAdvantage } from '~/types/common'

interface Props {
  card: IAboutAdvantage
}

defineProps<Props>()
</script>
