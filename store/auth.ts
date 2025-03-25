import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<any>(null)
  const showLogout = ref(false)
  const showAuth = ref(false)
  const tokens = ref<any>({
    access: '',
    refresh: '',
  })

  function getUser() {
    return new Promise((resolve, reject) => {
      return useApi()
        .$get('/users/UserDetailWeb/')
        .then((res) => {
          user.value = res
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  function setTokens(payload: any) {
    if (payload?.access) {
      const access = useCookie('access_token')
      access.value = payload.access
      tokens.value.access = payload.access
    }
    if (payload?.refresh) {
      const refresh = useCookie('refresh_token')
      refresh.value = payload.refresh
      tokens.value.refresh = payload.refresh
    }
  }

  function getTokens() {
    const access = useCookie('access_token')
    const refresh = useCookie('refresh_token')
    tokens.value.access = access.value
    tokens.value.refresh = refresh.value
    return tokens
  }

  function logout() {
    const access = useCookie('access_token')
    const refresh = useCookie('refresh_token')
    access.value = undefined
    refresh.value = undefined
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    tokens.value.access = ''
    tokens.value.refresh = ''
    user.value = null
  }

  return {
    user,
    showLogout,
    showAuth,
    tokens,
    getTokens,
    setTokens,
    logout,
    getUser,
  }
})
