import initialData from '@/assets/data/boards.json'
import type { Board, Operation } from '@/types'

interface Selected {
  boardIdx: number
  columnIdx: number
  taskIdx: number
}

export const useBoardStore = defineStore('board', () => {
  const boardList: Ref<Board[]> = ref([...initialData.boards])
  const selected: Ref<Selected> = ref({
    boardIdx: 0,
    columnIdx: 0,
    taskIdx: 0,
  })
  const modal = ref({
    display: false,
    type: '',
    addNewColumn: false,
  })

  const getEmptyBoard: Ref<Board> = computed(() => ({
    name: '',
    columns: [
      { name: 'Todo', tasks: [] },
      { name: 'Doing', tasks: [] },
    ],
  }))
  const getBoardList = computed(() => boardList.value)
  const getBoard = computed(() => boardList.value[selected.value.boardIdx])
  const getBoardColumnsNameList = computed(() => getBoard.value.columns.map(item => item.name))
  const getModalBoardInfo = computed(() => modal.value)
  const getSelected = computed(() => selected.value)

  /**
   * 更新目前選擇的項目
   * @param selected
   * @param selected.boardIdx 看板 index
   * @param selected.columnIdx 欄位 index
   * @param selected.taskIdx 任務 index
   */
  function updateSelected({ boardIdx, columnIdx, taskIdx }: { boardIdx?: number; columnIdx?: number; taskIdx?: number }) {
    if (typeof boardIdx === 'number')
      selected.value.boardIdx = boardIdx

    if (typeof columnIdx === 'number')
      selected.value.columnIdx = columnIdx

    if (typeof taskIdx === 'number')
      selected.value.taskIdx = taskIdx
  }

  /**
   * 開啟看板 Modal
   * @param type create 新增 | edit 編輯
   * @param addNewColumn 是否要在開啟看板 Modal 時新增一個空白欄位
   */
  function openModalBoard(type: Operation, addNewColumn: boolean = false) {
    modal.value.type = type
    modal.value.display = true
    modal.value.addNewColumn = addNewColumn
  }

  /**
   * 關閉看板 Modal
   */
  function closeModalBoard() {
    modal.value.display = false
  }

  /**
   * 新增看板
   * @param newBoard 看板資訊
   */
  function createBoard(newBoard: Board) {
    boardList.value.push(newBoard)
    updateSelected({ boardIdx: boardList.value.length - 1 })

    closeModalBoard()
  }

  /**
   * 編輯目前查看的看板
   * @param newBoard 看板資訊
   */
  function editBoard(newBoard: Board) {
    boardList.value[selected.value.boardIdx] = newBoard

    closeModalBoard()
  }

  /**
   * 刪除目前查看的看板
   */
  function deleteBoard() {
    boardList.value.splice(selected.value.boardIdx, 1)
    if (!getBoard.value)
      updateSelected({ boardIdx: boardList.value.length - 1 })
  }

  /**
   * 重置看板資料
   */
  function resetBoardData() {
    boardList.value = [...initialData.boards]
  }

  /**
   * 點擊 "Add New Column" 後開啟看板 Modal 並新增空白欄位
   */
  function addNewColumn() {
    openModalBoard('edit', true)
  }

  return {
    boardList,
    getEmptyBoard,
    getBoardList,
    getBoard,
    getBoardColumnsNameList,
    getModalBoardInfo,
    getSelected,
    updateSelected,
    openModalBoard,
    closeModalBoard,
    createBoard,
    editBoard,
    deleteBoard,
    resetBoardData,
    addNewColumn,
  }
})
