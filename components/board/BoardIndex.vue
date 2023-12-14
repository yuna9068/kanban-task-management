<script lang="ts" setup>
import { VueDraggable } from 'vue-draggable-plus'

const boardStore = useBoardStore()
const { getBoard } = storeToRefs(boardStore)

const isDragging = ref(false)

const hasColumn = computed(() => getBoard.value.columns.length)

/**
 * 隨機產生 0 ~ 255 之間的數值
 */
function getRandomInt() {
  return Math.floor(Math.random() * 255)
}

/**
 * 回傳欄位名稱前圓圈的顏色
 */
function circleColor(idx: number) {
  const list = ['rgb(73, 196, 229)', 'rgb(132, 113, 242)', 'rgb(103, 226, 174)']
  const result = idx < list.length ? list[idx] : `rgb(${getRandomInt()}, ${getRandomInt()}, ${getRandomInt()})`
  return result
}

/**
 * 拖拉欄位時不顯示欄位完整名稱
 * @param dragging 是否正在進行拖拉
 */
function hidePopover(dragging: boolean) {
  isDragging.value = dragging
}
</script>

<template>
  <section class="board">
    <h3 class="sr-only">
      {{ getBoard.name }}
    </h3>

    <template v-if="hasColumn">
      <VueDraggable
        v-model="getBoard.columns"
        tag="ul"
        class="list"
        group="columns"
        handle=".column-title-text"
        @start="hidePopover(true)"
        @end="hidePopover(false)"
      >
        <li
          v-for="(column, idx) in getBoard.columns"
          :key="column.name"
          class="item"
        >
          <BoardColumn
            v-model="getBoard.columns[idx]"
            :column-idx="idx"
            :color="circleColor(idx)"
            :is-dragging="isDragging"
          />
        </li>
        <li>
          <BoardColumn :create="true" />
        </li>
      </VueDraggable>
    </template>

    <BoardColumnEmpty v-else />
  </section>
</template>

<style lang="scss" scoped>
.board {
  padding: 24px;
  overflow: scroll;
}

.list {
  display: flex;
  gap: 24px;
  min-height: 100%;
}
</style>
