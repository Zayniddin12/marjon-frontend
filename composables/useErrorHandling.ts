import { useI18n } from 'vue-i18n'

import { useCustomToast } from '~/composables/useCustomToast'

export function useErrorHandling() {
  const { showToast } = useCustomToast()
  const { t } = useI18n()

  function handleError(res: any) {
    if (res?.status === 500) {
      showToast('Server error', 'error')
    }
    showToast(t(res?._data?.errors?.[0]?.message), 'error')

    return { error: res?._data?.errors?.[0]?.message }
  }

  return { handleError }
}
