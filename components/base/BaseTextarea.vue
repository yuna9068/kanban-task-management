<script lang="ts" setup>
import { useVModels } from '@vueuse/core'

interface Props {
  modelValue: string
  placeholder: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: '',
})

const emits = defineEmits(['update:modelValue'])

const { modelValue } = useVModels(props, emits)
</script>

<template>
  <div class="form-item-value">
    <textarea
      v-model.lazy.trim="modelValue"
      class="form-item-value-input"
      :placeholder="placeholder"
    />
  </div>
</template>

<style lang="scss" scoped>
.form-item-value-input {
  height: 114px;
  resize: none;
}
</style>
