<template>
  <div class="relative">
    <ClientOnly>
      <ProfileMapV2
        class="relative z-0"
        :cars="mapList"
        :active-car
        :circles
        @focus-car-id="focusCar"
        @change-info="changeInfo"
      />
    </ClientOnly>
    <ProfileMapFilterV2
      :cars
      :selected-cars
      :active-car
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
const activeCar = ref<ICarTrackModified>()

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

const circles = ref([])
const setSelectedCars = async (data: ICarTrackModified) => {
  loading.value = true
  const car = await fetchSelectedCars(data)
  loading.value = false
  circles.value = car.filter((item) => item.count > 1)
  activeCar.value = {
    ...data,
    locations: car.map((el) => [el.avg_latitude, el.avg_longitude]),
    count: car.count,
  }
}

const info = ref()
async function changeInfo(data: ICarTrackModified) {
  info.value = data
  const car = await fetchSelectedCars({
    ...activeCar.value,
    last_location: { lon: data.center[0], lat: data.center[1] },
  })
  circles.value = car.filter((item) => item.count > 1)
  activeCar.value = {
    ...activeCar.value,
    locations: car.map((el) => [el.avg_latitude, el.avg_longitude]),
    count: car.count,
  }
}
async function fetchSelectedCars(data) {
  return await useApi().$get(`/cars/CarLogTrackQuad/${data.car_id}/`, {
    params: {
      longitude: data.last_location.lat,
      latitude: data.last_location.lon,
      zoom: info.value?.zoom.toFixed(0) || 9,
      radius: info.value?.radius || 100000,
      start_date: params.value.start_date || undefined,
      end_date: params.value.end_date || undefined,
      region_name: params.value.region_name || undefined,
    },
  })
}
</script>
