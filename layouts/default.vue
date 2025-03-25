<template>
  <div class="bg-gray-200">
    <noscript>
      <iframe
        src="https://www.googletagmanager.com/ns.html?id=GTM-5NBVW8LZ"
        height="0"
        width="0"
        style="display: none; visibility: hidden"
      ></iframe>
    </noscript>
    <ClientOnly>
      <LayoutHeader :variant="headerVariant" />
    </ClientOnly>
    <div
      :class="{
        'pt-[108px] lg:pt-[172px]':
          route.name !== 'index___uz' && route.name !== 'index___ru',
      }"
      class="transition-300 min-h-[calc(100vh-128px)]"
    >
      <slot />
    </div>
    <ClientOnly>
      <LayoutFooter />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import type { THeaderVariants } from '~/types/common'

const route = useRoute()

const headerVariant = ref<THeaderVariants>('default')

watch(
  () => route.name,
  () => {
    if (route.name === 'index___uz' || route.name === 'index___ru') {
      headerVariant.value = 'dark'
    } else {
      headerVariant.value = 'default'
    }
  },
  {
    immediate: true,
  }
)
onMounted(() => {
  window.dataLayer = window.dataLayer || []
  function gtag() {
    dataLayer.push(arguments)
  }
  gtag('js', new Date())

  gtag('config', 'G-R4CXBL8MNY')
  ;(function (d, w, c) {
    ;(w[c] = w[c] || []).push(function () {
      try {
        w.yaCounter96211339 = new Ya.Metrika({
          id: 96211339,
          clickmap: true,
          trackLinks: true,
          accurateTrackBounce: true,
          webvisor: true,
          trackHash: true,
          ecommerce: 'dataLayer',
        })
      } catch (e) {}
    })
    const n = d.getElementsByTagName('script')[0]
    const x = 'https://cdn.jsdelivr.net/npm/yandex-metrica-watch/watch.js'
    const s = d.createElement('script')
    const f = function () {
      n.parentNode.insertBefore(s, n)
    }
    for (let i = 0; i < document.scripts.length; i++) {
      if (document.scripts[i].src === x) {
        return
      }
    }
    s.type = 'text/javascript'
    s.async = true
    s.src = x
    if (w.opera == '[object Opera]') {
      d.addEventListener('DOMContentLoaded', f, false)
    } else {
      f()
    }
  })(document, window, 'yandex_metrika_callbacks')
})
</script>
