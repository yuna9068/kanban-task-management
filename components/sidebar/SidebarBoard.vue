<script lang="ts" setup>
const boardStore = useBoardStore()
const sidebarStore = useSidebarStore()
const alertStore = useAlertStore()
const { openModalBoard, updateSelected } = boardStore
const { toggleSidebar } = sidebarStore
const { openModalAlert } = alertStore
const { getBoardList, getSelected } = storeToRefs(boardStore)

const { isMobile } = useDevice()

const sum = computed(() => getBoardList.value.length)

/**
 * 判斷是否為目前查看的看板
 * @param idx 看板的 index
 */
function isSelected(idx: number) {
  return idx === getSelected.value.boardIdx
}

/**
 * 選擇要查看的看板
 * @param idx 欲查看的 index
 */
function selectBoard(idx: number) {
  if (isMobile.value)
    toggleSidebar(false)

  updateSelected({ boardIdx: idx })
}

/**
 * 開啟看板 Modal 新增看板
 */
function createBoard() {
  if (isMobile.value)
    toggleSidebar(false)

  openModalBoard('create')
}

/**
 * 使用者點擊 "Reset Board Data" 後開啟警告 Modal
 */
function resetData() {
  if (isMobile.value)
    toggleSidebar(false)

  openModalAlert('reset', 'All')
}
</script>

<template>
  <section class="section section-board">
    <div class="section-container">
      <h2 class="board-title heading-s">
        ALL BOARDS ({{ sum }})
      </h2>

      <ul class="board-list">
        <li class="board-item">
          <button
            v-for="(board, idx) in getBoardList"
            :key="board.name"
            class="board-btn btn-lg"
            :class="{ 'btn-primary': isSelected(idx), 'btn-sidebar-board': !isSelected(idx) }"
            :disabled="isSelected(idx)"
            @click="selectBoard(idx)"
          >
            <SvgoIconBoard class="board-btn-icon" />
            <span class="board-btn-text">{{ board.name }}</span>
          </button>

          <button class="board-btn board-btn-create btn-lg btn-sidebar-board" @click="createBoard">
            <SvgoIconBoard class="board-btn-icon" />
            <span class="board-btn-text">+ Create New Board</span>
          </button>

          <button class="board-btn btn-lg btn-destructive" @click="resetData()">
            <SvgoIconBoard class="board-btn-icon" />
            <span class="board-btn-text">Reset Board Data</span>
          </button>
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss" scoped>
button[disabled] {
  opacity: 1;
}

.section-board .section-container {
  padding-left: 0;
}

.board {
  &-title {
    padding-inline: var(--sidebar-board-padding-inline);
    color: var(--text-secondary-color);
  }

  &-list {
    padding: 19px 0 16px;
  }
}

.board-btn {
  display: flex;
  align-items: center;
  padding-inline: var(--sidebar-board-padding-inline);
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &-create {
    color: $primary;
  }

  &-icon {
    width: 16px;
    height: 16px;
    margin-right: 12px;
  }

  &-text {
    flex: 1;
  }
}
</style>
