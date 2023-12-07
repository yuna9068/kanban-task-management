import type { Operation, Task } from '@/types'

export const useTaskStore = defineStore('task', () => {
  const boardStore = useBoardStore()
  const {
    boardList,
    selectedBoardIdx,
    getBoardColumnsNameList,
  } = storeToRefs(boardStore)

  const selectedColumnIdx = ref(0)
  const selectedTaskIdx = ref(0)
  const modalTaskEdit = ref({
    display: false,
    type: '',
  })
  const modalTaskDetail = ref({
    display: false,
  })

  const getEmptyTask = computed(() => ({
    title: '',
    description: '',
    status: getBoardColumnsNameList.value[0],
    subtasks: [
      {
        title: '',
        isCompleted: false,
      },
      {
        title: '',
        isCompleted: false,
      },
    ],
  }))
  const getTask = computed(() =>
    (
      boardList.value[selectedBoardIdx.value].columns[selectedColumnIdx.value]?.tasks[selectedTaskIdx.value]
      ?? getEmptyTask.value
    ),
  )
  const getModalTaskEdit = computed(() => modalTaskEdit.value)
  const getModalTaskDetail = computed(() => modalTaskDetail.value)

  /**
   * 開啟任務詳情 Modal
   * @param columnIdx 欄位 index
   * @param taskIdx 任務 index
   */
  function openModalTaskDetail(columnIdx: number, taskIdx: number) {
    selectedColumnIdx.value = columnIdx
    selectedTaskIdx.value = taskIdx
    modalTaskDetail.value.display = true
  }

  /**
   * 關閉任務詳情 Modal，並更新任務詳情
   */
  function closeModalTaskDetail(newTask: Task) {
    editTask(newTask)
    modalTaskDetail.value.display = false
  }

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
    let newTaskColumnName = newTask.status

    // 若 status 無值，則填入目前欄位名稱
    if (!newTaskColumnName) {
      newTaskColumnName = selectedColumnName
      newTask.status = selectedColumnName
    }

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
    getEmptyTask,
    getTask,
    getModalTaskDetail,
    getModalTaskEdit,
    openModalTaskDetail,
    closeModalTaskDetail,
    openModalTaskEdit,
    closeModalTaskEdit,
    createTask,
    editTask,
    deleteTask,
  }
})
