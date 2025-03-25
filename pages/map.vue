<template>
  <div class="relative">
    <ClientOnly>
      <ProfileMap
        class="relative z-0"
        :cars="mapList"
        @focus-car-id="focusCar"
      />
    </ClientOnly>
    <ProfileMapFilter
      :cars
      :selected-cars
      :focus-car-id
      @filter-changed="fetchFilteredData"
      @select-car="setSelectedCars"
    />
    <Transition name="fade" mode="out-in">
      <CommonElementsLoader
        v-if="loading"
        class="absolute h-screen w-screen inset-0 z-10 bg-black/70 backdrop-blur"
      />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import type { ICarTrack, ICarTrackModified } from '~/types/car'

definePageMeta({
  layout: 'empty',
  middleware: ['auth'],
})
const selectedCars = ref<ICarTrackModified[]>([])

const mapList = computed(() => {
  return (selectedCars.value?.length ? selectedCars.value : cars.value)?.filter(
    (item) => item.locations?.length > 0
  )
})

const focusCarId = ref()
const focusCar = (id: string) => {
  focusCarId.value = id
}

const loading = ref(false)

const route = useRoute()
const params = ref(route.query)

const { data: trackList } = await useAsyncData(async () => {
  return await useApi().$get<ICarTrack[]>('/cars/CarList/', {
    params: params.value,
  })
})

const fetchFilteredData = async (data) => {
  params.value = data
  const newList = await useApi().$get<ICarTrack[]>('/cars/CarList/', {
    params: data,
  })
  cars.value = newList?.map((item: ICarTrack) => {
    const color = generateHexColor()
    return {
      ...item,
      color,
      colorDark: darkenHexColor(color),
    }
  })
  const list = cars.value.filter((el) =>
    selectedCars.value.some((item) => item.car_id === el.car_id)
  )
  list?.forEach((item) => {
    fetchSelectedCars(item.car_id).then((res) => {
      selectedCars.value[
        selectedCars.value.findIndex((el) => el.car_id === item.car_id)
      ] = {
        ...item,
        locations: res[0].locations.map((el) => [el.lon, el.lat]),
      }
    })
  })
}

const cars = ref<ICarTrackModified[]>(
  trackList.value?.map((item: ICarTrack) => {
    const color = generateHexColor()
    return {
      ...item,
      color,
      colorDark: darkenHexColor(color),
    }
  })
)

const setSelectedCars = async (data: ICarTrackModified) => {
  if (selectedCars.value.some((item) => item.car_id === data.car_id)) {
    selectedCars.value = selectedCars.value.filter(
      (item) => item.car_id !== data.car_id
    )
  } else {
    loading.value = true
    const car = await fetchSelectedCars(data.car_id)
    loading.value = false
    selectedCars.value.push({
      ...data,
      locations: car[0].locations.map((el) => [el.lon, el.lat]),
    })
  }
}

async function fetchSelectedCars(id: number) {
  return await useApi().$get(`/cars/CarLogsList/`, {
    params: {
      car_id: id,
      start_date: params.value.start_date || undefined,
      end_date: params.value.end_date || undefined,
      region_name: params.value.region_name || undefined,
    },
  })
}
</script>
