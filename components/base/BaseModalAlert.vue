<script lang="ts" setup>
const alertStore = useAlertStore()
const { closeModalAlert, deleteItem } = alertStore
const { getModalAlertInfo } = storeToRefs(alertStore)

const btnDestructiveText = computed(() => getModalAlertInfo.value.type === 'reset' ? 'Reset' : 'Delete')
</script>

<template>
  <BaseModal
    type="alert"
    :display="getModalAlertInfo.display"
    :title="getModalAlertInfo.title"
    @close="closeModalAlert"
  >
    <template #body>
      <p class="alert-content text-l">
        {{ getModalAlertInfo.content }}
      </p>
    </template>

    <template #footer>
      <div class="alert-btn">
        <button class="btn-destructive" @click="deleteItem()">
          {{ btnDestructiveText }}
        </button>
        <button class="btn-secondary" @click="closeModalAlert()">
          Cancel
        </button>
      </div>
    </template>
  </BaseModal>
</template>

<style lang="scss" scoped>
.alert-content {
  padding-top: 24px;
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
