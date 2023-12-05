<script lang="ts" setup>
import { useToggle, useVModels } from '@vueuse/core'

interface Props {
  modelValue: string
  list: string[]
  placeholder: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  list: () => [],
  placeholder: '',
})

const emits = defineEmits(['update:modelValue'])

const { modelValue } = useVModels(props, emits)

const menuDisplay = ref(false)
const toggleMenu = useToggle(menuDisplay)

/**
 * 選擇項目，並關閉下拉式選單
 * @param name 項目名稱
 */
function selectItem(name: string) {
  modelValue.value = name
  toggleMenu(false)
}
</script>

<template>
  <div class="form-item-value">
    <p
      class="form-item-value-input"
      @click="toggleMenu()"
    >
      {{ modelValue || placeholder }}
    </p>

    <BaseDropdown
      class="menu"
      :display="menuDisplay"
    >
      <button
        v-for="item in list"
        :key="item"
        class="btn-dropdown-item"
        @click="selectItem(item)"
      >
        {{ item }}
      </button>
    </BaseDropdown>
  </div>
</template>

<style lang="scss" scoped>
.form-item-value-input {
  cursor: pointer;
}

.menu {
  width: 100%;
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  z-index: 10;
}
</style>
