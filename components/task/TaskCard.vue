<script lang="ts" setup>
import type { Task } from '@/types'

interface Props {
  task: Task
}

const props = withDefaults(defineProps<Props>(), {
  task: () => ({}),
})

const summary = computed(() => {
  const completed = props.task.subtasks.filter(subtask => subtask.isCompleted).length
  const total = props.task.subtasks.length
  const result = `${completed} of ${total} subtasks`

  return result
})
</script>

<template>
  <div class="card">
    <p class="card-title heading-m">
      {{ task.title }}
    </p>
    <p class="card-summary text-m">
      {{ summary }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.card {
  margin-bottom: 20px;
  padding: 23px 16px;
  border-radius: 8px;
  background: var(--primary-bg);
  box-shadow: 0px 4px 6px 0px rgba(54, 78, 126, 0.10);
  cursor: pointer;

  &:hover &-title {
    color: $primary;
  }

  &-title {
    margin-bottom: 8px;
    transition: color 0.3s;
  }

  &-summary {
    color: var(--text-secondary-color);
  }
}
</style>
