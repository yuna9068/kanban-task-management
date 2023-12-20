<script lang="ts" setup>
const sidebarStore = useSidebarStore()
const { toggleSidebar, closeSidebar } = sidebarStore
const { getSidebarDisplay } = storeToRefs(sidebarStore)
</script>

<template>
  <section class="section section-switcher sr-only-mobile">
    <div class="section-container">
      <h2 class="sr-only">
        Sidebar Switcher
      </h2>
      <button
        v-show="getSidebarDisplay"
        class="switcher-hide-btn btn-lg btn-sidebar-board"
        @click="closeSidebar()"
      >
        <SvgoIconHideSidebar class="switcher-hide-btn-icon" />
        <p>Hide Sidebar</p>
      </button>

      <button
        v-show="!getSidebarDisplay"
        class="switcher-show-btn btn-primary btn-lg"
        @click="toggleSidebar(true)"
      >
        <SvgoIconShowSidebar class="switcher-show-btn-icon" />
        <p class="sr-only">
          Show Sidebar
        </p>
      </button>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.section-switcher .section-container {
  padding-top: 8px;
  padding-left: 0;
  position: relative;
}

.switcher-hide-btn {
  display: flex;
  align-items: center;
  padding-inline: var(--sidebar-board-padding-inline);
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  text-align: left;

  &-icon {
    margin-right: 10px;

    @include media-breakpoint(desktop) {
      margin-right: 15px;
    }
  }
}

.switcher-show-btn{
  width: 56px;
  height: 48px;
  padding-top: 19px;
  padding-left: 18px;
  position: fixed;
  bottom: 32px;
  left: 0;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  text-align: left;

  &-icon {
    width: 16px;
    height: 10.222px;
    vertical-align: top;
  }
}
</style>
