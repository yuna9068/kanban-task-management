<script lang="ts" setup>
import { useCloned } from '@vueuse/core'

const boardStore = useBoardStore()
const {
  createBoard,
  editBoard,
  closeModalBoard,
  validateBoardName,
  validateColumnName,
} = boardStore
const { getEmptyBoard, getBoard, getModalBoardInfo } = storeToRefs(boardStore)

const validateStatus = ref(true)

const isEdit = computed(() => getModalBoardInfo.value.type === 'edit')
const title = computed(() => isEdit.value ? 'Edit Board' : 'Add New Board')
const saveBtnText = computed(() => isEdit.value ? 'Save Changes' : 'Create New Board')

const { cloned: board, sync } = useCloned(getEmptyBoard)
const columnsName = computed(() => board.value.columns.map(column => column.name))

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

/**
 * 檢查看板及欄位名稱，通過才可點擊 footer 區塊的按鈕
 */
function validate() {
  const checkLength = board.value.name.length > 0 && columnsName.value.every(name => name.length > 0)
  const checkBoard = validateBoardName(board.value.name, isEdit.value).status
  const checkColumns = validateColumnName(board.value.columns).status

  validateStatus.value = checkLength && checkBoard && checkColumns
}

watch(() => getModalBoardInfo.value.display, (newValue) => {
  if (newValue)
    initialData()
})

watch([() => board.value.name, () => columnsName.value], () => {
  validate()
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
        :validate="validateBoardName"
        :edit="isEdit"
      />

      <BaseFormItem
        v-model:column="board.columns"
        type="column"
        label="Board Columns"
        placeholder="e.g. Todo"
        :validate="validateColumnName"
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
