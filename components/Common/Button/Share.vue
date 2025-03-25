<template>
  <div
    class="relative group bg-gray-200 flex items-center hover:bg-[#35abb21a] transition duration-300 justify-between md:pl-3 rounded-lg group sm:max-w-[240px] cursor-pointer"
  >
    <span
      class="!hidden md:!block whitespace-nowrap line-clamp-1 text-gray-100 font-semibold leading-[125%] text-base"
    >
      {{ $t('share') }}
    </span>
    <span
      class="w-8 h-9 bg-gray shrink-0 transition duration-300 md:rounded-r-lg flex items-center justify-center md:ml-2"
    >
      <i class="transition">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="5.5"
            cy="12"
            r="3"
            stroke="#8C849A"
            stroke-width="2.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <circle
            cx="17.5"
            cy="6"
            r="3"
            stroke="#8C849A"
            stroke-width="2.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <circle
            cx="17.5"
            cy="18"
            r="3"
            stroke="#8C849A"
            stroke-width="2.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M8.2002 10.6998L14.8002 7.2998"
            stroke="#8C849A"
            stroke-width="2.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M8.2002 13.2998L14.8002 16.6998"
            stroke="#8C849A"
            stroke-width="2.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </i>
    </span>
  </div>
</template>

<script>
export default {
  name: 'Share',
}
</script>

<style scoped></style>
