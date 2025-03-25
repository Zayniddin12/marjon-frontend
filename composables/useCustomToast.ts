import * as pkg from 'vue-toastification'

import Toast from '@/components/Common/Toast.vue'

const { useToast } = pkg

export const useCustomToast = () => {
  const toast = useToast()

  const showToast = (
    title: string,
    type: 'success' | 'error' | 'warning' | 'info'
  ) => {
    toast({
      component: Toast,
      props: {
        title,
        type,
      },
    })
  }

  return { showToast }
}
