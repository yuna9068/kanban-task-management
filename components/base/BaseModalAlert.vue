<script lang="ts" setup>
const alertStore = useAlertStore()
const { close, deleteItem } = alertStore
const { getDisplay, getTitle, getContent } = storeToRefs(alertStore)
</script>

<template>
  <BaseModal
    type="alert"
    :display="getDisplay"
    :title="getTitle"
    @close="close"
  >
    <template #body>
      <p class="alert-content text-l">
        {{ getContent }}
      </p>
    </template>

    <template #footer>
      <div class="alert-btn">
        <button class="btn-destructive" @click="deleteItem">
          Delete
        </button>
        <button class="btn-secondary" @click="close">
          Cancel
        </button>
      </div>
    </template>
  </BaseModal>
</template>

<style lang="scss" scoped>
.alert-content {
  color: var(--text-secondary-color);
}

.alert-btn {
  @include media-breakpoint(tablet) {
    display: flex;
    padding-bottom: 8px;
  }

  .btn-destructive {
    margin-bottom: 16px;

    @include media-breakpoint(tablet) {
      margin-right: 16px;
      margin-bottom: 0;
    }
  }
}
</style>
