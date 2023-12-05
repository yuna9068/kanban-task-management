<script lang="ts" setup>
</script>

<template>
  <div class="index">
    <main class="main">
      <SidebarIndex />
      <BoardIndex class="main-board" />
    </main>
    <BaseModalBoard />
    <BaseModalTask />
    <BaseModalAlert />
  </div>
</template>

<style lang="scss" scoped>
.index {
  position: relative;
  overflow: scroll;
}

.main {
  height: 100%;
  display: flex;

  &-board {
    flex: 1;
  }
}
</style>
