<template>
  <div class="grid grid-cols-2 gap-1" :class="{ '!grid-cols-1 !gap-0': isCol }">
    <div>
      <p
        class="gap-0.5 after:w-full after:h-px after:content-[''] after:border-b after:block after:border-gray after:border-dashed text-xs leading-normal font-normal text-dark relative flex whitespace-nowrap items-end after:mb-[5px]"
        :class="{ 'after:!h-0 after:!border-0': isCol }"
      >
        {{ title }}
      </p>
    </div>
    <slot>
      <p class="text-xs leading-normal font-semibold text-dark">{{ value }}</p>
    </slot>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  value?: string
  isCol?: boolean
}

defineProps<Props>()
</script>
