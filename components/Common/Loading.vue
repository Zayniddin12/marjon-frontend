<template>
  <div
    class="flex flex-center fixed inset-0 w-full h-screen linear-purple z-50"
  >
    <CommonLogo variant="dark" />
    <div class="absolute-x bottom-16">
      <div class="spinner" />
    </div>
  </div>
</template>

<style scoped>
.spinner {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #59debe;
  -webkit-mask: repeating-conic-gradient(
      #0000 0deg,
      #000 1deg 70deg,
      #0000 71deg 90deg
    ),
    radial-gradient(
      farthest-side,
      #0000 calc(100% - 7.2px),
      #000 calc(100% - 6.4px)
    );
  -webkit-mask-composite: destination-in;
  mask-composite: intersect;
  animation: spinner-mv2oco 1s infinite;
}

@keyframes spinner-mv2oco {
  to {
    transform: rotate(0.5turn);
  }
}
</style>
