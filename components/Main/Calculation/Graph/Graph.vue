<template>
  <CommonCard>
    <p class="p-4 text-xl leading-normal font-bold text-dark">
      {{ $t('count') }}
    </p>
    <div>
      <MainCalculationGraphCard
        v-for="(calculation, index) in data?.cars"
        :key="index"
        :car="calculation"
        :regions="data?.regions?.map((region) => region?.title)?.join(', ')"
        :discount="data?.discount"
        :start="data?.start_date"
        :end="data?.end_date"
      />
    </div>
    <div v-if="!data?.cars?.length && data?.regions?.length" class="px-4">
      <MainCalculationGraphLine
        :title="$t('regions')"
        :value="data?.regions.map((el) => el?.title)?.join(', ')"
        is-col
      />
    </div>
    <div
      v-if="data === undefined || Object.keys(data).length === 0"
      class="flex-center py-16"
    >
      {{ $t('no_data_yet') }}
    </div>
    <div v-else class="p-4 flex flex-col gap-4">
      <div
        v-if="data?.proposal"
        class="p-2 rounded-xl border border-green flex-y-center gap-1"
      >
        <i class="icon-info text-green text-xl" />
        <i18n-t
          keypath="discount_text"
          tag="p"
          class="text-xs leading-130 text-dark"
        >
          <template #percent
            ><span class="font-bold text-green"
              >{{ data.proposal.percent }}%</span
            ></template
          >
          <template #sum
            ><span>{{
              formatNumberSpace(data?.proposal.amount)
            }}</span></template
          >
        </i18n-t>
      </div>
      <div class="p-3 rounded-xl bg-gray-200">
        <p class="text-base font-normal text-dark leading-normal">
          {{ $t('total') }}
        </p>
        <p class="my-1 text-xl leading-normal text-dark font-bold">
          {{ formatNumberSpace(data?.discount_price) }} UZS
        </p>
        <p
          v-if="data?.discount"
          class="text-sm leading-normal text-gray-300 line-through"
        >
          {{ formatNumberSpace(data?.total_amount) }} UZS
        </p>
      </div>
      <CommonButton
        icon-position="right"
        icon="icon-rocket text-xl"
        :text="$t('book')"
        @click="$emit('submit')"
      />
    </div>
  </CommonCard>
</template>

<script setup lang="ts">
import type { ICalculation } from '~/types/common'

interface Props {
  data: ICalculation
}

defineProps<Props>()
</script>
