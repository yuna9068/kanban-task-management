<script lang="ts" setup>
import { useVModel } from '@vueuse/core'
import type { Column, FormItemType, Subtask } from '@/types'

interface Props {
  label: string
  single?: string
  column?: Column[]
  textarea?: string
  select?: string
  selectList?: string[]
  subtask?: Subtask[]
  type: FormItemType
  placeholder: string
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  single: '',
  column: () => [],
  textarea: '',
  select: '',
  selectList: () => [],
  subtask: () => [],
  type: 'single',
  placeholder: '',
})

const emits = defineEmits([
  'update:single',
  'update:column',
  'update:textarea',
  'update:select',
  'update:subtask',
])

const proxySingle = useVModel(props, 'single', emits)
const proxyList = useVModel(props, 'column', emits)
const proxyTextarea = useVModel(props, 'textarea', emits)
const proxySelect = useVModel(props, 'select', emits)
const proxySubtask = useVModel(props, 'subtask', emits)

const renderTag = computed(() => props.type === 'select' ? 'div' : 'label')

/**
 * 判斷要渲染哪種元件，需類型相符且有值
 * @param type 類型
 */
function renderItem(type: FormItemType) {
  return props.type === type && props[type as keyof Props] !== null
}

/**
 * 移除指定的值
 * @param idx 欲移除的 index
 */
function removeValue(idx: number) {
  switch (props.type) {
    case 'column':
      proxyList.value.splice(idx, 1)
      break

    case 'subtask':
      if (proxySubtask.value.length > 1) {
        proxySubtask.value.splice(idx, 1)
      }
      else {
        proxySubtask.value[idx].title = ''
        proxySubtask.value[idx].isCompleted = false
      }
      break

    default:
      break
  }
}
</script>

<template>
  <div class="form-item">
    <component :is="renderTag" class="form-item-label">
      <p class="form-item-label-text">
        {{ label }}
      </p>

      <template v-if="renderItem('single')">
        <BaseInput
          v-model="proxySingle"
          :placeholder="placeholder"
        />
      </template>

      <template v-if="renderItem('column')">
        <template v-for="(item, idx) in proxyList" :key="idx">
          <BaseInput
            v-model="item.name"
            :placeholder="placeholder"
            :deletable="true"
            @remove="removeValue(idx)"
          />
        </template>
      </template>

      <template v-if="renderItem('subtask')">
        <template v-for="(item, idx) in proxySubtask" :key="idx">
          <BaseInput
            v-model="item.title"
            :placeholder="placeholder"
            :deletable="true"
            @remove="removeValue(idx)"
          />
        </template>
      </template>

      <template v-if="renderItem('textarea')">
        <BaseTextarea
          v-model="proxyTextarea"
          :placeholder="placeholder"
        />
      </template>

      <template v-if="renderItem('select')">
        <BaseSelect
          v-model="proxySelect"
          :list="selectList"
          :placeholder="placeholder"
        />
      </template>
    </component>
  </div>
</template>

<style lang="scss" scoped>
</style>
