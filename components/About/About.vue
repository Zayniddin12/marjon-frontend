<template>
  <div>
    <div class="border-b-[6px] border-green">
      <div class="flex-center py-[62px] container">
        <CommonSection :title="$t('we_are')" :subtitle="$t('we_are_text')" />
      </div>
    </div>
    <div class="py-[66px] linear-purple flex-center relative overflow-hidden">
      <CommonLogo variant="dark" class="w-[227px] relative z-10" />
      <div
        class="w-[652px] h-[652px] rounded-full linear-white-blur absolute-center"
      />
      <div
        class="w-[492px] h-[492px] rounded-full linear-white-blur absolute-center"
      />
      <div
        class="w-[358px] h-[358px] rounded-full bg-green blur-[195px] absolute-center"
      />
    </div>
    <div class="bg-white">
      <div
        class="grid lg:grid-cols-2 container pt-[50px] pb-6 relative max-lg:overflow-hidden"
      >
        <div class="relative max-lg:order-last -ms-[200px]">
          <img
            src="/images/vehicles/volvo.png"
            alt="truck"
            class="translate-x-14 mt-3 lg:mt-0 max-w-[554px] lg:max-w-[754px]"
          />
          <img
            src="/images/vehicles/mini-truck.png"
            alt="cargo"
            class="absolute top-[19%] left-[5%] max-w-[433px] max-lg:hidden"
          />
        </div>
        <div class="max-lg:text-center">
          <p class="text-lg leading-140 text-dark whitespace-pre-line">
            {{ $t('about_text_main') }}
          </p>
          <CommonButton
            class="mt-6 h-11 flex-center max-lg:mx-auto"
            icon-position="right"
            icon="icon-chevron -rotate-90 text-2xl"
            :text="$t('calculator')"
            @click="scrollElement('#calculator')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()

async function scrollElement(id: string) {
  if (id) {
    await router.push('/')
    await setTimeout(() => {
      const el = document.querySelector(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }, 500)
  }
}
</script>

<style scoped>
.linear-white-blur {
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.08) -33.55%,
    rgba(255, 255, 255, 0) 81.82%
  );
}
</style>
