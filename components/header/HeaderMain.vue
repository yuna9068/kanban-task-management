<script lang="ts" setup>
import { vOnClickOutside } from '@vueuse/components'
import { useToggle } from '@vueuse/core'
import type { OnClickOutsideOptions } from '@vueuse/core'

const route = useRoute()

const boardStore = useBoardStore()
const alertStore = useAlertStore()
const taskStore = useTaskStore()
const sidebarStore = useSidebarStore()
const { openModalBoard, deleteBoard } = boardStore
const { getBoard } = storeToRefs(boardStore)
const { openModalAlert } = alertStore
const { openModalTaskEdit } = taskStore
const { toggleSidebar } = sidebarStore
const { getSidebarDisplay } = storeToRefs(sidebarStore)

const { isMobile } = useDevice()

const elFunctionMenuBtn = ref()
const menuDisplay = ref(false)
const toggleMenu = useToggle(menuDisplay)

const page = computed(() => route.path)
const isIndex = computed(() => page.value === '/')
const title = computed(() => {
  const result = isIndex.value ? getBoard.value?.name : page.value.replace('/', '').toUpperCase()
  return result
})
const showFunctionBtn = computed(() => isIndex.value && getBoard.value?.name)

const disabledFunctionBtn = computed(() => isMobile.value && getSidebarDisplay.value)
const disabledAddNewTaskBtn = computed(() => !getBoard.value?.columns.length)

const onClickOutsideHandler: [(evt: any) => void, OnClickOutsideOptions] = [
  () => {
    closeMenu()
  },
  { ignore: [elFunctionMenuBtn] },
]

/**
 * 裝置為手機時，點擊看板名稱切換顯示/隱藏看板 Modal
 */
function toggleBoards() {
  if (isMobile.value)
    toggleSidebar()
}

function addTask() {
  openModalTaskEdit('create')
}

/**
 * 關閉操作看板下拉式選單
 */
function closeMenu() {
  toggleMenu(false)
}

/**
 * 開啟看板 Modal
 */
function openBoard() {
  openModalBoard('edit')
  closeMenu()
}

/**
 * 開啟警告 Modal
 */
function openAlert() {
  openModalAlert({
    title: 'Delete this board',
    content: `Are you sure you want to delete the ‘${title.value}’ board? This action will remove all columns and tasks and cannot be reversed.`,
    destructiveText: 'Delete',
    onDestructive: deleteBoard,
  })
  closeMenu()
}
</script>

<template>
  <div class="header-main">
    <h2 class="title heading-l" @click="toggleBoards()">
      <span>{{ title }}</span>
      <button
        v-show="showFunctionBtn"
        class="title-btn btn-arrow"
        :class="{ 'btn-arrow-up': getSidebarDisplay }"
        aria-label="Toggle Sidebar"
      >
        <SvgoIconChevronDown />
      </button>
    </h2>

    <div v-show="showFunctionBtn" class="function">
      <button
        class="function-task-btn btn-primary"
        :disabled="disabledFunctionBtn || disabledAddNewTaskBtn"
        @click="addTask()"
      >
        <SvgoIconAddTaskMobile class="function-task-btn-icon" />
        <span class="sr-only-mobile">+ Add New Task</span>
      </button>

      <button
        ref="elFunctionMenuBtn"
        class="function-menu-btn btn-ellipsis"
        :disabled="disabledFunctionBtn"
        aria-label="Toggle Board Menu"
        @click="toggleMenu()"
      >
        <SvgoIconVerticalEllipsis class="function-menu-btn-icon" />
      </button>

      <BaseDropdown
        v-on-click-outside="onClickOutsideHandler"
        class="function-board-menu"
        :display="menuDisplay"
      >
        <button class="btn-dropdown-item" @click="openBoard()">
          Edit Board
        </button>
        <button class="btn-dropdown-item text-alert" @click="openAlert()">
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
  min-height: 64px;
  padding: 16px 0;
  position: relative;

  @include media-breakpoint(tablet) {
    min-height: 80px;
  }
}

.title {
  flex: 1;
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

    @include media-mobile {
      font-size: 0;
      line-height: 1;
    }

    @include media-breakpoint(tablet) {
      @include btn-lg;
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
    z-index: 10;
  }
}
</style>
