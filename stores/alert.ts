import type { AlertType } from '@/types'

export const useAlertStore = defineStore('alert', () => {
  const boardStore = useBoardStore()
  const taskStore = useTaskStore()
  const { deleteBoard, setBoardData } = boardStore
  const { deleteTask } = taskStore

  const modal = ref({
    display: false,
    type: '',
    title: '',
    content: '',
  })

  const getModalAlertInfo = computed(() => modal.value)

  /**
   * 產生警示訊息
   * @param name 欲刪除的名稱
   * @returns 訊息
   */
  function generateContent(name: string) {
    let result = ''
    switch (modal.value.type) {
      case 'board':
        result = `Are you sure you want to delete the ‘${name}’ board? This action will remove all columns and tasks and cannot be reversed.`
        break

      case 'task':
        result = `Are you sure you want to delete the ‘${name}’ task and its subtasks? This action cannot be reversed.`
        break

      case 'reset':
        result = `Are you sure you want to reset board data? This action cannot be reversed.`
        break

      default:
        break
    }

    return result
  }
  /**
   * 開啟警告 Modal
   * @param type board 看板 | task 任務 | reset 重置看板資料
   * @param name 欲刪除的名稱
   */
  function openModalAlert(type: AlertType, name: string) {
    modal.value.type = type
    modal.value.title = type === 'reset' ? 'Reset Board Data' : `Delete this ${type}?`
    modal.value.content = generateContent(name)
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
    switch (modal.value.type) {
      case 'board':
        deleteBoard()
        break

      case 'task':
        deleteTask()
        break

      case 'reset':
        setBoardData()
        break

      default:
        break
    }

    closeModalAlert()
  }

  return {
    getModalAlertInfo,
    openModalAlert,
    closeModalAlert,
    deleteItem,
  }
})
