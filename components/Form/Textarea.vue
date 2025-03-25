<template>
  <div
    class="bg-white border border-gray transition-300 focus-within:border-green flex flex-col items-end justify-between rounded-xl"
    :class="{ '!border-red !bg-red/5': error }"
  >
    <textarea
      v-bind="{ type, maxlength, minlength, rows }"
      :id="id"
      :key="placeholder.length"
      v-model="inputValue"
      :placeholder="placeholder"
      class="w-full h-full text-base p-3 text-dark bg-transparent outline-none placeholder:text-gray-100 resize-none textarea-scroll"
      :class="inputClass"
      @blur="$emit('blur', $event)"
      @input="handleInput"
    />
    <span v-if="maxlength" class="text-gray-100 text-xs mb-1 mr-2 mt-0.5">
      {{ inputValue.length }} / {{ maxlength }}</span
    >
  </div>
</template>

<script lang="ts" setup>
interface Props {
  inputClass?: string
  type?: string
  placeholder?: string
  error?: boolean
  id?: string
  modelValue?: string
  maxlength?: number | string
  minlength?: number | string
  rows?: number
}
const props = withDefaults(defineProps<Props>(), {
  inputClass: '',
  type: 'text',
  placeholder: '',
  maxlength: '',
  minlength: '',
})

interface Emits {
  (e: 'blur', v: Event): void
  (e: 'update:modelValue', v: string): void
}
const $emit = defineEmits<Emits>()

watch(
  () => props.modelValue,
  (v) => {
    inputValue.value = v || ''
  }
)

const inputValue = ref<string>(props.modelValue || '')

function handleInput() {
  $emit('update:modelValue', inputValue.value)
}
</script>

<style scoped>
/* width */
.textarea-scroll::-webkit-scrollbar {
  width: 0;
}

/* Track */
.textarea-scroll::-webkit-scrollbar-track {
  background: #fff;
}

/* Handle */
.textarea-scroll::-webkit-scrollbar-thumb {
  background: #fff;
}
</style>
