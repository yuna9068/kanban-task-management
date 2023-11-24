<script lang="ts" setup></script>

<template>
  <header class="header">
    <HeaderLogo class="header-logo" />
    <HeaderMain class="header-main" />
  </header>
</template>

<style lang="scss" scoped>
$logo-width-tablet: math.div(260, 768) * 100%;
$logo-width-desktop: math.div(300, 1440) * 100%;

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
