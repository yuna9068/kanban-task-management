<script lang="ts" setup>
import { vOnClickOutside } from '@vueuse/components'
import type { OnClickOutsideOptions } from '@vueuse/core'

const route = useRoute()

const boardStore = useBoardStore()
const alertStore = useAlertStore()
const { getBoard } = storeToRefs(boardStore)
const { open } = alertStore

const elFunctionMenuBtn = ref()
const boardsDisplay = ref(false)
const menuDisplay = ref(false)

const page = computed(() => route.path)
const isIndex = computed(() => page.value === '/')
const title = computed(() => {
  const result = isIndex.value ? getBoard.value?.name : page.value.replace('/', '').toUpperCase()
  return result
})
const showFunctionBtn = computed(() => isIndex.value && getBoard.value?.name)

const onClickOutsideHandler: [(evt: any) => void, OnClickOutsideOptions] = [
  () => {
    closeMenu()
  },
  { ignore: [elFunctionMenuBtn] },
]

function toggleBoards() {
  boardsDisplay.value = !boardsDisplay.value
}

function addTask() {
  console.warn('addTask')
}

function closeMenu() {
  menuDisplay.value = false
}

function editBoard() {
  closeMenu()
}

function openModalAlert() {
  open('board', title.value)
  closeMenu()
}
</script>

<template>
  <div class="header-main">
    <h2 class="title heading-l" @click="toggleBoards">
      <span>{{ title }}</span>
      <button v-show="showFunctionBtn" class="title-btn btn-arrow" :class="{ 'btn-arrow-up': boardsDisplay }">
        <SvgoIconChevronDown />
      </button>
    </h2>

    <div v-show="showFunctionBtn" class="function">
      <button class="function-task-btn btn-primary" @click="addTask">
        <SvgoIconAddTaskMobile class="function-task-btn-icon" />
        <span class="sr-only-mobile">+ Add New Task</span>
      </button>

      <button ref="elFunctionMenuBtn" class="function-menu-btn btn-ellipsis" @click="menuDisplay = !menuDisplay">
        <SvgoIconVerticalEllipsis class="function-menu-btn-icon" />
      </button>

      <BaseDropdown
        v-on-click-outside="onClickOutsideHandler"
        class="function-board-menu"
        :display="menuDisplay"
      >
        <button class="btn-dropdown-item" @click="editBoard">
          Edit Board
        </button>
        <button class="btn-dropdown-item text-alert" @click="openModalAlert">
          Delete Board
        </button>
      </BaseDropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header-main {
  display: flex;
  align-items: center;
  padding: 16px 0;
  position: relative;
}

.title {
  cursor: pointer;

  @include media-breakpoint(tablet) {
    margin-left: 24px;
    font-size: 20px;
    line-height: 25px;
    cursor: default;
  }

  @include media-breakpoint(desktop) {
    font-size: 24px;
    line-height: 30px;
  }

  &-btn {
    margin-left: 8px;
    @include media-breakpoint(tablet) {
      display: none;
    }
  }
}

.function {
  display: flex;
  align-items: center;
  margin-left: auto;

  &-task-btn {
    padding: 10px 18px;

    $tablet: map-get($breakpoints, tablet) - 1;
    @media (max-width: $tablet) {
      font-size: 0;
      line-height: 1;
    }

    &-icon {
      width: 12px;
      height: 12px;

      @include media-breakpoint(tablet) {
        display: none;
      }
    }
  }

  &-menu-btn {
    padding: 8px 16.31px 8px 16px;

    &-icon {
      width: 3.69px;
      height: 16px;
    }
  }

  &-board-menu {
    width: 192px;
    position: absolute;
    top: calc(100% - 6px);
    right: 16.31px;
  }
}
</style>
