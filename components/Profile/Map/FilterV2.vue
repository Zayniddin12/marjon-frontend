<script setup lang="ts">
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'

import type { ICarTrackModified } from '~/types/car'

interface Props {
  cars: ICarTrackModified[]
  activeCar: ICarTrackModified
  selectedCars: ICarTrackModified[]
  focusCarId: number
  isSelecting: boolean
}
const props = defineProps<Props>()

interface Emits {
  (
    event: 'filterChanged',
    data: {
      region_name: string | undefined
      car: string | undefined
      start_date: string | undefined
      end_date: string | undefined
      order_id: string | undefined
    }
  ): void
  (event: 'select-car', data: ICarTrackModified): void
}
const emit = defineEmits<Emits>()

const { t } = useI18n()

const route = useRoute()

const { width } = useWindowSize()

const { updateQuery, updateQueryParams } = useQueryChange()

const showFilter = ref(width.value >= 1280)

const { data: carTypeList } = await useAsyncData('carTypeList', () =>
  useApi().$get('cars/CarLogTrackList/CarTypeList/')
)

const carTypes = computed(() => {
  return [
    {
      name: t('all_types'),
      id: undefined,
    },
    ...carTypeList.value.map((item) => {
      return {
        ...item,
        id: item.id.toString(),
      }
    }),
  ]
})

const { data: regionList } = await useAsyncData('regionList', () =>
  useApi().$get('cars/CarLogTrackList/RegionsList/')
)

const regions = computed(() => {
  return [
    {
      text: t('all_regions'),
      value: undefined,
    },
    ...regionList.value.map((item) => {
      return {
        text: item,
        value: item,
      }
    }),
  ]
})

const { data: contractList } = await useAsyncData('contractList', () =>
  useApi().$get('contracts/CompanyContractList/')
)

const contracts = computed(() => {
  return [
    {
      label: t('all_deals'),
      id: undefined,
    },
    ...contractList.value.results.map((item) => {
      return {
        label: `${t('deal')} №${item?.id}`,
        id: item.id.toString(),
      }
    }),
  ]
})

const params = reactive({
  region_name: route.query.region_name,
  car: route?.query?.car?.toString(),
  start_date: route.query.start_date
    ? dayjs(route.query.start_date).format('DD.MM.YYYY')
    : undefined,
  end_date: route.query.end_date
    ? dayjs(route.query.end_date).format('DD.MM.YYYY')
    : undefined,
  order_id: route.query.order_id,
})

const submitFilter = () => {
  const data = { ...params }
  if (data.start_date) data.start_date = formatDate(data.start_date)
  if (data.end_date) data.end_date = formatDate(data.end_date)
  // updateQuery(data)
  for (const key in data) {
    updateQuery(key, data[key])
  }
  emit('filterChanged', data)
}

function formatDate(date: string) {
  const formattedDate = date.split('.')
  return dayjs(
    `${formattedDate[1]}.${formattedDate[0]}.${formattedDate[2]}`
  ).format('YYYY-MM-DD')
}

const clearFilter = () => {
  params.region_name = undefined
  params.car = undefined
  params.start_date = undefined
  params.end_date = undefined
  params.order_id = undefined
  submitFilter()
}

const isValidFilter = computed(
  () =>
    !!params.region_name ||
    !!params.order_id ||
    !!params.car ||
    !!params.start_date ||
    !!params.end_date
)

const targetElements = ref([])
watch(
  () => props.focusCarId,
  (id: number) => {
    const index = props.cars.findIndex((car) => car.car_id === id)
    if (index !== -1 && targetElements.value[index]) {
      targetElements.value[index].scrollIntoView({ behavior: 'smooth' })
    }
  }
)

const onCarSelectHandler = (item: ICarTrackModified) => {
  if (item.distance_covered) {
    updateQueryParams({
      car_id: item.car_id,
      ll: item.last_location.lon + ',' + item.last_location.lat,
      z: 9,
    })
    emit('select-car', item)
  }
}

onMounted(() => {
  const car = props.cars.find((el) => el.car_id === Number(route.query.car_id))
  if (car?.last_location) {
    emit(
      'select-car',
      props.cars.find((el) => el.car_id === Number(route.query.car_id))
    )
  }
})
</script>

