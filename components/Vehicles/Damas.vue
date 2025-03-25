<template>
  <div class="relative w-full h-full">
    <img
      :src="image"
      alt="yandex"
      class="w-full h-full object-contain absolute car"
    />
    <img
      src="/images/fake/vehicles/damas.png"
      alt="damas"
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

<style>
.car {
  width: 300px; /* Adjust the width as needed */
  height: auto;
  background: #000;
  clip-path: polygon(
    0% 25%,
    /* Start at the top-left corner of the green border */ 5% 15%,
    /* First point along the top curve */ 25% 10%,
    /* Top left of the window */ 70% 10%,
    /* Top right of the window */ 95% 20%,
    /* Top right corner of green border */ 100% 80%,
    /* Bottom right corner of green border */ 0% 80%
      /* Bottom left corner of green border */
  );
}
</style>
