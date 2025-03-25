<template>
  <div
    class="relative group bg-gray-200 flex items-center hover:bg-[#35abb21a] transition duration-300 justify-between md:pl-3 rounded-lg group sm:max-w-[240px] cursor-pointer"
    @click="copyUrl"
  >
    <span
      class="!hidden md:!block whitespace-nowrap line-clamp-1 text-gray-100 font-semibold leading-[125%] text-base"
      :class="textStyle"
    >
      {{ copy_text }}
    </span>
    <span
      class="w-8 h-9 bg-gray shrink-0 transition duration-300 md:rounded-r-lg flex items-center justify-center md:ml-2"
      :class="buttonStyle"
    >
      <i class="transition">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_757_11330)">
            <path
              d="M6.66663 6.6665V4.99984C6.66663 3.15889 8.15901 1.6665 9.99996 1.6665L15 1.6665C16.8409 1.6665 18.3333 3.15889 18.3333 4.99984V9.99984C18.3333 11.8408 16.8409 13.3332 15 13.3332H13.3333M6.66663 6.6665H4.99996C3.15901 6.6665 1.66663 8.15889 1.66663 9.99984V14.9998C1.66663 16.8408 3.15901 18.3332 4.99996 18.3332H9.99996C11.8409 18.3332 13.3333 16.8408 13.3333 14.9998V13.3332M6.66663 6.6665H9.99996C11.8409 6.6665 13.3333 8.15889 13.3333 9.99984V13.3332"
              stroke="#8C849A"
              stroke-width="1.5"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_757_11330">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </i>
    </span>

    <div
      class="absolute bottom-full left-1/2 -translate-x-1/2 transition duration-300"
      :class="[
        copied
          ? '!-translate-y-4 !visible !opacity-100'
          : 'invisible opacity-0',
      ]"
    >
      <div
        class="tooltip bg-dark border border-[#4C4C4C] rounded-lg px-4 py-2 text-sm leading-4 text-white font-proxima relative"
      >
        {{ $t('copied') }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const copied = ref(false)
function copyUrl() {
  const input = document.createElement('input')
  document.body.appendChild(input)
  input.value = window.location.href
  input.select()
  input.focus()
  document.execCommand('copy')
  input.remove()
  copied.value = true

  setTimeout(() => {
    copied.value = false
  }, 1500)
}

interface Props {
  copy_text?: string
  copy_tooltip?: string
  show?: boolean
  buttonStyle?: string
  textStyle?: string
}

withDefaults(defineProps<Props>(), {
  copy_text: 'Ссылка',
  copy_tooltip: 'copied',
})
</script>

<style scoped>
.tooltip {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.tooltip::after {
  content: '';
  position: absolute;
  z-index: 1;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -1px) rotate(180deg);
  width: 20px;
  height: 9px;
  background: black;
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
}
</style>
