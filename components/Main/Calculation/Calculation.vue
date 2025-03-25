<template>
  <div id="calculator" class="py-8 md:py-16">
    <div class="container">
      <CommonSection
        class="!text-left"
        :title="$t('calculation')"
        :subtitle="$t('calculation_text')"
      />
      <div class="grid lg:grid-cols-12 mt-9 gap-6">
        <div class="lg:col-span-9 flex flex-col gap-6">
          <CommonCard class="w-full p-6">
            <p class="text-2xl leading-normal font-semibold text-dark">
              {{ $t('general_info') }}
            </p>
            <div class="mt-4">
              <MainCalculationSearchRegions
                :default-region="regions?.map((item) => item?.id)"
                @choose-region="regions.push($event)"
              />
              <div
                v-if="regions?.length"
                class="flex-y-center gap-2 flex-wrap mt-3"
              >
                <div
                  v-for="(region, index) in regions"
                  :key="index"
                  class="p-1 pl-2 rounded-md bg-gray-200 flex-y-center gap-2"
                >
                  <p class="text-xs leading-normal text-dark">
                    {{ region?.title }}
                  </p>
                  <button
                    class="w-[18px] h-[18px] rounded-full bg-gray flex-center group"
                    @click="removeRegion(index)"
                  >
                    <i
                      class="icon-close text-xs group-hover:text-red text-gray-100 transition-300"
                    />
                  </button>
                </div>
              </div>
              <FormGroup class="mt-6" :label="$t('choose_duration')">
                <div
                  class="flex-y-center max-md:flex-col max-md:items-start gap-4"
                >
                  <FormGroup :label="$t('from')" label-class="!font-normal">
                    <ClientOnly>
                      <FormDatePicker
                          id="startDate"
                        v-model="startDate"
                        :start-date="nextDay"
                        class="min-w-[270px]"
                      />
                    </ClientOnly>
                  </FormGroup>
                  <FormGroup :label="$t('to')" label-class="!font-normal">
                    <ClientOnly>
                      <FormDatePicker
                          id="endDate"
                        v-model="endDate"
                        :start-date="nextDay"
                        class="min-w-[270px]"
                      />
                    </ClientOnly>
                  </FormGroup>
                </div>
              </FormGroup>

              <div class="flex-y-center gap-1 mt-3">
                <i class="icon-info text-green text-xl" />
                <p class="text-[13px] leading-normal text-dark">
                  {{ $t('min_duration') }}
                </p>
              </div>
            </div>
          </CommonCard>
          <TransitionGroup name="page-change">
            <MainCalculationVehicle
              v-for="(car, index) in vehicles"
              :key="car?.id"
              v-bind="{ index, vehicleTypes, regions, car }"
              :chosen-types="formattedVehicles"
              @remove="removeVehicle(index)"
            />
          </TransitionGroup>
          <button
            v-if="vehicles?.length < vehicleTypes?.length"
            class="py-2.5 px-2 flex-center gap-2 border border-gray-400 border-dashed rounded-lg transition-300 active:scale-95 hover:bg-gray"
            @click="addVehicle"
          >
            <p class="text-base leading-5 font-semibold text-dark">
              {{ $t('add_vehicle') }}
            </p>
            <i class="icon-plus text-xl text-dark font-bold" />
          </button>
        </div>
        <div class="lg:col-span-3">
          <MainCalculationGraph :data="resultData" @submit="submit" />
        </div>
      </div>
    </div>
    <MainCalculationSuccess :show="showSuccess" @close="showSuccess = false" />
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'

import { useAuthStore } from '~/store/auth'
import type { ICalculation, IDefaultResponse } from '~/types/common'
import { debounce, formatDateRightOrder } from '~/utils'

const { handleError } = useErrorHandling()
const { t } = useI18n()
const { showToast } = useCustomToast()

const startDate = ref()
const endDate = ref()
const showSuccess = ref(false)
const nextDay = ref(new Date().setDate(new Date().getDate() + 1))

