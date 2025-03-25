<template>
  <div
    class="w-6 h-6 border border-white/60 rounded-md hover:border-white flex-center transition-300 cursor-pointer"
    :class="[
      { 'bg-white border-white': checked },
      { '!border-red !bg-red/5': error },
    ]"
  >
    <i
      class="icon-tick opacity-0 transition-300"
      :class="[{ 'opacity-100': checked }]"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  checked: boolean
  error?: boolean
}

defineProps<Props>()
</script>
<style scoped></style>
