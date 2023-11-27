<script lang="ts" setup>
import type { Column } from '@/types'

const boardStore = useBoardStore()
const { createBoard, editBoard, close } = boardStore
const { getBoard, getModalInfo } = storeToRefs(boardStore)

const isEdit = computed(() => getModalInfo.value.type === 'edit')
const title = computed(() => isEdit.value ? 'Edit Board' : 'Add New Board')
const boardName = ref('')
const boardColumns: Ref<string[]> = ref([])

const validateStatus = computed(() => (
  boardName.value.length > 0 && boardColumns.value.every(item => item.length > 1)
))

function initialData() {
  if (isEdit.value) {
    boardName.value = getBoard.value.name
    boardColumns.value = getBoard.value.columns.map((item: Column) => item.name)
  }
  else {
    boardName.value = ''
    boardColumns.value = ['Todo', 'Doing']
  }
}

function addColumn() {
  boardColumns.value.push('')
}

function edit() {
  editBoard(boardName.value, boardColumns.value)
}

function create() {
  createBoard(boardName.value, boardColumns.value)
}

watch(() => getModalInfo.value.display, () => {
  initialData()
})
</script>

<template>
  <BaseModal
    type="alert"
    :display="getModalInfo.display"
    :title="title"
    @close="close"
  >
    <template #body>
      <div class="board-form">
        <BaseFormItem
          v-model:single="boardName"
          type="single"
          label="Board Name"
          placeholder="e.g. Web Design"
        />

        <BaseFormItem
          v-model:list="boardColumns"
          type="list"
          label="Board Columns"
          placeholder="e.g. Todo"
        />
      </div>

      <button class="btn-secondary" @click="addColumn">
        + Add New Column
      </button>
    </template>

    <template #footer>
      <button v-if="isEdit" class="btn-primary" :disabled="!validateStatus" @click="edit">
        Save Changes
      </button>
      <button v-else class="btn-primary" :disabled="!validateStatus" @click="create">
        Create New Board
      </button>
    </template>
  </BaseModal>
</template>

<style lang="scss" scoped>
.btn-secondary {
  margin-top: 12px;
}
</style>
