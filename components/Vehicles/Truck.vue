<template>
  <div class="relative w-full h-full">
    <img
      :src="image"
      alt="yandex"
      class="w-full h-full object-cover absolute left-[7.4%] top-[10%] max-w-[65.4%] max-h-[42%]"
    />
    <img
        src="/images/fake/vehicles/truck.png"
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
