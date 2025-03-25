<template>
  <div class="relative w-full h-full">
    <img
        src="/images/fake/vehicles/van/vanTire.webp"
        alt="yandex"
        class=" z-40 h-[53%] left-[16.1%] top-[45.3%] absolute"
    />
    <img
      :src="image"
      alt="yandex"
      class=" z-20 object-cover absolute max-w-[100%] max-h-[100%] h-[66%] w-[25.5%] top-[7%] left-[17.5%]"
    />
    <img
        src="/images/fake/vehicles/van/van.webp"
      alt="Van"
      class="w-full h-full object-contain z-10"
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
