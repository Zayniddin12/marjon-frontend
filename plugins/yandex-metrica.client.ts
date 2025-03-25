export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.env.VITE_APP_MODE !== 'local') {
    // First Yandex.Metrika script
    ;(function (e, x, pe, r, i, me, nt) {
      ;(e[i] =
        e[i] ||
        function () {
          ;(e[i].a = e[i].a || []).push(arguments)
        }),
        (me = x.createElement(pe)),
        (me.async = 1),
        (me.src = r),
        (nt = x.getElementsByTagName(pe)[0]),
        nt.parentNode.insertBefore(me, nt)
    })(
      window,
      document,
      'script',
      'https://abt.s3.yandex.net/expjs/latest/exp.js',
      'ymab'
    )

    ymab(`metrika.${import.meta.env.VITE_YANDEX_METRIKA_ID}`, 'init')

    // Second Yandex.Metrika script
    ;(function (m, e, t, r, i, k, a) {
      m[i] =
        m[i] ||
        function () {
          ;(m[i].a = m[i].a || []).push(arguments)
        }
      m[i].l = 1 * new Date()
      for (let j = 0; j < document.scripts.length; j++) {
        if (document.scripts[j].src === r) {
          return
        }
      }
      k = e.createElement(t)
      a = e.getElementsByTagName(t)[0]
      k.async = 1
      k.src = r
      a.parentNode.insertBefore(k, a)
    })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym')

    ym(import.meta.env.VITE_YANDEX_METRIKA_ID, 'init', {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true,
    })
  }
})
