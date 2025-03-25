<template>
  <div class="pb-6">
    <div class="flex-y-center gap-1">
      <NuxtLinkLocale
        v-if="isMobile || isTablet"
        to="/profile"
        class="icon-chevron text-2xl text-dark font-bold rotate-90"
      />
      <p class="text-2xl leading-130 font-bold text-dark">
        {{ $t('transactions') }}
      </p>
    </div>
    <CommonNoData
      v-if="!loading && !transactions?.length"
      image="/images/svg/no-data/no-transactions.svg"
      :title="$t('no_transactions')"
      :subtitle="$t('no_transactions_subtitle')"
    />
    <div
      v-if="transactions?.length"
      class="max-w-[453px] bg-white rounded-20 header-shadow-white p-5 mt-6 gap-4 flex flex-col"
    >
      <TransitionGroup name="fade">
        <div
          v-for="(transaction, index) in transactions"
          :key="transaction?.id"
          class="p-3 border border-white-100 rounded-xl flex justify-between items-end"
        >
          <div class="flex flex-col gap-2">
            <p class="text-base font-semibold text-red leading-normal">
              -{{ formatMoneyDecimal(transaction?.amount) }}
            </p>
            <p class="text-sm leading-normal text-dark">
              {{ $t('deal') }} №{{ transaction?.order?.id }}
            </p>
          </div>
          <p class="text-sm leading-normal text-dark lowercase">
            {{ dayjs(transaction?.date).format('DD.MM.YYYY') }} {{ $t('year') }}
          </p>
        </div>
      </TransitionGroup>
      <CommonButton
        v-if="total > transactions.length"
        variant="outline"
        icon="icon-chevron"
        :text="$t('fetch_more')"
        :loading="buttonLoading"
        @click="loadMore"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

import type { ITransaction } from '~/types/common'
import { formatMoneyDecimal } from '~/utils'

const { isMobile, isTablet } = useDevice()

const transactions = ref<ITransaction[]>([])
const buttonLoading = ref(false)
const total = ref(0)
const loading = ref(true)

definePageMeta({
  middleware: ['auth'],
})

function getTransactions() {
  useApi()
    .$get('contracts/ContractPaymentList/', {
      params: {
        limit: 12,
      },
    })
    .then((res: any) => {
      total.value = res?.count
      transactions.value = res.results
    })
    .finally(() => (loading.value = false))
}

getTransactions()

function loadMore() {
  buttonLoading.value = true
  useApi()
    .$get('contracts/ContractPaymentList/', {
      params: {
        limit: 1,
        offset: transactions.value.length,
      },
    })
    .then((res: any) => {
      total.value = res?.count
      transactions.value = [...transactions.value, ...res.results]
      buttonLoading.value = false
    })
}
</script>
