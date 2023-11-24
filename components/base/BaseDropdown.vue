<script lang="ts" setup>
defineProps({
  display: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div
    class="dropdown"
    :class="{ 'dropdown-show': display }"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.dropdown {
  max-height: 0;
  padding: 0;
  border-radius: 8px;
  background: var(--btn-dropdown-item-bg);
  box-shadow: 0px 10px 20px 0px rgba(54, 78, 126, 0.25);
  transition: max-height 0.3s, padding 0.3s 0s;
  overflow: hidden;

  &-show {
    max-height: 50vh;
    padding-block: 8px;
  }
}
</style>
