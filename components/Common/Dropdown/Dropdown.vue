<template>
  <div
    class="relative"
    data-dropdown="0"
    tabindex="0"
    @focusout="handleFocusOut"
  >
    <div :class="headClass" @click="toggleShow">
      <slot name="head"></slot>
    </div>
    <Transition name="dropdown" mode="out-in">
      <div
        v-show="showBody"
        :class="[bodyClass]"
        data-dropdown-body
        class="absolute shadow-body right-0 w-max min-w-full translate-y-full bg-white rounded-xl overflow-hidden -bottom-2 z-[11] border border-white-100"
      >
        <slot name="body" />
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import type { TClassName } from '~/types/common'

interface Props {
  headClass?: TClassName
  bodyClass?: TClassName
  show?: boolean | undefined
  withTrigger?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  show: undefined,
  headClass: '',
  bodyClass: '',
})

interface Emits {
  (e: 'toggle', v: boolean): void
}
const emit = defineEmits<Emits>()

const showBody = ref(props.show ?? false)

function toggleShow() {
  if (!props.withTrigger) {
    if (props.show === undefined) {
      showBody.value = !showBody.value
    } else {
      emit('toggle', !props.show)
    }
  }
}

function handleFocusOut(e: FocusEvent) {
  emit('toggle', false)
  showBody.value = false
}

watch(
  () => props.show,
  (v) => {
    showBody.value = v
  }
)
</script>

<style scoped>
@keyframes dropdown {
  0% {
    opacity: 0;
    bottom: -12px;
  }
  100% {
    opacity: 1;
    bottom: -8px;
  }
}

.dropdown-enter-active {
  animation: dropdown 0.3s ease-in-out;
}
.dropdown-leave-active {
  animation: dropdown 0.3s ease-in-out reverse;
}

.shadow-body {
  box-shadow: 0 16px 30px 0 rgba(25, 10, 53, 0.12);
}
</style>
