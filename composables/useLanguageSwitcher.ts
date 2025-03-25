import { useI18n } from 'vue-i18n'

export const useLanguageSwitcher = () => {
  const { locale: currentLocale, setLocaleMessage, setLocaleCookie } = useI18n()
  const cookieLocale = useCookie('i18n_redirected')
  const languagesList = [
    {
      name: "O'zbekcha",
      code: 'uz',
      flag: '/images/svg/flag/uz.svg',
    },
    {
      name: 'Русский',
      code: 'ru',
      flag: '/images/svg/flag/russian.svg',
    },
  ]

  const currentLanguage = computed(() =>
    languagesList.find((lang) => lang.code === currentLocale.value)
  )

  const setI18nParams = useSetI18nParams()

  async function changeLocale(_locale: string) {
    cookieLocale.value = _locale
    await setLocaleMessage(cookieLocale.value)
  }
  return { currentLanguage, languagesList, changeLocale }
}
