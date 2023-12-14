import { useToggle } from '@vueuse/core'

export const useSidebarStore = defineStore('sidebar', () => {
  const sidebarDisplay = ref(false)

  const getSidebarDisplay = computed(() => sidebarDisplay.value)

  const toggleSidebar = useToggle(sidebarDisplay)

  /**
   * 關閉 Sidebar
   */
  function closeSidebar() {
    toggleSidebar(false)
  }

  return {
    getSidebarDisplay,
    toggleSidebar,
    closeSidebar,
  }
})
