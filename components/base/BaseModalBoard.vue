<script lang="ts" setup>
import type { Column } from '@/types'

const boardStore = useBoardStore()
const { createBoard, editBoard, closeModalBoard } = boardStore
const { getBoard, getModalBoardInfo } = storeToRefs(boardStore)

const isEdit = computed(() => getModalBoardInfo.value.type === 'edit')
const title = computed(() => isEdit.value ? 'Edit Board' : 'Add New Board')
const boardName = ref('')
const boardColumns: Ref<string[]> = ref([])

/**
 * 驗證表單資料是否皆有值，有值才可點擊 footer 區塊的按鈕
 */
const validateStatus = computed(() => (
  boardName.value.length > 0 && boardColumns.value.every(item => item.length > 0)
))

/**
 * 初始化表單資料
 * 若為 edit 編輯，則顯示目前查看的看板資料
 * 若為 create 新增，則顯示空的看板名稱及預設欄位
 */
function initialData() {
  if (isEdit.value) {
    boardName.value = getBoard.value.name
    boardColumns.value = getBoard.value.columns.map((item: Column) => item.name)

    if (getModalBoardInfo.value.newColumn)
      addColumn()
  }
  else {
    boardName.value = ''
    boardColumns.value = ['Todo', 'Doing']
  }
}

/**
 * 新增欄位輸入框
 */
function addColumn() {
  boardColumns.value.push('')
}

/**
 * 若通過表單驗證，則更新目前查看的看板資料
 */
function edit() {
  if (validateStatus.value)
    editBoard(boardName.value, boardColumns.value)
}

/**
 * 若通過表單驗證，則新增看板資料
 */
function create() {
  if (validateStatus.value)
    createBoard(boardName.value, boardColumns.value)
}

watch(() => getModalBoardInfo.value.display, (newValue) => {
  if (newValue)
    initialData()
})
</script>

<template>
  <BaseModal
    type="board"
    :display="getModalBoardInfo.display"
    :title="title"
    @close="closeModalBoard"
  >
    <template #body>
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

      <button class="btn-secondary" @click="addColumn()">
        + Add New Column
      </button>
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
