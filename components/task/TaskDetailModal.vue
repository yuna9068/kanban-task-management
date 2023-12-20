<script lang="ts" setup>
import { VueDraggable } from 'vue-draggable-plus'
import { vOnClickOutside } from '@vueuse/components'
import { type OnClickOutsideOptions, useCloned, useToggle } from '@vueuse/core'

const boardStore = useBoardStore()
const taskStore = useTaskStore()
const alertStore = useAlertStore()
const {
  openModalTaskEdit,
  closeModalTaskDetail,
  editTask,
  deleteTask,
} = taskStore
const { openModalAlert } = alertStore
const { getBoardColumnsNameList } = storeToRefs(boardStore)
const { getTask, getModalTaskDetail } = storeToRefs(taskStore)

const elHeaderFunctionBtn = ref()
const menuDisplay = ref(false)

const { cloned: task } = useCloned(getTask)
const toggleMenu = useToggle(menuDisplay)

const subtasksLabel = computed(() => {
  let result = 'Subtasks'

  if (task.value) {
    const completed = task.value.subtasks?.filter(subtask => subtask.isCompleted).length
    const total = task.value.subtasks?.length
    result = `Subtasks (${completed} of ${total})`
  }

  return result
})

const onClickOutsideHandler: [(evt: any) => void, OnClickOutsideOptions] = [
  () => {
    toggleMenu(false)
  },
  { ignore: [elHeaderFunctionBtn] },
]

/**
 * 關閉任務詳情 Modal 和 關閉操作看板下拉式選單，並更新任務詳情
 */
function closeModal() {
  toggleMenu(false)
  editTask(task.value)
  closeModalTaskDetail()
}

/**
 * 開啟任務編輯 Modal
 */
function openTaskEdit() {
  closeModal()
  openModalTaskEdit('edit')
}

/**
 * 開啟警告 Modal
 */
function openAlert() {
  closeModal()
  openModalAlert({
    title: 'Delete this task',
    content: `Are you sure you want to delete the ‘${task.value.title}’ task and its subtasks? This action cannot be reversed.`,
    destructiveText: 'Delete',
    onDestructive: deleteTask,
  })
}
</script>

<template>
  <BaseModal
    type="taskDetail"
    :display="getModalTaskDetail.display"
    :title="task.title"
    @close="closeModal()"
  >
    <template #header>
      <div class="header-function">
        <button
          ref="elHeaderFunctionBtn"
          class="header-function-btn btn-ellipsis"
          aria-label="Toggle Task Menu"
          @click="toggleMenu()"
        >
          <SvgoIconVerticalEllipsis class="btn-ellipsis-icon" />
        </button>

        <div class="header-function-menu">
          <BaseDropdown
            v-on-click-outside="onClickOutsideHandler"
            class="header-function-menu-dropdown"
            :display="menuDisplay"
          >
            <button class="btn-dropdown-item" @click="openTaskEdit()">
              Edit Task
            </button>
            <button class="btn-dropdown-item text-alert" @click="openAlert()">
              Delete Task
            </button>
          </BaseDropdown>
        </div>
      </div>
    </template>

    <template #body>
      <div class="form-item">
        <p class="description text-l">
          {{ task.description }}
        </p>
      </div>

      <VueDraggable
        v-model="task.subtasks"
        group="subtasks"
        target=".form-item-label"
        handle=".form-item-value-input"
        draggable=".form-item-value"
        :fallback-tolerance="5"
      >
        <BaseFormItem
          v-model:subtask="task.subtasks"
          type="checkbox"
          :label="subtasksLabel"
        />
      </VueDraggable>

      <BaseFormItem
        v-model:select="task.status"
        :select-list="getBoardColumnsNameList"
        type="select"
        label="Current Status"
        placeholder="Please select"
      />
    </template>
  </BaseModal>
</template>

<style lang="scss" scoped>
.header-function {
  margin-left: auto;
  padding-left: 16px;
  position: relative;

  @include media-breakpoint(tablet) {
    padding-left: 24px;
  }

  &-btn {
    &-icon {
      width: 4.615px;
      height: 20px;
    }
  }

  &-menu {
    --menu-width: 120px;
    position: absolute;
    top: calc(100% + 22px);
    right: calc(var(--menu-width) - 36px);

    @include media-breakpoint(tablet) {
      --menu-width: 192px;
      right: calc(var(--menu-width) - 48px);
    }

    &-dropdown {
      display: flex;
      flex-direction: column;
      width: var(--menu-width);
      position: fixed;
      z-index: 10;
    }
  }
}

.description {
  color: var(--text-secondary-color);
}

:deep(.item-text) {
  cursor: grab;
}
</style>
