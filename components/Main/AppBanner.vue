<template>
  <div class="relative flex-center-between mb-16 mt-28">
    <div
      class="container flex-y-center justify-between relative px-0 bg-gray fill-gray rounded-[32px]"
    >
      <div class="lg:max-w-[50%] py-9 px-10">
        <i18n-t
          keypath="main_text"
          tag="p"
          class="text-[32px] leading-130 font-bold text-dark whitespace-pre-line"
        >
          <template #each
            ><span
              class="text-green bg-green/[22%] rounded-[10px] px-2 h-[50px]"
              >{{ $t('each') }}</span
            ></template
          >
        </i18n-t>
        <p class="mt-4 text-sm leading-130 font-normal text-gray-100">
          {{ $t('main_app_subtitle') }}
        </p>
        <div class="flex-y-center gap-4 mt-10">
          <a
            rel="nofollow"
            class="block"
            href="https://apps.apple.com/us/app/marjon/id6474285059"
            target="_blank"
            aria-label="Download from the App Store"
          >
            <i
              class="icon-app-store text-[#737373] hover:text-dark transition-all text-[40px]"
            ></i>
          </a>
          <a
            rel="nofollow"
            class="block"
            href="https://play.google.com/store/apps/details?id=org.uicgroup.marjonapp"
            target="_blank"
            aria-label="Download from Google Play"
          >
            <i
              class="icon-google-play text-[#737373] hover:text-dark transition-all text-[40px]"
            ></i>
          </a>
        </div>
      </div>
      <div
        class="w-full relative hidden md:flex min-h-[330px] lg:min-h-[296px] py-9 px-10 h-full max-w-[50%]"
      >
        <div
          class="absolute overflow-hidden app-banner md:before:top-[-50px] md:before:left-[-290px] md:before:rotate-[290deg] xl:before:left-[-343px] lg:before:rotate-[343deg] before:content before:absolute before:w-full before:h-full before:z-10 before:bg-gray lg:before:top-[14px] after:content after:absolute after:w-[95%] after:h-full after:bg-green-300 after:top-0 after:right-0 after:z-0 after:rounded-r-[32px] right-0 top-0 w-full h-full"
        ></div>
        <img
          src="/images/app-banner.webp"
          alt="cargo-res"
          class="w-full h-auto absolute bottom-0 right-0 z-[10] pointer-events-none"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
<style></style>
