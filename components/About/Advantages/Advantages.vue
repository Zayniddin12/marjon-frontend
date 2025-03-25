<template>
  <div class="py-8 md:py-16 bg-white">
    <div class="container">
      <CommonSection :title="$t('why_us')" :subtitle="$t('why_us_text')" />

      <div class="mt-[72px] grid md:grid-cols-2 gap-x-6 gap-y-[54px]">
        <AboutAdvantagesCard
          v-for="(card, index) in advantages"
          :key="index"
          v-bind="{ card }"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {IAboutAdvantage} from '~/types/common'

interface Props {
  advantages: IAboutAdvantage[]
}

defineProps<Props>()
</script>
