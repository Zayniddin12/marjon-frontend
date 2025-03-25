<template>
  <div class="container text-center">
    <CommonSectionTitle :class="titleClass" v-bind="{ title }" />
    <p v-if="subtitle" class="text-base leading-130 mt-1 text-gray-100">
      {{ subtitle }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  subtitle?: string
  titleClass?: string
  isAbout?: boolean
}

defineProps<Props>()
</script>
