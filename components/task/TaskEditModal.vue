<script lang="ts" setup>
import { useCloned } from '@vueuse/core'

const boardStore = useBoardStore()
const taskStore = useTaskStore()
const {
  createTask,
  editTask,
  closeModalTaskEdit,
  validateTaskTitle,
  validateSubtaskTitle,
} = taskStore
const { getBoardColumnsNameList } = storeToRefs(boardStore)
const { getEmptyTask, getTask, getModalTaskEdit } = storeToRefs(taskStore)

const validateStatus = ref(true)

const isEdit = computed(() => getModalTaskEdit.value.type === 'edit')
const title = computed(() => isEdit.value ? 'Edit Task' : 'Add New Task')
const saveBtnText = computed(() => isEdit.value ? 'Save Changes' : 'Create Task')

const { cloned: task, sync } = useCloned(getEmptyTask)
const subtasksTitle = computed(() => task.value.subtasks.map(subtask => subtask.title))

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
    sync()
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
 * 若通過表單驗證，則更新 / 新增任務資料
 */
function save() {
  if (validateStatus.value) {
    if (isEdit.value)
      editTask(task.value)
    else
      createTask(task.value)
  }
}

/**
 * 檢查任務及子任務名稱，通過才可點擊 footer 區塊的按鈕
 */
function validate() {
  const checkLength = task.value.title.length > 0 && task.value.status.length > 0 && subtasksTitle.value.every(title => title.length > 0)
  const checkTask = validateTaskTitle(task.value.title, isEdit.value).status
  const checkSubtasks = validateSubtaskTitle(task.value.subtasks).status

  validateStatus.value = checkLength && checkTask && checkSubtasks
}

watch(() => getModalTaskEdit.value.display, (newValue) => {
  if (newValue)
    initialData()
})

watch([() => task.value.title, () => subtasksTitle.value], () => {
  validate()
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
        :validate="validateTaskTitle"
        :edit="isEdit"
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
        :validate="validateSubtaskTitle"
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
        class="btn-primary"
        :disabled="!validateStatus"
        @click="save()"
      >
        {{ saveBtnText }}
      </button>
    </template>
  </BaseModal>
</template>

<style lang="scss" scoped>
.btn-secondary {
  margin-top: 12px;
}
</style>
