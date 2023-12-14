<script lang="ts" setup>
const alertStore = useAlertStore()
const { closeModalAlert } = alertStore
const { getModalAlertInfo } = storeToRefs(alertStore)

function destructive() {
  getModalAlertInfo.value.onDestructive()
  closeModalAlert()
}
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
        <button class="btn-destructive" @click="destructive()">
          {{ getModalAlertInfo.destructiveText }}
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
