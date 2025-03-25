<template>
  <div class="flex items-center justify-center h-16">
    <div class="spinner"></div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  loading?: boolean
}
defineProps<Props>()
</script>

<style scoped>
.spinner {
  width: 11.2px;
  height: 11.2px;
  border-radius: 11.2px;
  box-shadow: 28px 0 0 0 rgba(24, 159, 255, 0.2),
  22.7px 16.5px 0 0 rgba(24, 159, 255, 0.4),
  8.68px 26.6px 0 0 rgba(24, 159, 255, 0.6),
  -8.68px 26.6px 0 0 rgba(24, 159, 255, 0.8), -22.7px 16.5px 0 0 #189fff;
  animation: spinner-b87k6z 1s infinite linear;
}

@keyframes spinner-b87k6z {
  from {
    transform: rotate(0deg) scale(0.4);
  }
  to {
    transform: rotate(360deg) scale(0.4);
  }
}
</style>
