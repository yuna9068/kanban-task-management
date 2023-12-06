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
    <div class="modal" :class="{ open: display }" @click.self="close()">
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
  @include backdrop;
}

.modal-dialog {
  width: 343px;
  transform: translateY(-30%);
  transition: transform 0.3s;

  @include media-breakpoint(tablet) {
    width: 480px;
  }

  @at-root .open & {
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

.modal-header {
  display: flex;
  align-items: center;
}

.modal-footer {
  padding-top: 24px;
}
</style>
