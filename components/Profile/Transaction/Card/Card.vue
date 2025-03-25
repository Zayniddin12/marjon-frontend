<template>
  <div
    class="bg-white header-shadow-white rounded-20 flex flex-col justify-between"
  >
    <div>
      <div class="p-5 flex-center-between">
        <p class="text-xl leading-normal font-bold text-purple-100">
          {{ $t('deal') }} №{{ card?.ordering }}
        </p>
        <p class="text-sm leading-normal text-dark">
          {{ dayjs(card?.start_date).format('DD.MM.YYYY') }} -
          {{ dayjs(card?.end_date).format('DD.MM.YYYY') }}
        </p>
      </div>
      <div class="relative px-5 flex flex-col gap-3">
        <FormGroup :label="$t('vehicle')">
          <div class="flex-y-center flex-wrap gap-2">
            <div
              v-for="(vehicle, index) in card?.order_cars"
              :key="index"
              class="flex-y-center gap-2 flex-wrap"
            >
              <div
                class="flex-y-center gap-2 p-2 pr-3 border border-white-100 rounded-md"
              >
                <p class="text-sm leading-130 text-dark">
                  {{ vehicle?.type?.title }}<span class="text-green">x</span
                  >{{ vehicle?.count }}
                </p>
              </div>
              <div
                v-for="(side, idx) in vehicle?.sides"
                :key="idx"
                class="flex-y-center gap-2 p-2 pr-3 border border-white-100 rounded-md"
              >
                <p class="text-sm leading-130 text-dark">
                  {{ side }}
                </p>
              </div>
            </div>
          </div>
        </FormGroup>
        <FormGroup :label="$t('locations')">
          <div class="flex-y-center flex-wrap gap-2">
            <div
              v-for="(region, index) in card?.locations"
              :key="index"
              class="flex-y-center gap-2 p-2 pr-3 bg-white-100 rounded-md"
            >
              <p class="text-sm leading-130 text-dark">
                {{ region?.title }}
              </p>
            </div>
          </div>
        </FormGroup>
        <FormGroup :label="$t('payment')">
          <div class="flex-y-center gap-3">
            <ProfileTransactionCardPayment
              :amount="card?.paid_amount"
              :title="$t('paid')"
              class="w-full"
            />
            <ProfileTransactionCardPayment
              :amount="card?.debt_amount"
              :title="$t('left_paid')"
              class="w-full"
              is-minus
            />
          </div>
        </FormGroup>
        <div
          v-if="isFinished"
          class="w-full h-full absolute inset-0 flex-center bg-white/70"
        >
          <img
            :src="`/images/svg/done-${$i18n?.locale}.svg`"
            alt="done"
            class="-rotate-45"
          />
        </div>
      </div>
    </div>
    <div class="p-5 pt-8">
      <NuxtLinkLocale class="w-full" :to="`/profile/deals/${card?.id}`">
        <CommonButton
          :text="$t('more')"
          icon="icon-arrow text-2xl font-bold"
          icon-position="right"
          class="w-full"
          variant="outline"
        />
      </NuxtLinkLocale>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

import type { IDeal } from '~/types/common'

interface Props {
  card: IDeal
  isFinished?: boolean
}

defineProps<Props>()
</script>
