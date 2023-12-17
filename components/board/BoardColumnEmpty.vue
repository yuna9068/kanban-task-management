<script lang="ts" setup>
const boardStore = useBoardStore()
const { addNewColumn } = boardStore
</script>

<template>
  <div class="empty">
    <p class="empty-title heading-l">
      This board is empty. Create a new column to get started.
    </p>
    <button
      class="empty-btn btn-primary btn-lg"
      @click="addNewColumn()"
    >
      + Add New Column
    </button>
  </div>
</template>

<style lang="scss" scoped>
.empty {
  display: grid;
  place-content: center;
  justify-items: center;
  height: 100%;

  &-title {
    margin-bottom: 24px;
    text-align: center;
    color: $grey-medium;
  }

  &-btn {
    width: 174px;
  }
}
</style>
