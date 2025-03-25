<template>
  <div class="relative w-full h-full">
    <img
        src="/images/fake/vehicles/malibu/MalibuTire.webp"
        alt="yandex"
        class=" z-40 h-[54.5%] left-[8%] top-[45.5%] absolute"
    />
    <img
      :src="image"
      alt="yandex"
      class="rotate-[2deg] z-20 h-full object-cover absolute left-[5%] top-[39%] w-[67%] max-h-[43%]"
    />
    <img
        src="/images/fake/vehicles/malibu/malibu.webp"
      alt="Malibu"
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
