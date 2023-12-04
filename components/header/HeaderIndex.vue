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
    @include media-breakpoint(tablet) {
      width: $logo-width-tablet;
    }

    @include media-breakpoint(desktop) {
      width: $logo-width-desktop;
    }
  }

  &-main {
    flex: 1;
  }
}
</style>
