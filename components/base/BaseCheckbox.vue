<script lang="ts" setup>
import { useVModels } from '@vueuse/core'
import type { Subtask } from '@/types'

interface Props {
  modelValue: Subtask
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => ({ title: '', isCompleted: false }),
})

const emits = defineEmits(['update:modelValue'])

const { modelValue } = useVModels(props, emits)
</script>

<template>
  <div class="form-item-value">
    <label
      class="form-item-value-input"
      :class="{ 'item--checked': modelValue.isCompleted }"
    >
      <input
        v-model="modelValue.isCompleted"
        type="checkbox"
        :checked="modelValue.isCompleted"
      >
      <div class="item-check" />
      <p class="item-text">{{ modelValue.title }}</p>
    </label>
  </div>
</template>

<style lang="scss" scoped>
input[type="checkbox"] {
  display: none;
}

.form-item-value{
  margin-top: 8px;

  &:first-of-type {
    margin-top: 16px;
  }

  &-input {
    display: flex;
    align-items: center;
    padding: 13px 8px 12px 12px;
    border: none;
    background: var(--secondary-bg);
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
      background: change-color($primary, $alpha: 0.25);
    }
  }
}

.item {
  &-check {
    width: 16px;
    height: 16px;
    margin-right: 16px;
    border-radius: 2px;
    border: 1px solid rgba(130, 143, 163, 0.25);
    background: $white;
    transition: border 0.3s, background-color 0.3s;

    @at-root .item--checked & {
      border: none;
      background: $primary center url("~/assets/icons/icon-check.svg") no-repeat
    }
  }

  &-text {
    @include text-m;

    transition: opacity 0.3s;

    @at-root .item--checked & {
      text-decoration: line-through;
      opacity: 0.5;
    }
  }
}
</style>
