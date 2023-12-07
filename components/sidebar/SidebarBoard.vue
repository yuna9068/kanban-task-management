<script lang="ts" setup>
const boardStore = useBoardStore()
const sidebarStore = useSidebarStore()
const { openModalBoard, updateSelected } = boardStore
const { toggleSidebar } = sidebarStore
const { getBoardList, getSelected } = storeToRefs(boardStore)

const { isMobile } = useDevice()

const sum = computed(() => getBoardList.value.length)

function isSelected(idx: number) {
  return idx === getSelected.value.boardIdx
}

function selectBoard(idx: number) {
  if (isMobile.value)
    toggleSidebar(false)

  updateSelected({ boardIdx: idx })
}

function createBoard() {
  if (isMobile.value)
    toggleSidebar(false)

  openModalBoard('create')
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
