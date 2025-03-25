<template>
  <div class="py-[18px] linear-sharh-blue flex-center max-sm:flex-col gap-4">
    <i18n-t
      keypath="rating_text"
      tag="p"
      class="text-sm leading-130 text-white flex-y-center gap-2"
    >
      <template #rate>
        <div class="flex-y-center gap-[3px]">
          <CommonElementsStar v-for="i in 5" :key="i" />
        </div>
      </template>
    </i18n-t>
    <img src="/images/svg/logo/sharh.svg" alt="sharh-logo" />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.linear-sharh-blue {
  background: linear-gradient(90deg, #4489f7 3.61%, #022f5e 107.57%);
}
</style>
