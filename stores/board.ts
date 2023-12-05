import initialData from '@/assets/data/boards.json'
import type { Board, Column, Operation } from '@/types'

export const useBoardStore = defineStore('board', () => {
  const boardList: Ref<Board[]> = ref([...initialData.boards])
  const selectedBoardIdx = ref(0)
  const modal = ref({
    display: false,
    type: '',
    newColumn: false,
  })

  const getBoardList = computed(() => boardList.value)
  const getBoard = computed(() => boardList.value[selectedBoardIdx.value])
  const getModalBoardInfo = computed(() => modal.value)

  /**
   * 開啟看板 Modal
   * @param type create 新增 | edit 編輯
   * @param newColumn 是否要在開啟看板 Modal 時新增一個空白欄位
   */
  function openModalBoard(type: Operation, newColumn: boolean = false) {
    modal.value.type = type
    modal.value.display = true
    modal.value.newColumn = newColumn
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
  function createBoard(newName: string, newColumns: Column[]) {
    boardList.value.push({
      name: newName,
      columns: [...newColumns],
    })

    selectedBoardIdx.value = boardList.value.length - 1
    closeModalBoard()
  }

  /**
   * 編輯目前查看的看板
   * @param newName 看板名稱
   * @param newColumns  看板欄位
   */
  function editBoard(newName: string, newColumns: Column[]) {
    boardList.value[selectedBoardIdx.value].name = newName
    boardList.value[selectedBoardIdx.value].columns = [...newColumns]

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
   * 切換查看的看板
   * @param idx 欲查看的看板
   */
  function switchBoard(idx: number) {
    selectedBoardIdx.value = idx
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
    selectedBoardIdx,
    getBoardList,
    getBoard,
    getModalBoardInfo,
    openModalBoard,
    closeModalBoard,
    createBoard,
    editBoard,
    deleteBoard,
    switchBoard,
    resetBoardData,
    addNewColumn,
  }
})
