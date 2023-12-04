import { useToggle } from '@vueuse/core'

export const useSidebarStore = defineStore('sidebar', () => {
  const sidebarDisplay = ref(false)

  const getSidebarDisplay = computed(() => sidebarDisplay.value)

  const toggleSidebar = useToggle(sidebarDisplay)

  return {
    getSidebarDisplay,
    toggleSidebar,
  }
})
