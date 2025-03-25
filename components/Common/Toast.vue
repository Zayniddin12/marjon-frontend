<template>
  <div
    class="relative flex-center-between gap-2 pr-3 bg-white border border-red/[8%] rounded-lg overflow-hidden"
  >
    <div
      class="w-3 h-3 rounded-full -ml-1.5 absolute"
      :class="type === 'error' ? 'bg-red' : 'bg-green-100'"
    />
    <div class="flex-y-center pl-3 py-4 rounded-lg">
      <div class="relative shrink-0">
        <img :src="images[type]" alt="icon" class="w-6 h-6" />
      </div>
      <div class="ml-2">
        <h2 class="text-dark font-semibold text-xs leading-130">
          {{ title }}
        </h2>
      </div>
    </div>

    <svg
      class="shrink-0 cursor-pointer group"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.16748 4.1665L15.8334 15.8324"
        stroke="#8E9BA8"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="transition-300 group-hover:stroke-red"
      />
      <path
        d="M4.16664 15.8324L15.8325 4.1665"
        stroke="#8E9BA8"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="transition-300 group-hover:stroke-red"
      />
    </svg>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
}
defineProps<Props>()
const images = computed(() => {
  return {
    success: '/images/toast/success.svg',
    error: '/images/toast/error.svg',
  }
})
</script>
<style>
.toast {
  box-shadow: 0 8px 20px rgba(18, 28, 37, 0.16);
}
</style>
