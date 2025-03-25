<template>
  <button
    :class="[
      variants[variant],
      sizes[size],
      { '!pointer-events-none': loading },
    ]"
    class="rounded-xl relative transition-300 active:scale-95 border border-transparent disabled:!bg-gray disabled:text-gray-100 disabled:pointer-events-none"
    v-bind="{ disabled }"
  >
    <span
      :class="[
        {
          '!opacity-0': loading,
          'flex-center justify-center gap-2': text?.length,
          'flex-row-reverse': iconPosition === 'left',
        },
        mainClass,
      ]"
      class="opacity-100 transition-300 text-center whitespace-nowrap"
    >
      <slot>
        <span v-if="iconLeft?.length" :class="iconLeft" />
        <span v-if="text?.length"> {{ text }} </span>
        <span v-if="icon?.length" :class="icon" />
      </slot>
    </span>
    <Transition name="fade" mode="out-in">
      <span
        v-if="loading"
        class="absolute-center z-10 !inline-block w-max h-max loading transition-300"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="animate-spin"
        >
          <path
            d="M18.6705 10C19.4048 10 20.0091 10.5978 19.9118 11.3256C19.7101 12.8333 19.1663 14.2813 18.3147 15.5557C17.2159 17.2002 15.6541 18.4819 13.8268 19.2388C11.9996 19.9957 9.98891 20.1937 8.0491 19.8079C6.10929 19.422 4.32746 18.4696 2.92894 17.0711C1.53041 15.6725 0.578004 13.8907 0.192152 11.9509C-0.193701 10.0111 0.00433284 8.00043 0.761209 6.17317C1.51809 4.3459 2.79981 2.78412 4.4443 1.6853C5.71875 0.833744 7.16671 0.289884 8.6744 0.0882432C9.40217 -0.00909153 10 0.595234 10 1.32949C10 2.06375 9.39999 2.64679 8.67774 2.77904C7.69697 2.95865 6.75831 3.33706 5.92155 3.89617C4.71433 4.70281 3.77341 5.84932 3.21779 7.19071C2.66217 8.53211 2.51679 10.0081 2.80004 11.4322C3.0833 12.8562 3.78246 14.1642 4.80912 15.1909C5.83578 16.2175 7.14383 16.9167 8.56784 17.2C9.99186 17.4832 11.4679 17.3378 12.8093 16.7822C14.1507 16.2266 15.2972 15.2857 16.1038 14.0784C16.6629 13.2417 17.0414 12.303 17.221 11.3223C17.3532 10.6 17.9363 10 18.6705 10Z"
            :fill="loaderFill"
          />
        </svg>
      </span>
    </Transition>
  </button>
</template>

<script lang="ts" setup>
import type { TClassName } from '~/types/common'
import type { TButtonSizes, TButtonVariants } from '~/types/components/button'

interface Props {
  variant?: TButtonVariants
  size?: TButtonSizes
  loading?: boolean
  mainClass?: TClassName
  iconPosition?: 'left' | 'right'
  text?: string | number
  icon?: string
  iconLeft?: string
  disabled?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  text: 'Button',
  mainClass: '',
  iconPosition: 'left',
  icon: '',
  iconLeft: '',
})

const variants: Record<TButtonVariants, string> = {
  primary:
    'bg-green text-white hover:bg-green-200 hover:shadow-[0px_6px_30px_0px_rgba(63,242,200,0.40)]',
  secondary: 'bg-gray text-dark  hover:bg-dark/20',
  outline:
    'border !border-gray text-dark hover:bg-white-100 hover:!border-dark/20',
  'secondary-white':
    'bg-white border !border-gray text-dark hover:bg-white-100 hover:!border-dark/20',
  dark: 'bg-white/[12%] text-white hover:bg-white/[24%]',
  danger: 'bg-red text-white hover:bg-[#EB1F38]',
}

const sizes: Record<TButtonSizes, string> = {
  sm: 'py-2 px-6 text-sm font-medium leading-130',
  md: 'py-2.5 px-8 font-semibold text-base leading-5',
}

const loaderFill = computed(() => {
  if (['outline', 'secondary'].includes(props.variant)) {
    return '#190A35'
  }
  return 'white'
})
</script>
