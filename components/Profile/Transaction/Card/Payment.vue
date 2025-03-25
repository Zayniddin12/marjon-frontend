<template>
  <div
    class="p-3 border border-white-100 rounded-lg"
    :class="[
      { '!border-green/[16%]': !isMinus && amount > 0 },
      { '!border-red/[16%]': isMinus && amount > 0 },
    ]"
  >
    <p
      class="text-xs leading-normal text-gray-100"
      :class="[
        { '!text-green-100': !isMinus && amount > 0 },
        { '!text-red': isMinus && amount > 0 },
      ]"
    >
      {{ title }}
    </p>
    <p
      class="mt-1 text-sm font-semibold leading-normal text-gray-100"
      :class="[
        { '!text-green-100': !isMinus && amount > 0 },
        { '!text-red': isMinus && amount > 0 },
      ]"
    >
      {{ formatMoneyDecimal(amount, 2) }} UZS
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  amount?: number
  isMinus?: boolean
}

defineProps<Props>()
</script>
