<template>
  <div class="pb-6">
    <div class="flex-y-center gap-1">
      <NuxtLinkLocale
        to="/profile/deals"
        class="icon-chevron text-2xl text-dark font-bold rotate-90"
      />
      <p class="text-2xl leading-130 font-bold text-dark">
        {{ $t('deal') }} №{{ single?.ordering }}
      </p>
    </div>
    <div
      class="p-6 rounded-20 bg-white mt-6 relative flex justify-between md:items-end max-md:flex-col max-md:gap-4"
    >
      <div class="flex flex-col gap-5">
        <FormGroup :label="$t('vehicle')">
          <div class="flex-y-center flex-wrap gap-3">
            <div
              v-for="(car, index) in single?.order_cars"
              :key="index"
              class="flex-y-center gap-2"
            >
              <div
                class="flex-y-center gap-2 p-2 pr-3 border border-white-100 rounded-md"
              >
                <p class="text-sm leading-130 text-dark">
                  {{ car?.type?.title }}<span class="text-green">x</span
                  >{{ car?.count }}
                </p>
              </div>
              <div
                v-for="(side, idx) in car?.sides"
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
              v-for="(region, index) in single?.locations"
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
              :amount="single?.paid_amount"
              :title="$t('paid')"
              class="w-[190px]"
            />
            <ProfileTransactionCardPayment
              :amount="single?.debt_amount"
              :title="$t('left_paid')"
              class="w-[190px]"
              is-minus
            />
          </div>
        </FormGroup>

        <div class="flex-y-center gap-2">
          <i class="icon-calendar text-2xl text-gray-100" />
          <p class="text-base text-dark leading-normal">
            {{ dayjs(single?.start_date).format('DD.MM.YYYY') }} -
            {{ dayjs(single?.end_date).format('DD.MM.YYYY') }}
          </p>
        </div>
      </div>
      <div v-if="single?.status === 'finished'">
        <img
          :src="`/images/svg/done-${$i18n?.locale}.svg`"
          alt="done"
          class="-rotate-45 w-[160px] h-[160px]"
        />
      </div>
    </div>

    <div class="mt-4">
      <div
        class="flex-center-between max-lg:flex-col max-lg:!items-start gap-4"
      >
        <p class="text-2xl leading-130 font-bold text-dark">
          {{ $t('photo_report') }}
        </p>

        <div class="flex-y-center max-sm:flex-col max-sm:items-start gap-3">
          <FormSelect
            v-model="filter.type"
            :placeholder="$t('choose_vehicle_type')"
            :options="types"
            class="min-w-[180px]"
            selected-option-styles="!border-gray"
            label-key="title"
            value-key="id"
          />
          <FormSelect
            v-model="filter.location"
            :placeholder="$t('choose_location')"
            :options="locations"
            class="min-w-[180px]"
            selected-option-styles="!border-gray"
            label-key="title"
            value-key="id"
          />
        </div>
      </div>
      <div v-if="single?.start_date" class="mt-5 mb-4 relative">
        <Swiper v-bind="settings" class="!pr-10 max-sm:!overflow-visible">
          <SwiperSlide
            v-for="(card, index) in monthList"
            :key="index"
            class="!w-max"
          >
            <div class="flex gap-2">
              <p
                v-if="card?.year"
                class="text-sm leading-normal font-bold text-gray-100"
              >
                {{ card?.year }}
              </p>
              <button
                class="text-sm leading-normal text-dark py-1.5 px-3 bg-gray rounded-full transition-300 hover:text-white hover:bg-purple-100"
                :class="{
                  'text-white bg-purple-100': filter.activeMonth === index,
                }"
                @click="chooseActiveMonth(index)"
              >
                {{ card?.name }}
              </button>
            </div>
          </SwiperSlide>
        </Swiper>
        <div
          class="linear-white-swiper h-10 w-10 absolute top-0 right-0 z-10 pointer-events-none max-sm:hidden"
        />
      </div>

      <Transition name="fade" mode="out-in">
        <div :key="loading" class="mt-4 grid md:grid-cols-2 gap-6">
          <template v-if="loading">
            <ProfileDealsCard
              v-for="(card, index) in 8"
              :key="index"
              v-bind="{ card }"
              loading
            />
          </template>
          <template v-if="!loading">
            <ProfileDealsCard
              v-for="(card, index) in vehicles"
              :key="index"
              v-bind="{ card }"
              @open="selectVehicle(card, $event)"
            />
          </template>
          <div
            v-if="!loading && !vehicles?.length"
            class="md:col-span-2 flex-center py-10"
          >
            <CommonNoData
              image="/images/svg/no-data/no-photos.svg"
              :title="$t('no_photos')"
              :subtitle="$t('no_photos_subtitle')"
              title-class="mt-3"
            />
          </div>
        </div>
      </Transition>
      <div v-if="paginationData?.total > vehicles?.length" class="p-5 pt-8">
        <CommonButton
          :text="$t('more')"
          icon="icon-arrow text-2xl font-bold"
          icon-position="right"
          class="w-full"
          variant="outline"
          :loading="buttonLoading"
          :disabled="buttonLoading"
          @click="loadMore"
        />
      </div>
    </div>
    <ProfileDealsGalleryModal
      :show="showGallery"
      :images="selectedVehicle?.photo_reports"
      :active="activeIndex"
      @close="showGallery = false"
    />
  </div>
</template>

<script setup lang="ts">
import 'swiper/css'

