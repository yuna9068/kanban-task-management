<script lang="ts" setup>
const sidebarStore = useSidebarStore()
const { closeSidebar } = sidebarStore
const { getSidebarDisplay } = storeToRefs(sidebarStore)
</script>

<template>
  <div
    class="backdrop"
    :class="{ open: getSidebarDisplay }"
    @click.self="closeSidebar()"
  >
    <div class="sidebar">
      <SidebarBoard class="sidebar-board" />
      <SidebarLink />
      <SidebarThemeSwitcher />
      <SidebarSwitcher />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.backdrop {
  @include media-mobile {
    @include backdrop;
    align-items: initial;
    position: absolute;

    &.open {
      height: 100%;
    }
  }

  @include media-breakpoint(tablet) {
    width: var(--logo-width);
    margin-left: calc(var(--logo-width) * -1);
    transition: margin-left 0.3s;

    &.open {
      margin-left: 0;
    }
  }
}

.sidebar {
  $sidebarMarginBlock: 16px;

  display: flex;
  flex-direction: column;
  background: var(--primary-bg);

  @include media-mobile {
    width: 70.4%;
    height: fit-content;
    max-height: calc(100% - $sidebarMarginBlock * 2);
    margin-top: $sidebarMarginBlock;
    padding-block: 16px;
    border-radius: 8px;
    box-shadow: 0px 10px 20px 0px rgba(54, 78, 126, 0.25);
  }

  @include media-breakpoint(tablet) {
    height: 100%;
    padding-block: 32px;
    border-right: var(--border-primary);
  }

  @include media-breakpoint(desktop) {
    padding-top: 16px;
  }

  &-board {
    flex: 1;
    overflow: scroll;

    @include media-breakpoint(tablet) {
      margin-bottom: auto;
    }
  }
}

:deep(.section-container) {
  padding-inline: var(--sidebar-board-padding-inline);

  @include media-breakpoint(tablet) {
    padding-right: 20px;
  }

  @include media-breakpoint(desktop) {
    padding-right: var(--sidebar-board-padding-inline);
  }
}
</style>
