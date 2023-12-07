<script lang="ts" setup>
import { useCloned, useToggle } from '@vueuse/core'

const boardStore = useBoardStore()
const taskStore = useTaskStore()
const alertStore = useAlertStore()
const { openModalTaskEdit, closeModalTaskDetail } = taskStore
const { openModalAlert } = alertStore
const { getBoardColumnsNameList } = storeToRefs(boardStore)
const { getTask, getModalTaskDetail } = storeToRefs(taskStore)

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

/**
 * 關閉任務詳情 Modal 和 關閉操作看板下拉式選單
 */
function closeModal() {
  toggleMenu(false)
  closeModalTaskDetail(task.value)
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
  openModalAlert('task', task.value.title)
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
          class="header-function-btn btn-ellipsis"
          @click="toggleMenu()"
        >
          <SvgoIconVerticalEllipsis class="btn-ellipsis-icon" />
        </button>

        <div class="header-function-menu">
          <BaseDropdown
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

      <BaseFormItem
        v-model:subtask="task.subtasks"
        type="checkbox"
        :label="subtasksLabel"
      />

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
</style>
