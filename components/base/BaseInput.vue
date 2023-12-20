<script lang="ts" setup>
import { useVModels } from '@vueuse/core'
import type { ValidateResult } from '@/types'

interface Props {
  modelValue: string
  placeholder: string
  deletable?: boolean
  validate: Function
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: '',
  deletable: false,
  validate: () => {},
})

const emits = defineEmits(['update:modelValue', 'remove'])

const boardStore = useBoardStore()
const taskStore = useTaskStore()
const { getModalBoardInfo } = storeToRefs(boardStore)
const { getModalTaskEdit } = storeToRefs(taskStore)

const validateResult: Ref<ValidateResult> = ref({
  status: true,
  msg: '',
})

const { modelValue } = useVModels(props, emits)

/**
 * 設定驗證結果
 * @param status 驗證狀態
 * @param msg 訊息
 */
function setValidateResult(status: boolean, msg: string) {
  validateResult.value.status = status
  validateResult.value.msg = msg
}

/**
 * 檢查輸入的值
 */
function checkValue() {
  if (!modelValue.value.length) {
    setValidateResult(false, 'Can’t be empty')
    return
  }

  const { status, msg } = props.validate(modelValue.value)
  setValidateResult(status, msg)
}

watch(
  [
    () => getModalBoardInfo.value.display,
    () => getModalTaskEdit.value.display,
  ],
  () => {
    setValidateResult(true, '')
  },
)
</script>

<template>
  <div class="form-item-value">
    <input
      v-model.trim="modelValue"
      class="form-item-value-input"
      :class="{ 'form-item-value-error': !validateResult.status }"
      type="text"
      :placeholder="placeholder"
      @keyup="checkValue()"
    >
    <p v-show="!validateResult.status" class="form-item-error text-alert" :class="{ 'form-item-error-delete': deletable }">
      {{ validateResult.msg }}
    </p>
    <button
      v-if="deletable"
      class="btn-delete"
      aria-label="Delete"
      @click="$emit('remove')"
    >
      <SvgoIconCross class="btn-delete-icon" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
$btn-delete-margin-left: 16px;
$btn-delete-icon-size: 14.85px;

.form-item-error-delete {
  right: $form-input-padding-inline + $btn-delete-margin-left + $btn-delete-icon-size;
}

.btn-delete {
  margin-left: $btn-delete-margin-left;

  &-icon {
    width: $btn-delete-icon-size;
    height: $btn-delete-icon-size;
  }
}
</style>
