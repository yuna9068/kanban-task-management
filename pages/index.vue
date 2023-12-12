<script lang="ts" setup>
import { useLocalStorage } from '@vueuse/core'
import initialData from '@/assets/data/boards.json'

const boardStore = useBoardStore()
const { setBoardData } = boardStore
const { getIsLoading } = storeToRefs(boardStore)

const storage = useLocalStorage('board', [...initialData.boards])

boardStore.$subscribe((mutate, state) => {
  storage.value = state.boardList
})

onMounted(() => {
  setBoardData(storage.value)
})
</script>

<template>
  <div class="index">
    <BoardLoading v-if="getIsLoading" />
    <main v-else class="main">
      <SidebarIndex />
      <BoardIndex class="main-board" />
    </main>
    <BoardModal />
    <TaskEditModal />
    <TaskDetailModal />
    <BaseModalAlert />
  </div>
</template>

<style lang="scss" scoped>
.index {
  position: relative;
  overflow: scroll;
}

.main {
  height: 100%;
  display: flex;

  &-board {
    flex: 1;
  }
}
</style>
