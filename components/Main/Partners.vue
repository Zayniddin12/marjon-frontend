<template>
  <div class="py-8 md:py-16 bg-purple linear-purple relative overflow-hidden">
    <div class="container">
      <CommonSection title-class="text-white" :title="$t('our_trust')" />

      <div
        class="mt-12 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        <a
          v-for="(partner, i) in partners"
          :key="i"
          rel="nofollow"
          :href="partner?.url"
          class="h-[160px] group hover:bg-white/20 rounded-20 flex-center transition-300"
          target="_blank"
        >
          <img
            :src="partner?.logo"
            alt="commeta"
            class="w-full h-full object-contain"
          />
        </a>
      </div>
    </div>
    <img
      src="/images/svg/logo/logo-outline.svg"
      alt="logo"
      class="absolute bottom-4 min-w-[1800px] pointer-events-none left-[10%]"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  partners: {
    title: string
    url: string
    logo: string
  }[]
}

defineProps<Props>()
</script>
