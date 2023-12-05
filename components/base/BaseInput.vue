<script lang="ts" setup>
import { useVModels } from '@vueuse/core'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  deletable: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['update:modelValue', 'remove'])

const { modelValue } = useVModels(props, emits)

const isError = computed(() => modelValue.value.length < 1)
</script>

<template>
  <div class="form-item-value">
    <input
      v-model.lazy.trim="modelValue"
      class="form-item-value-input"
      :class="{ 'form-item-value-error': isError }"
      type="text"
      :placeholder="placeholder"
    >
    <p v-show="isError" class="form-item-error text-alert" :class="{ 'form-item-error-delete': deletable }">
      Can’t be empty
    </p>
    <button v-if="deletable" class="btn-delete" @click="$emit('remove')">
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
