<script lang="ts" setup>
import { useVModel } from '@vueuse/core'

interface Props {
  label: string
  single?: string
  list?: string[]
  type: string
  placeholder: string
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  single: '',
  list: () => [],
  type: '',
  placeholder: '',
})

const emits = defineEmits(['update:single', 'update:list'])

const proxySingle = useVModel(props, 'single', emits)
const proxyList = useVModel(props, 'list', emits)

function renderItem(type: string) {
  return props.type === type && props[type as keyof Props] !== null
}

function removeValue(idx: number) {
  proxyList.value.splice(idx, 1)
}
</script>

<template>
  <div class="form-item">
    <label class="form-item-label">
      <p class="form-item-label-text">{{ label }}</p>

      <template v-if="renderItem('single')">
        <BaseInput
          v-model="proxySingle"
          :placeholder="placeholder"
        />
      </template>

      <template v-if="renderItem('list')">
        <template v-for="(item, idx) in proxyList" :key="item">
          <BaseInput
            v-model="proxyList[idx]"
            :placeholder="placeholder"
            :deletable="true"
            @remove="removeValue(idx)"
          />
        </template>
      </template>

    </label>
  </div>
</template>

<style lang="scss" scoped>
</style>
