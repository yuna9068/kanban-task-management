<script lang="ts" setup>
</script>

<template>
  <div class="index">
    <main class="main">
      <SidebarIndex />
    </main>
    <BaseModalBoard />
    <BaseModalTask />
    <BaseModalAlert />
  </div>
</template>

<style lang="scss" scoped>
.index {
  position: relative;
}

.main {
  height: 100%;
  display: flex;
}
</style>
