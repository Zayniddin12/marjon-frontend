<template>
  <div
    class="relative p-1 lg:p-2 bg-white-100 rounded-2xl flex gap-1 overflow-hidden w-max border border-gray"
  >
    <div
      :class="activeClass"
      class="absolute h-[calc(100%_-_8px)] md:h-[calc(100%_-_16px)] rounded-[10px] bg-white tab-shadow -translate-y-1/2 top-1/2 transition-all duration-300"
      :style="{ width: `${active.width}px`, left: `${active.left}px` }"
    ></div>
    <button
      v-for="(tab, idx) in list"
      :id="`item_${tab.value}`"
      :key="idx"
      class="p-2.5 transition-300 text-sm rounded-[10px] font-semibold z-10 text-dark px-9 leading-130 flex-center gap-2"
      :class="[
        itemClass,
        modelValue === tab.value ? activeItemsClass : 'hover:bg-dark/[8%]',
      ]"
      @click="pick(tab.value, $event)"
    >
      <i v-if="tab.icon?.length" :class="tab.icon" class="text-xl" />
      {{ tab.label }}
    </button>
  </div>
</template>

<script lang="ts" setup>
interface Tab {
  label: string
  value: string | number
  icon?: string
}
interface Props {
  modelValue?: string | number
  list: Tab[]
  itemClass?: string
  activeClass?: string
  activeItemsClass?: string
}
const props = defineProps<Props>()

interface Emits {
  (e: 'update:modelValue', value: string | number): void
}
const $emit = defineEmits<Emits>()

// const active = ref({ left: 0, width: 0 });
const active = ref({ left: 0, width: 0 })
const pick = (tab: string | number, e?: { target: HTMLButtonElement }) => {
  const target = e.target as HTMLButtonElement
  active.value = {
    left: target?.offsetLeft,
    width: target?.offsetWidth,
  }
  $emit('update:modelValue', tab)
}

watch(
  () => props.modelValue,
  () => {
    setTimeout(() => {
      const item = document.getElementById(
        `item_${props.modelValue}`
      ) as HTMLButtonElement
      pick(props.modelValue, { target: item })
    }, 300)
  }
)

onMounted(() => {
  setTimeout(() => {
    const item = document.getElementById(
      `item_${props.modelValue}`
    ) as HTMLButtonElement
    pick(props.modelValue, { target: item })
  }, 300)
})
</script>

<style scoped>
.tab-shadow {
  box-shadow: 0 8px 22px 0 rgba(25, 10, 53, 0.09);
}
</style>
