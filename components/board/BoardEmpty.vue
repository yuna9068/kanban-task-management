<script lang="ts" setup>
const boardStore = useBoardStore()
const { openModalBoard } = boardStore
</script>

<template>
  <div class="empty">
    <p class="empty-title heading-l">
      Create a new board to get started.
    </p>
    <button
      class="empty-btn btn-primary btn-lg"
      @click="openModalBoard('create')"
    >
      + Create New Board
    </button>
  </div>
</template>

<style lang="scss" scoped>
.empty {
  display: grid;
  place-content: center;
  justify-items: center;
  height: 100%;
  padding-inline: 24px;

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
