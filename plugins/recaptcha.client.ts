import { VueReCaptcha } from 'vue-recaptcha-v3'
import { IReCaptchaOptions } from 'vue-recaptcha-v3/dist/IReCaptchaOptions'

export default defineNuxtPlugin((nuxtApp) => {
  // The useRuntimeConfig function is called to retrieve the runtime
  // configuration of the Nuxt.js application.

  // const options: IReCaptchaOptions = {
  //   siteKey:
  //     import.meta.env.VITE_APP_SITE_KEY ||
  //     '6LcTLDgpAAAAALcj5kscYL7fHcd2v3nu2dDbfO8G',
  //   loaderOptions: {
  //     useRecaptchaNet: false,
  //   },
  // }
  // nuxtApp.vueApp.use(VueReCaptcha, options)
})
