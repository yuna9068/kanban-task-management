import initialData from '@/assets/data/boards.json'
import type { Board, Operation } from '@/types'

export const useBoardStore = defineStore('board', () => {
  const boardList: Ref<Board[]> = ref([...initialData.boards])
  const selectedBoardIdx = ref(0)
  const modal = ref({
    display: false,
    type: '',
  })

  const getBoardList = computed(() => boardList.value)
  const getBoard = computed(() => boardList.value[selectedBoardIdx.value])
  const getModalBoardInfo = computed(() => modal.value)

  /**
   * 開啟看板 Modal
   * @param type create 新增 | edit 編輯
   */
  function openModalBoard(type: Operation) {
    modal.value.type = type
    modal.value.display = true
  }

  /**
   * 關閉看板 Modal
   */
  function closeModalBoard() {
    modal.value.display = false
  }

  /**
   * 新增看板
   * @param newName 看板名稱
   * @param newColumns 看板欄位
   */
  function createBoard(newName: string, newColumns: string[]) {
    const columns = newColumns.map(item => ({ name: item, tasks: [] }))
    boardList.value.push({
      name: newName,
      columns,
    })

    selectedBoardIdx.value = boardList.value.length - 1
    closeModalBoard()
  }

  /**
   * 編輯目前查看的看板
   * @param newName 看板名稱
   * @param newColumns  看板欄位
   */
  function editBoard(newName: string, newColumns: string[]) {
    boardList.value[selectedBoardIdx.value].name = newName

    newColumns.forEach((newColumnName, newColumnIdx) => {
      const originColumn = boardList.value[selectedBoardIdx.value].columns[newColumnIdx]
      if (originColumn) {
        originColumn.name = newColumnName
      }
      else {
        boardList.value[selectedBoardIdx.value].columns.push({
          name: newColumnName,
          tasks: [],
        })
      }
    })

    closeModalBoard()
  }

  /**
   * 刪除目前查看的看板
   */
  function deleteBoard() {
    boardList.value.splice(selectedBoardIdx.value, 1)
    if (!boardList.value[selectedBoardIdx.value])
      selectedBoardIdx.value = boardList.value.length - 1
  }

  /**
   * 重置看板資料
   */
  function resetBoardData() {
    boardList.value = [...initialData.boards]
  }

  return {
    boardList,
    selectedBoardIdx,
    getBoardList,
    getBoard,
    getModalBoardInfo,
    openModalBoard,
    closeModalBoard,
    createBoard,
    editBoard,
    deleteBoard,
    resetBoardData,
  }
})
