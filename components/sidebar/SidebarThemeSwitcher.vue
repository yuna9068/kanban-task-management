<script lang="ts" setup>
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark({
  attribute: 'data-theme',
})

const themeToggle = useToggle(isDark)
</script>

<template>
  <section class="section section-theme">
    <div class="section-container">
      <h2 class="sr-only">
        Theme Switcher
      </h2>
      <div class="switcher">
        <SvgoIconLightTheme class="switcher-theme-icon" />
        <button
          class="switcher-btn"
          aria-label="Toggle Theme"
          @click="themeToggle()"
        />
        <SvgoIconDarkTheme class="switcher-theme-icon" />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.section-theme .section-container {
  padding-inline: 16px 13px;

  @include media-breakpoint(tablet) {
    padding-inline: 13px 12px;
  }

  @include media-breakpoint(desktop) {
    padding-inline: var(--sidebar-board-padding-inline);
  }
}

.switcher {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  border-radius: 6px;
  background: var(--secondary-bg);

  &-theme-icon {
    color: $grey-medium;
  }

  &-btn {
    width: 40px;
    height: 20px;
    margin: 0 24px;
    padding: 3px;
    border-radius: 10px;
    background: $primary;
    text-align: left;

    &:hover {
      background: $primary-light;
    }

    &::before {
      $btn-circle-size: 14px;

      content: "";
      display: inline-block;
      width: $btn-circle-size;
      aspect-ratio: 1 / 1;
      border-radius: 50%;
      background: $white;
      transition: margin-left 0.3s;

      @at-root [data-theme="dark"] & {
        margin-left: calc(100% - $btn-circle-size);
      }
    }
  }
}
</style>
