<script lang="ts" setup></script>

<template>
  <header class="header">
    <HeaderLogo class="header-logo" />
    <HeaderMain class="header-main" />
  </header>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  background: var(--primary-bg);

  &-logo {
    width: var(--logo-width);
  }

  &-main {
    flex: 1;
  }
}
</style>
