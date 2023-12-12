<script lang="ts" setup>
import { VueDraggable } from 'vue-draggable-plus'
import type { SortableEvent } from 'sortablejs'
import { useVModels } from '@vueuse/core'
import type { Column } from '@/types'

interface Props {
  modelValue?: Column
  columnIdx?: number
  color?: string
  create?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => ({ name: '', tasks: [] }),
  columnIdx: 0,
  color: '#635FC7',
  create: false,
})

const emits = defineEmits(['update:modelValue'])

const { modelValue } = useVModels(props, emits)

const boardStore = useBoardStore()
const taskStore = useTaskStore()
const { addNewColumn } = boardStore
const { openModalTaskDetail, syncTaskStatus } = taskStore

/**
 * 開啟任務詳情 Modal
 */
function viewTaskDetail(taskIdx: number) {
  if (typeof props.columnIdx === 'number' && typeof taskIdx === 'number')
    openModalTaskDetail(props.columnIdx, taskIdx)
}

/**
 * 拖拉任務改變狀態時更新任務的 status 值
 * @param event SortableEvent
 */
function dragAdd(event: SortableEvent) {
  syncTaskStatus(event.to.dataset.column)
}
</script>

<template>
  <section class="column">
    <h4 class="column-title heading-s">
      <p
        v-if="!create"
        class="column-title-text"
      >
        {{ modelValue.name }}({{ modelValue.tasks?.length }})
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

    <VueDraggable
      v-else
      v-model="modelValue.tasks"
      tag="ul"
      class="column-list"
      group="tasks"
      handle=".column-item"
      :fallback-tolerance="5"
      :data-column="modelValue.name"
      @add="dragAdd"
    >
      <li
        v-for="(task, idx) in modelValue.tasks"
        :key="task.title"
        class="column-item"
      >
        <TaskCard
          :task="task"
          @click.stop="viewTaskDetail(idx)"
        />
      </li>
    </VueDraggable>
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
      cursor: grab;

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
