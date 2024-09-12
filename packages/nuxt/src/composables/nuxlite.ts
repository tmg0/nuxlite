import { createGlobalState } from '@vueuse/core'
import { ref } from 'vue'

export const useNuxlite = createGlobalState(() => {
  const processingMiddleware = ref(false)

  return {
    processingMiddleware,
  }
})
