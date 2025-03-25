<template>
  <CommonCard class="p-6 w-full">
    <div class="flex justify-between gap-3">
      <p class="text-2xl leading-normal font-semibold text-dark">
        {{ $t('vehicle_title') }}
      </p>
      <button
        v-if="index > 0"
        class="flex-center icon-close w-10 h-10 bg-gray-200 rounded-full text-2xl font-bold hover:text-red transition-300 text-gray-100"
        @click="$emit('remove')"
      />
    </div>
    <div class="mt-4 flex flex-col gap-6">
      <FormGroup :label="$t('choose_vehicle_type')">
        <div class="flex-y-center gap-3 flex-wrap">
          <button
            v-for="(vehicle, idx) in vehicleTypes"
            :key="idx"
            class="py-2 pl-2.5 pr-4 border border-white-100 rounded-xl hover:border-green transition-300 flex-y-center gap-2"
            :class="[
              { '!border-green vehicle-shadow': activeVehicle === idx },
              {
                'opacity-50 pointer-events-none':
                  chosenTypes.includes(vehicle?.id) && activeVehicle !== idx,
              },
            ]"
            @click="activeVehicle = idx"
          >
            <img
              :src="vehicle?.image"
              alt="vehicle-image"
              class="w-8 h-8 object-contain"
            />
            <p class="text-sm font-semibold text-dark">{{ vehicle?.title }}</p>
          </button>
        </div>
      </FormGroup>
      <FormGroup :label="$t('choose_side')">
        <div class="grid grid-cols-2 sm:flex items-center gap-4 flex-wrap">
          <MainCalculationCheckbox
            v-for="(item, idx) in vehicleTypes[activeVehicle]?.type_sides"
            :key="idx"
            class="max-sm:!w-full"
            v-bind="{ item }"
            :checked="car.sides?.includes(item?.side)"
            @click="changeId(item?.side)"
          />
        </div>
      </FormGroup>
      <FormGroup
        v-if="regions?.length"
        :label="$t('distribution_by_selected_regions')"
      >
        <div class="grid md:grid-cols-2 gap-x-5 gap-y-3">
          <div
            v-for="(item, idx) in car?.regions"
            :key="item?.id"
            class="p-3 bg-white border border-gray-200 rounded-xl flex-center-between gap-2"
          >
            <div>
              <p class="text-sm leading-normal font-normal text-dark">
                {{ idx + 1 }}. {{ item?.title }}
              </p>
              <p
                class="text-xs leading-normal font-normal text-gray-100"
                :class="{ '!text-red': !item?.cars_count }"
              >
                {{ $t('available') }} - {{ item?.cars_count }}
              </p>
            </div>

            <ClientOnly>
              <MainCalculationCounter
                :key="activeVehicle"
                v-model="item.count"
                readonly
                :disable-increase="!item?.cars_count"
                @increase="item.cars_count--"
                @decrease="item.cars_count++"
              />
            </ClientOnly>
          </div>
        </div>
      </FormGroup>
    </div>
  </CommonCard>
</template>

<script setup lang="ts">
import type { IDefaultResponse, IVehicle } from '~/types/common'

interface Props {
  index: number
  vehicleTypes: IVehicle[]
  regions: {
    title: string
    cars_count: number
  }[]
  car: any
  chosenTypes: number[]
}

const props = defineProps<Props>()

const { vehicleTypes, regions, car } = unref(props)

const activeVehicle = ref(
  vehicleTypes.findIndex((item) => item?.id === car?.type) || 0
)
const innerRegions = ref<any>([])

function changeId(id: string) {
  if (car.sides.includes(id)) {
    car.sides = car.sides.filter((item) => item !== id)
  } else {
    car.sides.push(id)
  }
}

watch(
  () => activeVehicle.value,
  () => {
    car.type = vehicleTypes[activeVehicle.value]?.id
    fetchRegions(car.type)
  },
  {
    immediate: true,
  }
)

function fetchRegions(type: string) {
  if (type) {
    useApi()
      .$get(`/common/Regions?type=${type}`, {
        params: {
          limit: 20,
        },
      })
      .then((res: IDefaultResponse) => {
        innerRegions.value = res.results
      })
  }
}

function formatRegions() {
  car.regions = []
  innerRegions.value.forEach((item: any) => {
    regions.forEach((el: any) => {
      if (el?.id === item?.id) {
        car.regions.push({
          id: item.id,
          title: item.title,
          count: 0,
          cars_count: item.cars_count,
        })
      }
    })
  })
}

watch(
  () => innerRegions.value,
  () => formatRegions(),
  {
    immediate: true,
    deep: true,
  }
)

watch(
  () => regions.length,
  () => formatRegions()
)
</script>

<style scoped>
.vehicle-shadow {
  box-shadow: 0 6px 20px 0 rgba(105, 227, 198, 0.2);
}
</style>
