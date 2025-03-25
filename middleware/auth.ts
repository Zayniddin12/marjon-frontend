import { useAuthStore } from '~/store/auth'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore()
  const tokens = authStore.getTokens()
  if (!tokens?.value.access || !tokens?.value.refresh) {
    return navigateTo('/')
  }
  // await authStore.refreshTokens()
  // return abortNavigation()
})
