import type { AlertType } from '@/types'

export const useAlertStore = defineStore('alert', () => {
  const boardStore = useBoardStore()
  const { deleteBoard } = boardStore

  const modal = ref({
    display: false,
    type: '',
    title: '',
    content: '',
  })

  const isBoard = computed(() => modal.value.type === 'board')
  const getModalAlertInfo = computed(() => modal.value)

  /**
   * 開啟警告 Modal
   * @param type board 看板 | task 任務
   * @param name 欲刪除的名稱
   */
  function openModalAlert(type: AlertType, name: string) {
    modal.value.type = type
    modal.value.title = `Delete this ${type}?`
    modal.value.content = isBoard.value
      ? `Are you sure you want to delete the ‘${name}’ board? This action will remove all columns and tasks and cannot be reversed.`
      : `Are you sure you want to delete the ‘${name}’ task and its subtasks? This action cannot be reversed.`

    modal.value.display = true
  }

  /**
   * 關閉警告 Modal
   */
  function closeModalAlert() {
    modal.value.display = false
  }

  /**
   * 刪除指定的看板或任務
   */
  function deleteItem() {
    if (isBoard.value)
      deleteBoard()

    else
      console.warn('delete task')

    closeModalAlert()
  }

  return {
    getModalAlertInfo,
    openModalAlert,
    closeModalAlert,
    deleteItem,
  }
})
