<script lang="ts" setup>
const sidebarStore = useSidebarStore()
const { toggleSidebar } = sidebarStore
const { getSidebarDisplay } = storeToRefs(sidebarStore)
</script>

<template>
  <section class="section section-switcher sr-only-mobile">
    <div class="section-container">
      <button
        v-show="getSidebarDisplay"
        class="switcher-hide-btn btn-lg btn-sidebar-board"
        @click="toggleSidebar(false)"
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
  position: absolute;
  bottom: 0;
  left: 100%;
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
