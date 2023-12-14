<script lang="ts" setup>
</script>

<template>
  <div class="app">
    <NuxtLayout>
      <HeaderIndex class="header" />
      <NuxtPage class="page" keepalive />
    </NuxtLayout>
  </div>
</template>

<style lang="scss" scoped>
.app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

:deep(.page) {
  flex: 1;
}
</style>
