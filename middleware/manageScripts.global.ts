export default defineNuxtRouteMiddleware(async (to, from) => {
  function searchAmo() {
    if (process.client) {
      const intervalId = setInterval(() => {
        const amo = document?.querySelectorAll('.amo-button-holder')
        if (amo && amo.length) {
          clearInterval(intervalId)
          if (to.path === '/map') {
            if (amo?.length) {
              amo?.forEach((el) => {
                el.classList.add('!hidden')
              })
            }
          } else if (to.path !== '/map') {
            amo?.forEach((el) => {
              if (el.classList.contains('!hidden')) {
                el.classList.remove('!hidden')
              }
            })
          }
        }
      })
    }
  }

  searchAmo()
})
