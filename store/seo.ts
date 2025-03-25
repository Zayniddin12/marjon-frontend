import { defineStore } from 'pinia'

export const useSeoStore = defineStore('seo', () => {
  function getSeo(slug?: string) {
    return new Promise((resolve, reject) => {
      return useApi()
        .$get(`common/SEOText/${slug}`)
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  return { getSeo }
})
