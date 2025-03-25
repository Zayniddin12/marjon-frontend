import { defineStore } from 'pinia'

export const useAboutStore = defineStore('about', () => {
  const dataAbout = ref()

  const socials = computed(() => [
    {
      name: 'Facebook',
      icon: 'icon-facebook',
      link: dataAbout?.value?.facebook,
    },
    {
      name: 'Instagram',
      icon: 'icon-instagram',
      link: dataAbout?.value?.instagram,
    },
    {
      name: 'Telegram',
      icon: 'icon-telegram',
      link: dataAbout?.value?.telegram,
    },
    {
      name: 'Youtube',
      icon: 'icon-youtube',
      link: dataAbout?.value?.youtube,
    },
  ])

  function getAbout() {
    useApi()
      .$get('common/AboutUs/')
      .then((res) => {
        dataAbout.value = res
      })
  }

  return {
    dataAbout,
    getAbout,
    socials,
  }
})
