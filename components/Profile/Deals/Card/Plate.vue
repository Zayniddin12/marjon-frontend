<template>
  <div
    class="border border-dark flex-y-center"
    :class="size === 'sm' ? 'rounded' : 'rounded-[7px]'"
  >
    <div
      class="flex-center border-r border-dark leading-[100%] uppercase tracking-[-0.3px] text-[#32363E] font-auto"
      :class="
        size === 'sm' ? 'w-[18px] h-[18px] text-[10px]' : 'h-8 w-8 text-base'
      "
    >
      {{ series }}
    </div>

    <div class="flex-y-center gap-1" :class="size === 'sm' ? 'px-1' : 'px-1.5'">
      <p
        class="leading-[100%] uppercase tracking-[-0.3px] text-[#32363E] font-auto"
        :class="size === 'sm' ? 'text-sm' : 'text-[22px]'"
      >
        {{ plate }}
      </p>
      <div class="flex flex-col" :class="size === 'sm' ? 'gap-px' : 'gap-0.5'">
        <img
          src="/images/svg/flag/uz-auto.svg"
          alt="uz"
          :class="size === 'sm' ? 'w-2 h-2' : 'w-3 h-3'"
        />
        <img
          src="/images/svg/flag/uz-text.svg"
          alt="uz-text"
          :class="size === 'sm' ? 'h-1' : ''"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  plate?: string
  series?: string
  size?: 'md' | 'sm'
}

defineProps<Props>()
</script>
