import type { Operation, Subtask, Task, ValidateResult } from '@/types'

export const useTaskStore = defineStore('task', () => {
  const boardStore = useBoardStore()
  const { updateSelected } = boardStore
  const {
    boardList,
    getBoard,
    getSelected,
    getBoardColumnsNameList,
  } = storeToRefs(boardStore)

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
      getBoard.value.columns[getSelected.value.columnIdx]?.tasks[getSelected.value.taskIdx]
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
    updateSelected({ columnIdx, taskIdx })
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
    const columnIdx = getBoard.value.columns.findIndex(item => item.name === newTask.status)
    boardList.value[getSelected.value.boardIdx].columns[columnIdx].tasks.push(newTask)

    const taskIdx = getBoard.value.columns[columnIdx].tasks.length - 1
    updateSelected({ columnIdx, taskIdx })

    closeModalTaskEdit()
  }

  /**
   * 刪除目前查看的任務
   */
  function deleteTask() {
    boardList.value[getSelected.value.boardIdx]
      .columns[getSelected.value.columnIdx]
      .tasks.splice(getSelected.value.taskIdx, 1)
  }

  /**
   * 編輯目前查看的任務
   * @param newTask 任務資訊
   */
  function editTask(newTask: Task) {
    const selectedColumnName = getBoard.value.columns[getSelected.value.columnIdx].name

    if (selectedColumnName === newTask.status) {
      boardList.value[getSelected.value.boardIdx].columns[getSelected.value.columnIdx].tasks[getSelected.value.taskIdx] = newTask

      closeModalTaskEdit()
    }
    else {
      deleteTask()
      createTask(newTask)
    }
  }

  /**
   * 檢查看板內的任務名稱是否重複命名
   * @param inputValue 使用者輸入的值
   * @returns {ValidateResult} 回傳驗證狀態及訊息。
   *          status 為 true 代表通過驗證,
   *          msg 訊息
   */
  function validateTaskTitle(inputValue: string, edit = true): ValidateResult {
    const sourceTitle = getTask.value.title
    let taskTitleList: string[] = []
    getBoard.value.columns.forEach((column) => {
      const titleList = column.tasks.map(task => task.title)
      taskTitleList.push(...titleList)
    })

    if (edit)
      taskTitleList = taskTitleList.filter(title => title !== sourceTitle)

    const status = !taskTitleList.includes(inputValue)
    const msg = status ? '' : 'Duplicate title'

    return { status, msg }
  }

  /**
   * 檢查任務內的子任務名稱是否重複命名
   * @param list 使用者目前輸入的子任務名稱清單
   * @returns {ValidateResult} 回傳驗證狀態及訊息。
   *          status 為 true 代表通過驗證,
   *          msg 訊息
   */
  function validateSubtaskTitle(list: Subtask[]): ValidateResult {
    const subtasksTitle = list.map(item => item.title)
    const duplicateList = subtasksTitle.filter((item, itemIdx) => subtasksTitle.indexOf(item) !== itemIdx)
    const status = duplicateList.length < 1
    const msg = status ? '' : 'Duplicate title'

    return { status, msg }
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
    validateTaskTitle,
    validateSubtaskTitle,
  }
})
