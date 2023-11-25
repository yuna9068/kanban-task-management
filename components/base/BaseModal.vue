<script lang="ts" setup>
const props = defineProps({
  type: {
    type: String,
    default: '',
  },
  display: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
})

const emits = defineEmits(['close'])

const isAlert = computed(() => props.type === 'alert')

function close() {
  emits('close')
}
</script>

<template>
  <teleport to="body">
    <div class="modal" :class="{ 'modal-open': display }" @click="close">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <p class="title heading-l" :class="{ 'text-alert': isAlert }">
              {{ title }}
            </p>
            <slot name="header" />
          </div>
          <div class="modal-body">
            <slot name="body" />
          </div>
          <div class="modal-footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<style lang="scss" scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 0;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.3s, height 0s 0.3s;
  overflow: hidden;

  &-open {
    height: 100vh;
    opacity: 1;
    transition: opacity 0.3s;
  }
}

.modal-dialog {
  width: 343px;
  transform: translateY(-30%);
  transition: transform 0.3s;

  @include media-breakpoint(tablet) {
    width: 480px;
  }

  @at-root .modal-open & {
    transform: none;
  }
}

.modal-content {
  max-height: 67.868177vh;
  padding: 24px;
  border-radius: 6px;
  background-color: var(--primary-bg);
  overflow: scroll;

  @include media-breakpoint(tablet) {
    max-height: 65.917968vh;
    padding: 32px;
  }
}

.modal-body {
  padding-top: 24px;
}

.modal-footer {
  padding-top: 24px;
}
</style>
