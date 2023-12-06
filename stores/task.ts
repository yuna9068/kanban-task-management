import type { Operation, Task } from '@/types'

export const useTaskStore = defineStore('task', () => {
  const boardStore = useBoardStore()
  const { boardList, selectedBoardIdx } = storeToRefs(boardStore)

  const taskList: Ref<Task[]> = ref([])
  const selectedColumnIdx = ref(0)
  const selectedTaskIdx = ref(0)
  const modalTaskEdit = ref({
    display: false,
    type: '',
    columns: computed(() => boardList.value[selectedBoardIdx.value].columns.map(item => item.name)),
  })

  const getTaskList = computed(() => taskList.value)
  const getTask = computed(() => taskList.value[selectedTaskIdx.value])
  const getModalTaskEdit = computed(() => modalTaskEdit.value)

  /**
   * 開啟任務編輯 Modal
   * @param type create 新增 | edit 編輯
   */
  function openModalTaskEdit(type: Operation) {
    modalTaskEdit.value.type = type
    modalTaskEdit.value.display = true
  }

  /**
   * 關閉任務編輯 Modal
   */
  function closeModalTaskEdit() {
    modalTaskEdit.value.display = false
  }

  /**
   * 新增任務
   * @param newTask 任務資訊
   */
  function createTask(newTask: Task) {
    const column = newTask.status
    const columnIdx = boardList.value[selectedBoardIdx.value].columns.findIndex(item => item.name === column)
    boardList.value[selectedBoardIdx.value].columns[columnIdx].tasks.push(newTask)

    closeModalTaskEdit()
  }

  /**
   * 刪除目前查看的任務
   */
  function deleteTask() {
    boardList.value[selectedBoardIdx.value].columns[selectedColumnIdx.value].tasks.splice(selectedTaskIdx.value, 1)
  }

  /**
   * 編輯目前查看的任務
   * @param newTask 任務資訊
   */
  function editTask(newTask: Task) {
    const selectedColumnName = boardList.value[selectedBoardIdx.value].columns[selectedColumnIdx.value].name
    const newTaskColumnName = newTask.status

    if (selectedColumnName === newTaskColumnName) {
      boardList.value[selectedBoardIdx.value].columns[selectedColumnIdx.value].tasks[selectedTaskIdx.value] = newTask
    }
    else {
      deleteTask()
      const newColumnIdx = boardList.value[selectedBoardIdx.value].columns.findIndex(column => column.name === newTaskColumnName)
      boardList.value[selectedBoardIdx.value].columns[newColumnIdx].tasks.push(newTask)
    }

    closeModalTaskEdit()
  }

  return {
    getTaskList,
    getTask,
    getModalTaskEdit,
    openModalTaskEdit,
    closeModalTaskEdit,
    createTask,
    editTask,
    deleteTask,
  }
})
