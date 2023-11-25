export const useAlertStore = defineStore('alert', () => {
  const boardStore = useBoardStore()
  const { deleteBoard } = boardStore

  const display = ref(false)
  const type = ref('')
  const name = ref('')

  const isBoard = computed(() => type.value === 'board')
  const getDisplay = computed(() => display.value)
  const getTitle = computed(() => `Delete this ${type.value}?`)
  const getContent = computed(() => {
    const result = isBoard.value
      ? `Are you sure you want to delete the ‘${name.value}’ board? This action will remove all columns and tasks and cannot be reversed.`
      : `Are you sure you want to delete the ‘${name.value}’ task and its subtasks? This action cannot be reversed.`

    return result
  })

  function open(openType: string, openName: string) {
    type.value = openType
    name.value = openName
    display.value = true
  }

  function close() {
    display.value = false
  }

  function deleteItem() {
    if (isBoard.value)
      deleteBoard(name.value)

    else
      console.warn('delete task')

    close()
  }

  return {
    getDisplay,
    getTitle,
    getContent,
    open,
    close,
    deleteItem,
  }
})