import dayjs from 'dayjs'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { useI18n } from 'vue-i18n'

import type { IDeal, IReport } from '~/types/common'

const settings = {
  slidesPerView: 'auto',
  spaceBetween: 8,
}

const route = useRoute()
const localLang = useI18n().locale.value

const { updateQuery } = useQueryChange()

const selectedVehicle = ref()
const activeIndex = ref(0)
const showGallery = ref(false)
const monthList = ref([])
const loading = ref(true)
const buttonLoading = ref(false)

const single = ref<IDeal>()

const filter = reactive({
  location: route.query.location ? +route.query.location : '',
  type: route.query.type ? +route.query.type : '',
  activeMonth: route.query?.active ? +route.query.active : '',
})

const paginationData = reactive({
  limit: 12,
  offset: 0,
  total: 0,
})

function selectVehicle(vehicle: any, active: number) {
  activeIndex.value = active
  selectedVehicle.value = vehicle
  showGallery.value = true
}

function loadMore() {
  buttonLoading.value = true
  paginationData.offset += paginationData.limit
  getVehicles(true)
}
// Single

function getSingle() {
  useApi()
    .$get(`contracts/CompanyContractDetail/${route.params.id}/`)
    .then((res: any) => {
      single.value = res
      monthList.value = generateMonthList(
        new Date(single?.value?.start_date),
        new Date(single?.value?.end_date)
      )
    })
}

getSingle()

// Single End

// Vehicles

const vehicles = ref<IReport[]>([])
const types = ref<any>([])
const locations = ref<any>([])

function getVehicles(merge?: boolean) {
  useApi()
    .$get(
      `contracts/CompanyContractDetail/${route.params.id}/PhotoReportList/`,
      {
        params: {
          limit: paginationData.limit,
          offset: paginationData.offset,
          car__type: route.query?.type || undefined,
          location: route.query?.location || undefined,
          year: route.query?.year || undefined,
          month: route.query?.month || undefined,
        },
      }
    )
    .then((res: any) => {
      paginationData.total = res?.count
      if (merge) {
        vehicles.value = [...vehicles.value, ...res?.results]
      } else {
        vehicles.value = res?.results
      }
    })
    .finally(() => {
      loading.value = false
      buttonLoading.value = false
    })
}

getVehicles()

function getCarTypes() {
  useApi()
    .$get(`contracts/CompanyContractDetail/${route.params.id}/CarTypeList/`, {
      params: {
        limit: 60,
      },
    })
    .then((res: any) => {
      types.value = [
        {
          id: '',
          title: t('all_types'),
        },
        ...res.results,
      ]
    })
}

function getLocations() {
  useApi()
    .$get(`contracts/CompanyContractDetail/${route.params.id}/RegionList/`, {
      params: {
        limit: 60,
      },
    })
    .then((res: any) => {
      locations.value = [
        {
          id: '',
          title: t('all_regions'),
        },
        ...res.results,
      ]
    })
}

getCarTypes()
getLocations()

watch(
  () => filter,
  async () => {
    await updateQuery(
      'type',
      typeof filter.type === 'object' ? undefined : filter.type
    )
    await updateQuery(
      'location',
      typeof filter.location === 'object' ? undefined : filter.location
    )

    await updateQuery(
      'active',
      typeof filter.activeMonth === 'object' ? undefined : filter.activeMonth
    )

    await updateQuery(
      'year',
      monthList.value?.[filter?.activeMonth]?.year_before || undefined
    )
    await updateQuery(
      'month',
      monthList.value?.[filter?.activeMonth]?.month || undefined
    )
    loading.value = true
    paginationData.total = 0
    paginationData.offset = 0
    await getVehicles()
  },
  {
    deep: true,
  }
)
// Vehicles End

// Cals Month

function generateMonthList(startDate: Date, endDate: Date) {
  const monthsRU = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ]
  const monthsUZ = [
    'Yanvar',
    'Fevral',
    'Mart',
    'Aprel',
    'May',
    'Iyun',
    'Iyul',
    'Avgust',
    'Sentyabr',
    'Oktyabr',
    'Noybar',
    'Dekabr',
  ]

  const startYear = startDate.getFullYear()
  const startMonth = startDate.getMonth() + 1 // Adding 1 because getMonth() is zero-based
  const currentYear = endDate.getFullYear()
  const currentMonth = endDate.getMonth() + 1

  const monthList = [] as any

  let year = startYear
  let month = startMonth
  while (
    year < currentYear ||
    (year === currentYear && month <= currentMonth)
  ) {
    if (localLang === 'uz') {
      monthList.push({
        month,
        name: monthsUZ[month - 1],
        year:
          monthList[monthList.length - 1]?.year_before !== year ? year : null,
        year_before: year,
      })
    } else {
      monthList.push({
        month,
        name: monthsRU[month - 1],
        year:
          monthList[monthList.length - 1]?.year_before !== year ? year : null,
        year_before: year,
      })
    }

    if (month === 12) {
      month = 1
      year++
    } else {
      month++
    }
  }

  return monthList
}

function chooseActiveMonth(month: any) {
  if (month === filter.activeMonth) {
    filter.activeMonth = ''
    return
  }
  filter.activeMonth = month
}
const { t } = useI18n()
</script>

<style scoped>
.linear-white-swiper {
  background: linear-gradient(270deg, #f6f5f7 0%, rgba(246, 245, 247, 0) 100%);
}
</style>
