<script lang="ts" setup>
import { useCloned } from '@vueuse/core'

const boardStore = useBoardStore()
const { createBoard, editBoard, closeModalBoard } = boardStore
const { getEmptyBoard, getBoard, getModalBoardInfo } = storeToRefs(boardStore)

const isEdit = computed(() => getModalBoardInfo.value.type === 'edit')
const title = computed(() => isEdit.value ? 'Edit Board' : 'Add New Board')
const saveBtnText = computed(() => isEdit.value ? 'Save Changes' : 'Create New Board')

const { cloned: board, sync } = useCloned(getEmptyBoard)

/**
 * 驗證表單資料是否皆有值，有值才可點擊 footer 區塊的按鈕
 */
const validateStatus = computed(() => (
  board.value.name.length > 0 && board.value.columns.every(item => item.name.length > 0)
))

/**
 * 初始化表單資料
 * 若為 edit 編輯，則顯示目前查看的看板資料
 * 若為 create 新增，則顯示空的看板名稱及預設欄位
 */
function initialData() {
  if (isEdit.value) {
    const { cloned: selectedBoard } = useCloned(getBoard)
    board.value = selectedBoard.value

    if (getModalBoardInfo.value.addNewColumn)
      addColumn()
  }
  else {
    sync()
  }
}

/**
 * 新增欄位輸入框
 */
function addColumn() {
  board.value.columns.push({ name: '', tasks: [] })
}

/**
 * 若通過表單驗證，則更新 / 新增看板資料
 */
function save() {
  if (validateStatus.value) {
    if (isEdit.value)
      editBoard(board.value)
    else
      createBoard(board.value)
  }
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
        v-model:single="board.name"
        type="single"
        label="Board Name"
        placeholder="e.g. Web Design"
      />

      <BaseFormItem
        v-model:column="board.columns"
        type="column"
        label="Board Columns"
        placeholder="e.g. Todo"
      />

      <button class="btn-secondary" @click="addColumn()">
        + Add New Column
      </button>
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
