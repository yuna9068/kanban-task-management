import initialData from '@/assets/data/boards.json'

export const useBoardStore = defineStore('board', () => {
  const boardList = ref([...initialData.boards])
  const board = ref(boardList.value[0])

  const getBoardList = computed(() => boardList.value)
  const getBoard = computed(() => board.value)

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

  return {
    getBoardList,
    getBoard,
    deleteBoard,
    resetData,
  }
})
