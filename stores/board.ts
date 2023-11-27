import initialData from '@/assets/data/boards.json'
import type { Board, Column, ModalBoard } from '@/types'

export const useBoardStore = defineStore('board', () => {
  const boardList: Ref<Board[]> = ref([...initialData.boards])
  const board: Ref<Board> = ref(boardList.value[0])
  const modal: Ref<ModalBoard> = ref({
    display: false,
    type: '',
  })

  const getBoardList = computed(() => boardList.value)
  const getBoard = computed(() => board.value)
  const getModalInfo = computed(() => modal.value)

  function createBoard(newName: string, newColumns: string[]) {
    const columns = newColumns.map(item => ({ name: item }))
    boardList.value.push({
      name: newName,
      columns,
    })

    board.value = boardList.value[boardList.value.length - 1]
    modal.value.display = false
  }

  function editBoard(newName: string, newColumns: string[]) {
    const boardIdx = boardList.value.findIndex(board => board.name === getBoard.value.name)
    boardList.value[boardIdx].name = newName

    newColumns.forEach((column, columnIdx) => {
      const originColumn = boardList.value[boardIdx].columns[columnIdx]
      if (originColumn) {
        originColumn.name = column
      }
      else {
        boardList.value[boardIdx].columns.push({
          name: column,
          tasks: [],
        })
      }
    })

    modal.value.display = false
  }

  function deleteBoard(name: string) {
    const idx = boardList.value.findIndex(item => item.name === name)
    if (idx > -1) {
      boardList.value.splice(idx, 1)
      board.value = boardList.value[idx] ?? boardList.value[boardList.value.length - 1]
    }
  }

  function resetData() {
    boardList.value = [...initialData.boards]
  }

  function open(openType: string) {
    modal.value.type = openType
    modal.value.display = true
  }

  function close() {
    modal.value.display = false
  }

  return {
    getBoardList,
    getBoard,
    getModalInfo,
    createBoard,
    editBoard,
    deleteBoard,
    resetData,
    open,
    close,
  }
})
