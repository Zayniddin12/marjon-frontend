<template>
  <p class="text-[40px] leading-130 font-bold text-dark">{{ title }}</p>
</template>

<script setup lang="ts">
interface Props {
  title: string
}

defineProps<Props>()
</script>
