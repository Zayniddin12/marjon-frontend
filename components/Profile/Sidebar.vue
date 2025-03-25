<template>
  <div
    class="header-shadow-white bg-white rounded-20 border border-white/[12%] p-2"
  >
    <NuxtLinkLocale
      v-for="(link, index) in links"
      :key="index"
      :to="link?.link"
      class="flex-y-center gap-2 p-3 hover:bg-green/10 transition-300 rounded-xl cursor-pointer group"
      :class="{ 'hover:!bg-red/10': link?.emit === 'log-out' }"
      exact-active-class="!bg-green/10 profile-active-route"
      @click="$emit(link?.emit)"
    >
      <i
        :class="[
          link?.icon,
          { '!text-red': link?.emit === 'log-out' },
          { '!text-green': link?.emit === 'login' },
        ]"
        class="text-2xl text-gray-100 group-hover:text-green transition-300"
      />
      <p
        class="text-sm leading-normal font-semibold text-dark group-hover:!text-dark transition-300"
        :class="[
          { '!text-red': link?.emit === 'log-out' },
          { '!text-green': link?.emit === 'login' },
        ]"
      >
        {{ $t(link?.name) }}
      </p>
    </NuxtLinkLocale>
  </div>
</template>

<script setup lang="ts">
interface Props {
  links: {
    id: number
    name: string
    icon: string
    link: string
    emit: string
  }[]
}

defineProps<Props>()
</script>
<style scoped>
.profile-active-route i {
  color: #59debe;
}
</style>
