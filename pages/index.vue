<script lang="ts" setup>
import { useLocalStorage } from '@vueuse/core'
import initialData from '@/assets/data/boards.json'

const router = useRouter()

const boardStore = useBoardStore()
const sidebarStore = useSidebarStore()
const taskStore = useTaskStore()
const alertStore = useAlertStore()
const { setBoardData, closeModalBoard } = boardStore
const { closeSidebar } = sidebarStore
const { closeModalTaskDetail, closeModalTaskEdit } = taskStore
const { openModalAlert } = alertStore
const {
  getIsLoading,
  getModalBoardInfo,
  getBoardList,
  getBoard,
} = storeToRefs(boardStore)
const { getModalTaskDetail, getModalTaskEdit } = storeToRefs(taskStore)

const storage = useLocalStorage('board', [...initialData.boards])
const { isMobile } = useDevice()

const toPagePath = ref('')

const isEditing = computed(() => (
  getModalBoardInfo.value.display
  || getModalTaskDetail.value.display
  || getModalTaskEdit.value.display
))

useSeoMeta({
  title: () => getBoard.value?.name,
  ogTitle: 'Index',
})

boardStore.$subscribe((mutate, state) => {
  storage.value = state.boardList
})

/**
 * 前往頁面
 */
function goToPage() {
  router.push(toPagePath.value)
}

/**
 * 關閉所有 Modal，手機版要關 sidebar
 */
function closeAllModal() {
  closeModalBoard()
  closeModalTaskDetail()
  closeModalTaskEdit()

  if (isMobile.value)
    closeSidebar()
}

/**
 * 顯示警示訊息：用於正在編輯看板或任務時跳轉頁面
 */
function openAlert() {
  openModalAlert({
    title: 'Leave this page',
    content: 'Are you sure you want to leave? Changes you made may not be saved.',
    destructiveText: 'Leave',
    onDestructive: () => {
      closeAllModal()
      goToPage()
    },
  })
}

/**
 * 關閉網頁、上一頁、下一頁、重整頁面時確認是否正在編輯看板或任務
 * @param e BeforeUnloadEvent
 */
function beforeunload(e: BeforeUnloadEvent) {
  if (isEditing.value) {
    e.preventDefault()
    e.returnValue = ''
  }
}

onMounted(() => {
  setBoardData(storage.value)
  window.addEventListener('beforeunload', beforeunload)
})

onUnmounted(() => {
  window.removeEventListener('beforeunload', beforeunload)
})

onBeforeRouteLeave((to) => {
  toPagePath.value = to.path

  if (isEditing.value) {
    openAlert()
    return false
  }
  else {
    closeAllModal()
  }
})
</script>

<template>
  <div class="index">
    <BoardLoading v-if="getIsLoading" />
    <main v-else class="main">
      <SidebarIndex />

      <BoardIndex v-if="getBoardList.length" class="main-board" />
      <BoardEmpty v-else class="main-board" />
    </main>
    <BoardModal />
    <TaskEditModal v-if="getBoardList.length" />
    <TaskDetailModal v-if="getBoardList.length" />
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
