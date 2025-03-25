<template>
  <div class="pb-6">
    <div class="flex-y-center gap-1">
      <NuxtLinkLocale
        v-if="isMobile || isTablet"
        to="/profile"
        class="icon-chevron text-2xl text-dark font-bold rotate-90"
      />
      <p class="text-2xl leading-130 font-bold text-dark">
        {{ $t('deals') }}
      </p>
    </div>
    <div class="my-6">
      <div class="flex flex-row justify-between">
        <CommonTab
          v-model="tab"
          :list="tabList"
          class="max-lg:w-full"
          item-class="max-lg:w-full"
        />
        <CommonButton
          v-if="getListLength"
          icon="icon-map text-2xl"
          variant="secondary"
          icon-position="right"
          :text="$t('show_in_map')"
          @click="router.push('/map')"
        />
      </div>

      <div class="mt-6">
        <Transition name="fade" mode="out-in">
          <div :key="tab">
            <ProfileTransactionTabActive
              v-if="tab === 'active'"
              @list-fetched="getList"
            />
            <ProfileTransactionTabFinished
              v-if="tab === 'completed'"
              :list="activeData"
            />
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { isMobile, isTablet } = useDevice()
const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const list = ref([])

// Tab
const tab = ref(route.query?.type || 'active')

const getList = (data: any) => {
  list.value = data || []
}
const getListLength = computed(() => !!list.value.length)

watch(
  () => tab.value,
  (value) => {
    router.push({
      name: 'profile-deals',
      query: {
        type: value,
      },
    })
  }
)

const tabList = [
  {
    label: t('active_transaction'),
    value: 'active',
  },
  {
    label: t('completed_transaction'),
    value: 'completed',
  },
]

// fake

const activeData = [
  {
    id: 1,
    date: '2021-08-01',
    paid_date: '2021-08-01',
    vehicle: {
      id: 1,
      type: 'truck',
      name: 'Фургон',
      count: 12,
      side: 'Правый бок',
    },
    regions: [
      {
        id: 1,
        name: 'Фергана',
      },
      {
        id: 2,
        name: 'Самарканд',
      },
    ],
    paid_amount: 7777777,
    left_amount: 5000000,
  },
  {
    id: 1,
    date: '2021-08-01',
    paid_date: '2021-08-01',
    vehicle: {
      id: 1,
      type: 'truck',
      name: 'Фургон',
      count: 12,
      side: 'Правый бок',
    },
    regions: [
      {
        id: 1,
        name: 'Фергана',
      },
      {
        id: 2,
        name: 'Самарканд',
      },
    ],
    paid_amount: 0,
    left_amount: 0,
  },
]
</script>
