const BASE_URL = import.meta.env.VITE_API_BASE_URL

export default async () => {
  if (process.client) {
    const data = await fetch(`${BASE_URL}common/FrontendTranslations/`, {
      headers: {
        'Accept-Language': useCookie('i18n_redirected').value,
      },
    })

    return await data.json()
  } else {
    return {}
  }
}
