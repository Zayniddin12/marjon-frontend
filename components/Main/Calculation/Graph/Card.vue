<template>
  <div
    class="pb-4 border-b border-gray-200 last:border-b-0 last:pb-0 pt-4 first:pt-0"
  >
    <div class="flex flex-col gap-4 px-4">
      <p class="text-sm leading-normal font-semibold text-dark">
        {{ car?.type }}
        <span v-if="car?.total_amount"
          >- {{ formatNumberSpace(car?.total_amount) }} UZS</span
        >
      </p>
      <MainCalculationGraphLine v-if="car?.count" :title="$t('amount')">
        <p class="text-xs leading-normal font-semibold text-dark">
          <span class="text-green">x</span>{{ car?.count }}
        </p>
      </MainCalculationGraphLine>
      <MainCalculationGraphLine
        v-if="car?.amount"
        :title="$t('price_for_one')"
        :value="`${formatNumberSpace(car?.amount)} UZS`"
      />
      <MainCalculationGraphLine
        v-if="car?.side?.length"
        :title="$t('sides')"
        :value="car?.side?.map((el) => el?.title)?.join(', ')"
      />
    </div>
    <div class="w-full my-4 bg-gray-200 h-px ml-4" />
    <div class="flex flex-col gap-4 px-4">
      <MainCalculationGraphLine
        v-if="start"
        :title="$t('period')"
        :value="`${dayjs(start).format('DD.MM.YYYY')} - ${dayjs(end).format(
          'DD.MM.YYYY'
        )}`"
      />
      <MainCalculationGraphLine
        :title="$t('regions')"
        :value="regions"
        is-col
      />
      <MainCalculationGraphLine v-if="discount" :title="$t('discount')">
        <p class="text-xs leading-normal font-semibold text-red">
          {{ discount?.percent }}%
        </p>
      </MainCalculationGraphLine>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

import type { ICar } from '~/types/common'

interface Props {
  car: ICar
  regions: string
  discount?: number
  start: string
  end: string
}

defineProps<Props>()
</script>
