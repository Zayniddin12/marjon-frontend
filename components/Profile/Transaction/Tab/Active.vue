<template>
  <div>
    <div class="grid md:grid-cols-2 gap-6">
      <ProfileTransactionCard
        v-for="(card, index) in list"
        :key="index"
        v-bind="{ card }"
      />
    </div>
    <CommonNoData
      v-if="!loading && !list?.length"
      image="/images/svg/no-data/no-deals.svg"
      :title="$t('no_active_deals')"
      :subtitle="$t('no_active_deals_subtitle')"
    />
    <div
      v-if="paginationData?.total > list?.length && !loading"
      class="flex-center mt-4"
    >
      <CommonButton
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
interface Emits {
  (event: 'listFetched', data: any): void
}

const emit = defineEmits<Emits>()

const list = ref([])
const loading = ref(false)
const buttonLoading = ref(false)
const paginationData = reactive({
  total: 0,
  offset: 0,
  limit: 1,
})

function getList(merge?: boolean) {
  useApi()
    .$get('contracts/CompanyContractList/', {
      params: {
        status: 'inprogress',
        limit: paginationData.limit,
        offset: paginationData.offset,
      },
    })
    .then((res: any) => {
      paginationData.total = res?.count
      if (merge) {
        list.value = [...list.value, ...res?.results]
        emit('listFetched', list.value)
      } else {
        list.value = res?.results
        emit('listFetched', list.value)
      }
    })
    .finally(() => {
      buttonLoading.value = false
      loading.value = false
    })
}

getList()

function loadMore() {
  buttonLoading.value = true
  paginationData.offset += paginationData.limit
  getList(true)
}
</script>
