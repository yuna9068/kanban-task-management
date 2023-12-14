export const useAlertStore = defineStore('alert', () => {
  interface ModalAlertParams {
    title: string
    content: string
    destructiveText: string
    onDestructive: () => void
  }

  const modal = ref({
    display: false,
    title: '',
    content: '',
    destructiveText: '',
    onDestructive: () => {},
  })

  const getModalAlertInfo = computed(() => modal.value)

  /**
   * 開啟警告 Modal
   * @param info
   * @param info.title 標題
   * @param info.content 內文
   * @param info.destructiveText destructive 按鈕文字
   * @param info.onDestructive destructive function
   */
  function openModalAlert(info: ModalAlertParams) {
    modal.value.title = info.title
    modal.value.content = info.content
    modal.value.destructiveText = info.destructiveText
    modal.value.onDestructive = info.onDestructive
    modal.value.display = true
  }

  /**
   * 關閉警告 Modal
   */
  function closeModalAlert() {
    modal.value.display = false
  }

  return {
    getModalAlertInfo,
    openModalAlert,
    closeModalAlert,
  }
})
