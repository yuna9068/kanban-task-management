<script lang="ts" setup>
import { useToggle, useVModels } from '@vueuse/core'
import { vOnClickOutside } from '@vueuse/components'

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
 * 關閉下拉式選單
 */
function closeMenu() {
  toggleMenu(false)
}

/**
 * 選擇項目，並關閉下拉式選單
 * @param name 項目名稱
 */
function selectItem(name: string) {
  modelValue.value = name
  closeMenu()
}
</script>

<template>
  <div
    v-on-click-outside="closeMenu"
    class="form-item-value"
  >
    <p
      class="form-item-value-input"
      @click="toggleMenu()"
    >
      <span class="form-item-value-input-text">{{ modelValue || placeholder }}</span>
      <SvgoIconChevronDown
        class="form-item-value-input-icon btn-arrow"
        :class="{ 'btn-arrow-up': menuDisplay }"
      />
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
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;

  &-text {
    flex: 1;
    word-break: break-word;
  }

  &-icon {
    flex-shrink: 0;
    width: 9.397px;
    height: 4.698px;
    margin-left: auto;
  }
}

.menu {
  width: 100%;
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  z-index: 10;
}
</style>
