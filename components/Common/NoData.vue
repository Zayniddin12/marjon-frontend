<template>
  <div class="py-16">
    <img :src="image" alt="no-deals" class="mx-auto" />
    <p
      class="text-xl leading-130 font-semibold text-dark text-center -mt-3"
      :class="titleClass"
    >
      {{ title }}
    </p>
    <p class="mt-2 text-gray-100 text-sm leading-130 text-center">
      {{ subtitle }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  subtitle: string
  image: string
  titleClass?: string
}

defineProps<Props>()
</script>