const vehicles = ref<any>([])
const formattedVehicles = computed(() =>
  vehicles.value.map((item: any) => item?.type)
)
const vehicleTypes = ref<any>([])
const authStore = useAuthStore()
const regions = ref([])
const resultData = ref<ICalculation>()
const formattedData = ref({
  start_date: '',
  end_date: '',
  regions: [],
})

function addVehicle() {
  if (regions.value?.length) {
    const chosenType = vehicleTypes.value.find(
      (el: any) => !formattedVehicles.value.includes(el?.id)
    )
    vehicles.value.push({
      id: Math.random().toString(36).substr(2, 9),
      sides: ['sides'],
      count: 0,
      // find index of not chosen vehicle index due to chosen types and vehicle types
      type: chosenType?.id,
      regions: [],
    })
  } else {
    showToast(t('choose_region'), 'error')
  }
}

function submit() {
  if (!authStore?.user?.id) {
    authStore.showAuth = true
  } else {
    formattedData.value.discount = resultData.value?.discount?.id || null
    formattedData.value.discount_price =
      resultData.value?.discount_price || null
    formattedData.value.total_amount = resultData.value?.total_amount
    useApi()
      .$post(`/contracts/OrderCreate/`, {
        body: formattedData.value,
      })
      .then(() => {
        showSuccess.value = true
        vehicles.value = []
        regions.value = []
        endDate.value = null
        startDate.value = null
        formattedData.value = {
          start_date: '',
          end_date: '',
        }
        resultData.value = {}
      })
      .catch((err) => {
        handleError(err)
      })
  }
}

function removeVehicle(index: number) {
  vehicles.value.splice(index, 1)
}

// Types

function getTypes() {
  useApi()
    .$get('/cars/CarsTypeList/')
    .then((res: IDefaultResponse) => {
      vehicleTypes.value = res?.results
    })
}

getTypes()

function removeRegion(index: number) {
  regions.value.splice(index, 1)
}

watch(
  () => vehicles.value,
  () => {
    formattedData.value = {
      start_date: startDate.value
        ? dayjs(formatDateRightOrder(startDate.value)).format('YYYY-MM-DD')
        : undefined,
      end_date: endDate.value
        ? dayjs(formatDateRightOrder(endDate.value)).format('YYYY-MM-DD')
        : undefined,
      regions: regions.value.map((region: any) => region?.id),
      cars: vehicles.value?.map((car: any) => ({
        type: car?.type,
        side: car?.sides,
        items: car?.regions?.map((region: any) => {
          return {
            region: region?.id,
            count: region?.count,
          }
        }),
      })),
    }
    debounce('fetch-calculation', () => getData(formattedData.value))
  },
  {
    deep: true,
  }
)

watch(
  () => [startDate.value, endDate.value],
  () => {
    formattedData.value.start_date = startDate.value
      ? dayjs(formatDateRightOrder(startDate.value)).format('YYYY-MM-DD')
      : undefined
    formattedData.value.end_date = endDate.value
      ? dayjs(formatDateRightOrder(endDate.value)).format('YYYY-MM-DD')
      : undefined

    debounce('fetch-calculation-in', () => getData(formattedData.value))
  }
)

watch(
  () => startDate.value,
  () => {
    if (!endDate.value && startDate.value) {
      //   calc next 6 month from start date
      endDate.value = dayjs(formatDateRightOrder(startDate.value))
        .add(6, 'month')
        .format('DD.MM.YYYY')
    } else endDate.value = null
  }
)

function getData(data: any) {
  if (regions.value?.length) {
    useApi()
      .$post('contracts/OrderCalculator/', {
        body: data,
      })
      .then((res) => {
        resultData.value = res
      })
      .catch((err) => {
        if (regions.value?.length && vehicles.value?.length) {
          // handleError(err)
        }
      })
  }
}

watch(
  () => regions.value.length,
  () => {
    formattedData.value.regions = regions.value.map((region: any) => region?.id)
    debounce('fetch-calculation', () => getData(formattedData.value))
  }
)
</script>
