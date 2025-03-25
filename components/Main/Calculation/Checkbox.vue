<template>
  <div
    class="w-[168px] h-[120px] border border-white-100 bg-white rounded-2xl relative p-3 pb-0.5 flex flex-col justify-end cursor-pointer"
    :class="{ '!border-green-100': checked }"
  >
    <div
      class="flex-center w-6 h-6 rounded border-[1.5px] border-gray absolute top-2 left-2 hover:border-green-100 transition-300 z-10"
      :class="{ '!border-green-100 bg-green-100': checked }"
    >
      <i
        class="icon-tick text-white transition-300 opacity-0"
        :class="{ 'opacity-100': checked }"
      />
    </div>
    <img
      :src="item?.image"
      class="w-full h-auto absolute-x top-0 pointer-events-none max-h-[100px] object-contain"
      alt="side"
    />
    <div class="text-center text-sm font-semibold leading-normal text-dark">
      {{ item?.title }}
    </div>
    <div
      class="text-center text-xs font-semibold leading-normal text-gray-100 -mt-0.5"
    >
      {{ formatMoneyDecimal(item?.amount) }} {{ $t('sum') }}
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  item: {
    amount: string
    id: number
    title: string
    image: string
  }
  checked?: boolean
}

defineProps<Props>()
</script>
