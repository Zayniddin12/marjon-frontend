<template>
  <div class="relative w-full h-full">
    <img
        :src="image"
      alt="yandex"
      class="w-full h-full object-cover absolute left-[25.4%] top-[14%] max-w-[36%] max-h-[45%]"
    />
    <img
      src="/images/fake/vehicles/labo.png"
      alt="truck"
      class="w-full h-full object-contain"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  image: string
}

defineProps<Props>()
</script>

<style scoped></style>
