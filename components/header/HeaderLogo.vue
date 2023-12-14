<script lang="ts" setup></script>

<template>
  <div class="header-logo">
    <NuxtLink class="logo" to="/">
      <h1 class="sr-only">
        Kanban task management web app
      </h1>
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
.header-logo {
  display: flex;
  align-items: center;
  padding-inline: 16px;

  @include media-breakpoint(tablet) {
    padding-inline: 26px 0;
    border-right: var(--border-primary);
  }

  @include media-breakpoint(desktop) {
    padding-left: 34px;
  }
}

.logo {
  display: block;
  width: 24px;
  height: 25px;
  background: center / cover url("~/assets/logo/logo-mobile.svg") no-repeat;
  color: $primary;

  @include media-breakpoint(tablet){
    width: 152.53px;
    height: 25.22px;
    background-image: url("~/assets/logo/logo-dark.svg");

    @at-root [data-theme="dark"] & {
      background-image: url("~/assets/logo/logo-light.svg");
    }
  }
}
</style>
