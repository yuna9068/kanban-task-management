<script lang="ts" setup>
import { useVModel } from '@vueuse/core'

interface Props {
  modelValue: string
  placeholder: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: '',
})

const emits = defineEmits(['update:modelValue'])

const proxyValue = useVModel(props, 'modelValue', emits)
</script>

<template>
  <div class="form-item-value">
    <textarea
      v-model.lazy.trim="proxyValue"
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
