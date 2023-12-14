import initialData from '@/assets/data/boards.json'
import type { Board, Column, Operation, ValidateResult } from '@/types'

interface Selected {
  boardIdx: number
  boardName: string
  columnIdx: number
  taskIdx: number
}

export const useBoardStore = defineStore('board', () => {
  const isLoading = ref(true)
  const boardList: Ref<Board[]> = ref([{ name: '', columns: [] }])

  const selected: Ref<Selected> = ref({
    boardIdx: 0,
    boardName: '',
    columnIdx: 0,
    taskIdx: 0,
  })
  const modal = ref({
    display: false,
    type: '',
    addNewColumn: false,
  })

  const getIsLoading = computed(() => isLoading.value)
  const getEmptyBoard: Ref<Board> = computed(() => ({
    name: '',
    columns: [
      { name: 'Todo', tasks: [] },
      { name: 'Doing', tasks: [] },
    ],
  }))
  const getBoardList = computed(() => boardList.value)
  const getBoard = computed(() => boardList.value[selected.value.boardIdx])
  const getBoardColumnsNameList = computed(() => getBoard.value?.columns.map(item => item.name))
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
    if (typeof boardIdx === 'number') {
      selected.value.boardIdx = boardIdx
      selected.value.boardName = getBoard.value?.name ?? ''
    }

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
   * 刪除目前查看的看板，並更新選擇查看的看板 index
   */
  function deleteBoard() {
    let selectedBoardIdx = selected.value.boardIdx
    boardList.value.splice(selectedBoardIdx, 1)

    if (!getBoard.value)
      selectedBoardIdx = boardList.value.length - 1

    if (selectedBoardIdx < 0)
      selectedBoardIdx = 0

    updateSelected({ boardIdx: selectedBoardIdx })
  }

  /**
   * 設定看板資料
   * @param newData 欲設置的看板資料
   */
  function setBoardData(newData: Board[]) {
    isLoading.value = true

    boardList.value = newData

    updateSelected({
      boardIdx: 0,
      columnIdx: 0,
      taskIdx: 0,
    })

    isLoading.value = false
  }

  /**
   * 重設看板資料
   */
  function resetBoard() {
    setBoardData(initialData.boards)
  }

  /**
   * 點擊 "Add New Column" 後開啟看板 Modal 並新增空白欄位
   */
  function addNewColumn() {
    openModalBoard('edit', true)
  }

  /**
   * 檢查看板名稱是否重複命名
   * @param inputValue 使用者輸入的值
   * @returns {ValidateResult} 回傳驗證狀態及訊息。
   *          status 為 true 代表通過驗證,
   *          msg 訊息
   */
  function validateBoardName(inputValue: string, edit = true): ValidateResult {
    const sourceName = getBoard.value?.name
    let boardNameList = getBoardList.value.map(board => board.name)

    if (edit)
      boardNameList = boardNameList.filter(name => name !== sourceName)

    const status = !boardNameList.includes(inputValue)
    const msg = status ? '' : 'Duplicate name'

    return { status, msg }
  }

  /**
   * 檢查看板內的欄位名稱是否重複命名
   * @param list 使用者目前輸入的欄位名稱清單
   * @returns {ValidateResult} 回傳驗證狀態及訊息。
   *          status 為 true 代表通過驗證,
   *          msg 訊息
   */
  function validateColumnName(list: Column[]): ValidateResult {
    const columnsName = list.map(item => item.name)
    const duplicateList = columnsName.filter((item, itemIdx) => columnsName.indexOf(item) !== itemIdx)
    const status = duplicateList.length < 1
    const msg = status ? '' : 'Duplicate name'

    return { status, msg }
  }

  return {
    boardList,
    getIsLoading,
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
    setBoardData,
    resetBoard,
    addNewColumn,
    validateBoardName,
    validateColumnName,
  }
})
