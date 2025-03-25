<template>
  <div class="relative">
    <FormGroup :label="$t('enter_location_text')">
      <FormInput
          name="search"
        v-model="search"
        :placeholder="$t('enter_location')"
        class="!bg-gray-200 focus-within:!bg-white"
        @focus="isFocus = true"
        @blur="isFocus = false"
      >
        <template #suffix>
          <i class="icon-search text-2xl text-dark mr-3" />
        </template>
      </FormInput>
    </FormGroup>

    <Transition name="dropdown-search">
      <div
        v-if="isFocus"
        class="bg-white border border-white-100 rounded-xl absolute left-0 w-full z-10 top-20 max-h-[245px] overflow-y-auto"
      >
        <Transition name="fade" mode="out-in">
          <div :key="loading">
            <template v-if="!loading && list?.length">
              <div
                v-for="(region, i) in list"
                :key="i"
                class="p-3 w-full border-b border-gray hover:bg-gray-200 cursor-pointer transition-300"
                @click="chooseRegion(region)"
              >
                <Highlighter
                  :text-to-highlight="region?.title"
                  class="text-sm leading-normal text-dark"
                  highlight-class-name="bg-[#FAC505] rounded-sm p-0.5"
                  :search-words="[listParams.search?.replaceAll(' ', '')]"
                  :title="region?.title"
                />
              </div>
            </template>
            <template v-else-if="!loading && !list?.length">
              <div class="p-3 w-full">
                <p class="text-base leading-5 font-semibold text-dark">
                  {{ $t('no_results') }}
                </p>
              </div>
            </template>
            <template v-else>
              <div class="p-16 flex-center">
                <div class="spinner" />
              </div>
            </template>
          </div>
        </Transition>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import Highlighter from 'vue-highlight-words'

import type { IDefaultResponse } from '~/types/common'
import { debounce } from '~/utils'

interface Props {
  defaultRegion: any[]
}

const props = defineProps<Props>()

const emit = defineEmits(['choose-region'])

const isFocus = ref(false)
const list = ref<any>([])
const loading = ref(false)
const search = ref('')
const listParams = reactive({
  limit: 30,
  offset: 0,
  search: '',
})

function getList() {
  useApi()
    .$get('common/Regions/', {
      params: {
        limit: listParams.limit,
        offset: listParams.offset || undefined,
        title__istartswith: listParams.search || undefined,
      },
    })
    .then((res: IDefaultResponse) => {
      list.value = res.results
    })
    .finally(() => (loading.value = false))
}

function chooseRegion(region: any) {
  search.value = ''
  isFocus.value = false
  list.value = []
  if (!props.defaultRegion?.includes(region?.id)) {
    emit('choose-region', region)
  }
}

watch(
  () => search.value,
  () => {
    loading.value = true
    debounce('search-list', () => {
      listParams.search = search.value
      getList()
    })
  }
)

watch(
  () => isFocus.value,
  () => {
    if (isFocus.value) {
      loading.value = true
      getList()
    }
  }
)
</script>
<style scoped>
.dropdown-search-enter-active {
  animation: dropdown-search 300ms ease-out;
}

.dropdown-search-leave-active {
  animation: dropdown-search 300ms ease-in reverse;
}

@keyframes dropdown-search {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.spinner {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: radial-gradient(farthest-side, #59debe 94%, #0000) top/3.8px 3.8px
      no-repeat,
    conic-gradient(#0000 30%, #59debe);
  -webkit-mask: radial-gradient(
    farthest-side,
    #0000 calc(100% - 3.8px),
    #000 0
  );
  animation: spinner-c7wet2 1s infinite linear;
}

@keyframes spinner-c7wet2 {
  100% {
    transform: rotate(1turn);
  }
}
</style>
