<template>
  <div class="h-screen flex-center">
    <ClientOnly>
      <Leaflet />
    </ClientOnly>
  </div>
</template>
<script setup lang="ts">
import Leaflet from '~/components/Leaflet.vue'
</script>
