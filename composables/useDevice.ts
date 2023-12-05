import { useMediaQuery } from '@vueuse/core'

export function useDevice() {
  // 判斷是否為手機寬度
  const isMobile = useMediaQuery('(max-width: 767px)')

  return {
    isMobile,
  }
}
