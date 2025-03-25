<template>
  <div>
    <yandex-map
      v-model="map"
      class="map"
      :settings="{
        location: {
          center,
          zoom,
        },
        theme: 'dark',
        showScaleInCopyrights: true,
      }"
      width="100vw"
      height="100vh"
    >
      <yandex-map-default-scheme-layer />
      <yandex-map-default-features-layer />
      <template v-if="cars?.length">
        <yandex-map-feature
          v-for="(item, index) in cars"
          :key="index"
          :settings="{
            geometry: {
              type: 'LineString',
              coordinates: item?.locations,
            },
            style: {
              stroke: [{ color: item.color, width: 5 }],
            },
          }"
        />
      </template>
      <template v-if="cars?.length">
        <yandex-map-clusterer
          v-model="cluster"
          :grid-size="2 ** gridSize"
          zoom-on-cluster-click
        >
          <yandex-map-marker
            v-for="(item, index) in cars"
            :key="index"
            class="cursor-pointer"
            :settings="{ coordinates: item?.locations.at(-1) }"
            @click="selectCar(item.car_id)"
          >
            <ProfileMapCar
              v-bind="{ item }"
              :count="
                checkDublicate?.find((el) => el?.car_id === item?.car_id)
                  ? checkDublicate?.length
                  : ''
              "
            />
          </yandex-map-marker>

          <template #cluster="{ length }">
            <div class="cluster fade-in">
              {{ length }}
            </div>
          </template>
        </yandex-map-clusterer>
      </template>
      <yandex-map-controls :settings="{ position: 'right' }">
        <yandex-map-zoom-control />
      </yandex-map-controls>
    </yandex-map>
  </div>
</template>

<script setup lang="ts">
import type { LngLat } from '@yandex/ymaps3-types'
import {
  YandexMap,
  YandexMapClusterer,
  YandexMapControls,
  YandexMapDefaultFeaturesLayer,
  YandexMapDefaultSchemeLayer,
  YandexMapFeature,
  YandexMapMarker,
  YandexMapZoomControl,
} from 'vue-yandex-maps'

import type { ICarTrackModified } from '~/types/car'

interface Props {
  cars: ICarTrackModified[]
}
const props = defineProps<Props>()
const emit = defineEmits(['focusCarId'])

const selectCar = (carId) => {
  emit('focusCarId', carId)
}

definePageMeta({
  layout: 'empty',
})

// MAP
const map = shallowRef(null)
const cluster = shallowRef(null)
const count = ref(500)
const savedCount = ref(500)
const gridSize = ref(6)

watch(count, (val: never) => {
  const oldVal = val
  setTimeout(() => {
    if (oldVal !== count.value) return
    savedCount.value = val
  }, 300)
})

const fullCoordinates = computed(() => {
  return props.cars?.map((item: ICarTrackModified) => item.locations)?.flat()
})

const mapWidth = window.innerWidth // Example width of the map in pixels
const mapHeight = window.innerHeight // Example height of the map in pixels

function getMapZoom(
  extreme: { west: number; east: number; north: number; south: number },
  mapWidth: number,
  mapHeight: number
) {
  const WORLD_DIM = { height: 256, width: 256 }
  const ZOOM_MAX = 21

  function latRad(lat: number) {
    const sin = Math.sin((lat * Math.PI) / 180)
    const radX2 = Math.log((1 + sin) / (1 - sin)) / 2
    return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2
  }

  function zoom(mapPx: number, worldPx: number, fraction: number) {
    return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2)
  }

  const latFraction =
    (latRad(extreme?.north) - latRad(extreme?.south)) / Math.PI

  const lngDiff = extreme?.east - extreme?.west
  const lngFraction = (lngDiff < 0 ? lngDiff + 360 : lngDiff) / 360

  const latZoom = zoom(mapHeight, WORLD_DIM.height, latFraction)
  const lngZoom = zoom(mapWidth, WORLD_DIM.width, lngFraction)

  return Math.min(latZoom, lngZoom, ZOOM_MAX)
}

const zoom = computed(() => {
  if (fullCoordinates.value?.length) {
    return getMapZoom(
      getExtremeCoordinates(fullCoordinates.value),
      mapWidth,
      mapHeight
    )
  } else {
    return 9
  }
})

function getExtremeCoordinates(coordinates: [LngLat[]]) {
  if (!coordinates?.length) return { east: 0, west: 0, north: 0, south: 0 }
  let mostEast = coordinates[0][0]
  let mostWest = coordinates[0][0]
  let mostNorth = coordinates[0][1]
  let mostSouth = coordinates[0][1]

  for (let i = 1; i < coordinates.length; i++) {
    if (coordinates[i][0] > mostEast) {
      mostEast = coordinates[i][0]
    }
    if (coordinates[i][0] < mostWest) {
      mostWest = coordinates[i][0]
    }
    if (coordinates[i][1] > mostNorth) {
      mostNorth = coordinates[i][1]
    }
    if (coordinates[i][1] < mostSouth) {
      mostSouth = coordinates[i][1]
    }
  }

  return {
    east: mostEast,
    west: mostWest,
    north: mostNorth,
    south: mostSouth,
  }
}
const center = computed(() => {
  if (fullCoordinates.value?.length) {
    const avgLat =
      (getExtremeCoordinates(fullCoordinates.value).north +
        getExtremeCoordinates(fullCoordinates.value).south) /
      2
    const avgLng =
      (getExtremeCoordinates(fullCoordinates.value).east +
        getExtremeCoordinates(fullCoordinates.value).west) /
      2

    return [avgLng, avgLat]
  } else {
    return ['69.267581', '41.341185']
  }
})

function countCarsWithSameLocation(cars) {
  // Создаем объект, в котором ключами будут последние координаты локации каждой машины,
  // а значениями будет массив машин с этой последней локацией
  const lastLocationCars = {}

  // Перебираем каждую машину
  cars.forEach((car) => {
    // Получаем последнюю локацию
    const lastLocation = car.locations[car.locations.length - 1]
    // Преобразуем координаты в строку, чтобы использовать как ключ
    const locationKey = JSON.stringify(lastLocation)
    // Если такая локация уже есть в объекте, добавляем машину в массив
    if (lastLocationCars[locationKey]) {
      lastLocationCars[locationKey].push(car)
    } else {
      // Иначе создаем новую запись с массивом, содержащим только эту машину
      lastLocationCars[locationKey] = [car]
    }
  })

  // Фильтруем объект, оставляя только локации с более чем одной машиной
  const duplicates = {}
  for (const key in lastLocationCars) {
    if (lastLocationCars[key].length > 1) {
      duplicates[key] = lastLocationCars[key]
    }
  }

  // Возвращаем объект с последними локациями, где есть более одной машины
  return Object.values(duplicates)?.[0]
}

const checkDublicate = computed(() => countCarsWithSameLocation(props?.cars))
</script>
<style scoped>
.cluster {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  background: black;
  color: #fff;
  border-radius: 100%;
  cursor: pointer;
  border: 2px solid black;
  outline: 2px solid black;
}

.fade-in {
  animation: fadeIn 0.3s;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
