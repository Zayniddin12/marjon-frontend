<template>
  <div>
    <yandex-map
      v-model="map"
      class="map"
      :settings="{
        location: {
          center: mapConfig.center,
          zoom: mapConfig.zoom,
        },
        theme: 'dark',
        showScaleInCopyrights: true,
      }"
      width="100vw"
      height="100vh"
    >
      <yandex-map-default-scheme-layer />
      <yandex-map-default-features-layer />
      <template v-if="activeCar?.locations.length">
        <yandex-map-feature
          :settings="{
            geometry: {
              type: 'LineString',
              coordinates: activeCar?.locations,
            },
            style: {
              stroke: [{ color: activeCar.color, width: 5 }],
            },
          }"
        />
      </template>
      <yandex-map-controls :settings="{ position: 'right' }">
        <yandex-map-zoom-control />
      </yandex-map-controls>
      <yandex-map-marker
        v-for="(item, index) in circles"
        :key="index"
        class="cursor-pointer -translate-x-1/2 -translate-y-1/2"
        :settings="{ coordinates: [item.avg_latitude, item.avg_longitude] }"
      >
        <div class="aspect-square bg-red/40 rounded-full text-white w-20">
          <!--          {{ item.count }}-->
        </div>
      </yandex-map-marker>

      <yandex-map-listener
        :settings="{
          onUpdate,
        }"
      />
    </yandex-map>
  </div>
</template>

<script setup lang="ts">
import type { LngLat } from '@yandex/ymaps3-types'
import {
  YandexMap,
  YandexMapControls,
  YandexMapDefaultFeaturesLayer,
  YandexMapDefaultSchemeLayer,
  YandexMapFeature,
  YandexMapListener,
  YandexMapMarker,
  YandexMapZoomControl,
} from 'vue-yandex-maps'

import type { ICarTrackModified } from '~/types/car'

interface Props {
  cars: ICarTrackModified[]
  activeCar: ICarTrackModified
  circles: {
    avg_latitude: number
    avg_longitude: number
    count: number
    quadkey: string
  }[]
}
const props = defineProps<Props>()
const emit = defineEmits(['focusCarId', 'change-info'])

definePageMeta({
  layout: 'empty',
})

const route = useRoute()
// MAP
const map = shallowRef(null)
const mapConfig = computed<{ center: LngLat; zoom: number }>(() => {
  console.log(route.query)
  if (route.query.ll && route.query.z) {
    return {
      center: route.query.ll.split(',').map((item: string) => Number(item)),
      zoom: Number(route.query.z),
    }
  }
  return {
    center: [69.267581, 41.341185],
    zoom: 9,
  }
})

const calcRadius = () => {
  const baseZoom = 10
  const baseWindowWidth = 1000
  const baseRadius = 115000

  const windowWidth = window.innerWidth
  let radius
  let resulRadius

  if (baseWindowWidth < windowWidth) {
    radius = (windowWidth - baseWindowWidth) * 125 + baseRadius
  } else {
    radius = baseRadius - (baseWindowWidth - windowWidth) * 117
  }
  if (mapConfig.value.zoom > baseZoom) {
    resulRadius = radius / 2 ** (mapConfig.value.zoom - baseZoom)
  } else {
    resulRadius = radius * 2 ** (baseZoom - mapConfig.value.zoom)
  }

  return Math.floor(resulRadius / 2)
}

const { updateQueryParams } = useQueryChange()

function onUpdate(event) {
  debounce(
    'changeUpdate',
    async () => {
      await updateQueryParams({
        z: event.location.zoom,
        ll: event.location.center?.join(),
      })
      emit('change-info', {
        zoom: event.location.zoom,
        center: event.location.center,
        radius: calcRadius(),
      })
    },
    500
  )
}
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
