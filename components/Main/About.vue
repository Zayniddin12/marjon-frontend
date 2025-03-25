<template>
  <div>
    <div class="pt-16 pb-12 container">
      <CommonSection :is-about="true" :title="$t('we_are_text')" />
      <div class="bg-white relative rounded-20 mt-11 p-8">
        <img
            src="/images/svg/shapes.svg"
            alt="shapes"
            class="w-max h-full absolute left-0 bottom-0 pointer-event-none"
        />
        <img
            style="top: 60% !important"
            src="/images/vehicles/volvo.png"
            alt="mini-truck"
            class="absolute absolute-y max-w-[464px] lg:max-w-[464px] left-[15%] max-md:hidden"
        />
        <img
            src="/images/vehicles/mini-truck.png"
            alt="mini-truck"
            class="absolute absolute-y max-w-[267px] lg:max-w-[267px] left-[13%] mt-10 max-md:hidden"
        />
        <img
            src="/images/vehicles/truck.png"
            alt="mini-truck"
            class="absolute absolute-y max-w-[225px] lg:max-w-[225px] left-[4%] mt-20 max-md:hidden"
        />
        <div class="w-full md:max-w-[45%] md:ml-auto relative z-10">
          <CommonLogo class="max-w-[120px]" color="#190A35" />
          <p class="whitespace-pre-line text-sm text-dark leading-normal">
            {{ $t('about_text_main') }}
          </p>
          <NuxtLinkLocale to="/about" class="inline-block">
            <CommonButton
                variant="secondary"
                icon="icon-arrow text-2xl"
                icon-position="right"
                class="h-11 flex-center mt-5"
                :text="$t('more')"
            />
          </NuxtLinkLocale>
        </div>
      </div>
    </div>
    <AboutMore />
  </div>
</template>

<script></script>

<style scoped></style>
