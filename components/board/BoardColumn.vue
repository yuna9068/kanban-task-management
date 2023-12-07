<script lang="ts" setup>
import type { Column } from '@/types'

interface Props {
  column?: Column
  columnIdx?: number
  color?: string
  create?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  column: () => ({ name: '', tasks: [] }),
  color: '#635FC7',
  create: false,
})

const boardStore = useBoardStore()
const taskStore = useTaskStore()
const { addNewColumn } = boardStore
const { openModalTaskDetail } = taskStore

/**
 * 開啟任務詳情 Modal
 */
function viewTaskDetail(taskIdx: number) {
  if (typeof props.columnIdx === 'number' && typeof taskIdx === 'number')
    openModalTaskDetail(props.columnIdx, taskIdx)
}
</script>

<template>
  <section class="column">
    <h4 class="column-title heading-s">
      <p
        v-if="!create"
        class="column-title-text"
      >
        {{ column.name }}({{ column.tasks?.length }})
      </p>
    </h4>

    <button
      v-if="create"
      class="column-create"
      @click="addNewColumn()"
    >
      <p class="column-create-text heading-xl">
        + New Column
      </p>
    </button>

    <ul
      v-else
      class="column-list"
    >
      <li
        v-for="(task, idx) in column.tasks"
        :key="task.title"
        class="column-item"
        @click="viewTaskDetail(idx)"
      >
        <TaskCard :task="task" />
      </li>
    </ul>
  </section>
</template>

<style lang="scss" scoped>
.column {
  $title-height: 39px;

  width: 280px;
  height: 100%;

  &-title {
    height: $title-height;

    &-text {
      color: var(--text-secondary-color);

      &::before {
        content: "";
        display: inline-block;
        width: 15px;
        aspect-ratio: 1 / 1;
        margin-right: 12px;
        border-radius: 50%;
        background: v-bind('props.color');
        vertical-align: middle;
      }
    }
  }

  &-create {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: calc(100% - $title-height);
    border-radius: 6px;
    background: linear-gradient(180deg, #E9EFFA 0%, rgba(233, 239, 250, 0.5) 100%);
    cursor: pointer;

    &:hover &-text {
      color: $primary;
    }

    &-text {
      color: var(--text-secondary-color);
    }
  }
}
</style>
