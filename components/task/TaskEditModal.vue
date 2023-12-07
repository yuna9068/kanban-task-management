<script lang="ts" setup>
import { useCloned } from '@vueuse/core'
import type { Task } from '@/types'

const boardStore = useBoardStore()
const taskStore = useTaskStore()
const { createTask, editTask, closeModalTaskEdit } = taskStore
const { getBoardColumnsNameList } = storeToRefs(boardStore)
const { getEmptyTask, getTask, getModalTaskEdit } = storeToRefs(taskStore)

const isEdit = computed(() => getModalTaskEdit.value.type === 'edit')
const title = computed(() => isEdit.value ? 'Edit Task' : 'Add New Task')

const { cloned: emptyTask } = useCloned(getEmptyTask)

const task: Ref<Task> = ref(emptyTask.value)

/**
 * 驗證表單資料是否皆有值，有值才可點擊 footer 區塊的按鈕
 */
const validateStatus = computed(() => (
  task.value.title
  && task.value.status
  && task.value.subtasks.every(item => item.title)
))

/**
 * 初始化表單資料
 * 若為 edit 編輯，則顯示目前查看的任務資料
 * 若為 create 新增，則顯示空的任務名稱及預設欄位
 */
function initialData() {
  if (isEdit.value) {
    const { cloned: selectedTask } = useCloned(getTask)
    task.value = selectedTask.value
  }
  else {
    task.value = emptyTask.value
  }
}

/**
 * 新增 subtasks 輸入框
 */
function addSubtask() {
  task.value.subtasks.push({
    title: '',
    isCompleted: false,
  })
}

/**
 * 若通過表單驗證，則更新目前查看的任務資料
 */
function edit() {
  if (validateStatus.value)
    editTask(task.value)
}

/**
 * 若通過表單驗證，則新增任務資料
 */
function create() {
  if (validateStatus.value)
    createTask(task.value)
}

watch(() => getModalTaskEdit.value.display, (newValue) => {
  if (newValue)
    initialData()
})
</script>

<template>
  <BaseModal
    type="task"
    :display="getModalTaskEdit.display"
    :title="title"
    @close="closeModalTaskEdit()"
  >
    <template #body>
      <BaseFormItem
        v-model:single="task.title"
        type="single"
        label="Title"
        placeholder="e.g. Take coffee break"
      />

      <BaseFormItem
        v-model:textarea="task.description"
        type="textarea"
        label="Description"
        placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
      />

      <BaseFormItem
        v-model:subtask="task.subtasks"
        type="subtask"
        label="Subtasks"
        placeholder="e.g. Make coffee"
      />

      <button class="btn-secondary" @click="addSubtask()">
        + Add New Subtask
      </button>

      <BaseFormItem
        v-model:select="task.status"
        :select-list="getBoardColumnsNameList"
        type="select"
        label="Status"
        placeholder="Please select"
      />
    </template>

    <template #footer>
      <button
        v-if="isEdit"
        class="btn-primary"
        :disabled="!validateStatus"
        @click="edit()"
      >
        Save Changes
      </button>
      <button
        v-else
        class="btn-primary"
        :disabled="!validateStatus"
        @click="create()"
      >
        Create Task
      </button>
    </template>
  </BaseModal>
</template>

<style lang="scss" scoped>
.btn-secondary {
  margin-top: 12px;
}
</style>
