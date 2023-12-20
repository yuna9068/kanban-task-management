<script lang="ts" setup>
import { VueDraggable } from 'vue-draggable-plus'
import type { SortableEvent } from 'sortablejs'
import { useVModels } from '@vueuse/core'
import { vElementHover } from '@vueuse/components'
import type { Column } from '@/types'

interface Props {
  modelValue?: Column
  columnIdx?: number
  color?: string
  create?: boolean
  isDragging?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => ({ name: '', tasks: [] }),
  columnIdx: 0,
  color: '#635FC7',
  create: false,
  isDragging: false,
})

const emits = defineEmits(['update:modelValue'])

const { modelValue } = useVModels(props, emits)

const boardStore = useBoardStore()
const taskStore = useTaskStore()
const { addNewColumn } = boardStore
const { openModalTaskDetail, syncTaskStatus } = taskStore

const displayFullName = ref(false)

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

/**
 * 是否顯示欄位完整名稱
 * @param state 顯示狀態
 */
function showFullColumnName(state: boolean) {
  if (props.isDragging) {
    displayFullName.value = false
    return
  }

  displayFullName.value = state
}
</script>

<template>
  <section class="column">
    <h4 class="column-title heading-s">
      <template v-if="!create">
        <p
          v-element-hover="showFullColumnName"
          class="column-title-text"
        >
          {{ modelValue.name }}({{ modelValue.tasks?.length }})
        </p>

        <p
          class="column-title-popover"
          :class="{ 'column-title-popover--active': displayFullName }"
        >
          {{ modelValue.name }}
        </p>
      </template>
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
      @include text-ellipsis;

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

    &-popover {
      width: 80%;
      margin: 0 auto;
      padding: 8px 10px;
      position: relative;
      border-radius: 8px;
      background: v-bind('props.color');
      color: var(--primary-bg);
      box-shadow: 0px 4px 6px 0px rgba(54, 78, 126, 0.10);
      filter: saturate(1.2);
      word-break: break-word;
      z-index: -1;
      translate: 0 20px;
      opacity: 0;
      transition: all 0.3s;

      &--active {
        z-index: 10;
        translate: 0 10px;
        opacity: 1;
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

    @at-root [data-theme="dark"] & {
      background: linear-gradient(180deg, rgba(43, 44, 55, 0.25) 0%, rgba(43, 44, 55, 0.13) 100%);
    }
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