<template>
  <div>
    <transition name="fade">
      <button
        v-if="!showFilter"
        class="absolute left-4 top-4 z-10 bg-white w-8 h-8 flex-center rounded-md shadow xl:hidden"
        @click="showFilter = !showFilter"
      >
        <i class="icon-filter text-dark text-xl leading-5"></i>
      </button>
    </transition>
    <transition name="filter">
      <div
        v-if="showFilter"
        class="absolute max-sm:max-h-[100vh] overflow-y-auto py-5 inset-0 max-sm:p-4 sm:left-6 xl:left-16 sm:top-6 max-w-[424px] z-10 max-sm:backdrop-blur"
      >
        <div
          class="rounded-md sm:rounded-2xl bg-white border border-gray-200 map-filter-shadow"
        >
          <div
            class="px-3 sm:px-5 py-2 sm:py-4 border-b border-gray flex-center-between"
          >
            <h1 class="text-lg sm:text-xl font-bold leading-130 text-dark">
              {{ $t('filter') }}
            </h1>
            <div class="flex-y-center gap-2">
              <button
                class="text-sm sm:text-base leading-130 font-normal text-gray-100 hover:text-purple-100 transition-300"
                @click="clearFilter"
              >
                {{ $t('clear') }}
              </button>
              <button
                class="icon-close text-xl leading-5 text-dark xl:hidden"
                @click="showFilter = false"
              ></button>
            </div>
          </div>
          <div class="p-2.5 sm:p-5 pt-2 sm:pt-4">
            <FormGroup :label="$t('cars')">
              <FormSelect
                v-model="params.car"
                label-key="name"
                value-key="id"
                :options="carTypes"
                :placeholder="$t('choose_type_of_car')"
              />
            </FormGroup>
            <FormGroup :label="$t('select_duration')" class="my-2 sm:my-4">
              <div class="flex gap-2 sm:gap-4 max-sm:flex-col">
                <FormDatePicker
                  v-model="params.start_date"
                  position="left"
                  :end-date="
                    params.end_date
                      ? dayjs(params.end_date).format('YYYY.DD.MM')
                      : dayjs(new Date()).format('YYYY.DD.MM')
                  "
                  class="w-full"
                />
                <FormDatePicker
                  v-model="params.end_date"
                  :start-date="
                    params.start_date
                      ? dayjs(params.start_date).format('YYYY.DD.MM')
                      : undefined
                  "
                  position="right"
                  class="w-full"
                />
              </div>
            </FormGroup>
            <FormGroup :label="$t('choose_location')">
              <FormSelect
                v-model="params.region_name"
                :options="regions"
                label-key="text"
                value-key="value"
                :placeholder="$t('choose_location')"
              />
            </FormGroup>
            <FormGroup :label="$t('deals')" class="mt-2 sm:mt-4 mb-2">
              <FormSelect
                v-model="params.order_id"
                value-key="id"
                label-key="label"
                :options="contracts"
                :placeholder="$t('choose_deal')"
              />
            </FormGroup>
            <CommonButton
              class="w-full"
              :text="$t('apply')"
              @click="submitFilter"
            />
          </div>
        </div>
        <div
          v-if="cars?.length"
          class="rounded-md sm:rounded-xl bg-white border border-gray-200 map-filter-shadow mt-3 sm:mt-5"
        >
          <div
            class="px-2 sm:px-4 py-1.5 sm:py-3 border-b border-gray flex-y-center gap-2"
          >
            <i
              class="w-7 h-7 icon-info text-xl leading-5 text-[#FFA235] bg-[#FFA235]/10 rounded-full flex-center"
            ></i>
            <h1 class="text-base font-bold leading-130 text-dark">
              {{ $t('transports') }}
            </h1>
          </div>
          <div
            class="p-4 overflow-y-auto max-h-52 pt-2 flex flex-col gap-3 cursor-pointer"
          >
            <div
              v-for="(item, index) in cars"
              :key="index"
              ref="targetElements"
              class="flex-center-between px-2 py-1.5 bg-gray-200 rounded-lg transition-all duration-300 border border-solid"
              :style="{
                borderColor:
                  activeCar?.car_id === item.car_id
                    ? item.color
                    : 'transparent',
              }"
              @click="onCarSelectHandler(item)"
            >
              <div class="flex-y-center gap-1.5">
                <ProfileMapCarColor :item />
                <ProfileDealsCardPlate
                  size="sm"
                  v-bind="{
                    plate: item?.state_number
                      ?.substring(2)
                      .replace(/(\d)([a-zA-Z])/g, '$1 $2'),
                    series: item?.state_number?.substring(0, 2),
                  }"
                />
                <span class="w-1 h-1 rounded-full bg-gray-400"></span>
                <p class="text-sm leading-normal font-semibold text-dark">
                  {{ item?.car_name?.title }} {{ item?.car_model?.title }}
                </p>
              </div>
              <p class="text-sm leading-normal font-semibold text-dark">
                {{ formatNumberSpace(item?.distance_covered) }} km
              </p>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.map-filter-shadow {
  box-shadow: 0 27px 71px 0 rgba(28, 78, 66, 0.03),
    0 -2.353px 54.828px 0 rgba(28, 78, 66, 0.02),
    0 -4.354px 31.545px 0 rgba(28, 78, 66, 0.01),
    0 -2.42px 8.124px 0 rgba(28, 78, 66, 0.01),
    0 -0.586px 1.043px 0 rgba(28, 78, 66, 0), 0 0.278px 0 0 rgba(28, 78, 66, 0);
}

.filter-enter-active,
.filter-leave-active {
  transition: all 0.4s ease;
}
.filter-enter-from,
.filter-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
</style>
