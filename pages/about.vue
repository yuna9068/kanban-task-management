<script lang="ts" setup>
useSeoMeta({
  title: 'About',
  ogTitle: 'About',
})

const features = [
  { title: 'Responsive web design - 依據裝置螢幕尺寸顯示最佳佈局' },
  { title: '查看頁面上所有互動元素的 Hover 狀態' },
  { title: '新增、讀取、更新、刪除看板和任務' },
  { title: '新增、編輯看板和任務時顯示表單驗證資訊' },
  { title: '可將子任務狀態標記為完成，並能在欄位間移動任務' },
  { title: '隱藏、顯示看板側邊欄' },
  { title: '切換淺色或深色模式' },
  {
    title: '允許使用者能拖拉改變資料',
    list: [
      '可在看板側邊欄拖拉看板圖示改變排序',
      '可在看板內拖拉欄位名稱改變排序',
      '可在欄位間拖拉任務改變狀態及排序',
      '可在任務詳細資訊內拖拉子任務改變排序',
    ],
  },
  { title: '追蹤修改內容，即使重新整理頁面也一樣（使用 localStorage）' },
  { title: '建立/編輯面板和任務時，在離開頁面之前顯示確認對話框' },
]

const built = [
  { name: 'Vue 3', desc: 'JavaScript 框架', link: 'https://vuejs.org' },
  { name: 'Vue Router 4', desc: 'Vue.js 的官方路由', link: 'https://router.vuejs.org' },
  { name: 'Pinia 2', desc: 'Vue.js 狀態管理庫', link: 'https://pinia.vuejs.org' },
  { name: 'Nuxt 3', desc: 'Vue 框架', link: 'https://nuxt.com' },
  { name: 'SCSS', desc: 'CSS 擴展語言', link: 'https://sass-lang.com' },
  { name: 'VueUse', desc: 'Vue 组合式 API 工具合集', link: 'https://vueuse.org' },
  { name: 'VueDraggablePlus', desc: '拖曳組件', link: 'https://alfred-skyblue.github.io/vue-draggable-plus' },
  { name: 'nuxt-svgo', desc: 'Nuxt 模組 - SVG 檔案', link: 'https://github.com/cpsoinos/nuxt-svgo' },
  { name: 'Nuxt Google Fonts', desc: 'Nuxt 模組 - Google Fonts', link: 'https://google-fonts.nuxtjs.org/' },
  { name: '@antfu/eslint-config', desc: '程式碼風格', link: 'https://github.com/antfu/eslint-config' },
]

const acknowledgments = [
  {
    title: '實作網頁深色模式及淺色模式的切換 by Mark',
    link: 'https://blog.tarswork.com/post/implement-dark-mode-and-light-mode-for-web-pages',
  },
  {
    title: 'Dark Theme Switcher in Vue.js by yestellar',
    link: 'https://github.com/yestellar/vue_theme_switcher#dark-theme-switcher-in-vuejs',
  },
  {
    title: 'Best-README-Template by othneildrew',
    link: 'https://github.com/othneildrew/Best-README-Template',
  },
]

const design = [
  {
    title: 'Frontend Mentor challenge README',
    link: 'https://github.com/yuna9068/kanban-task-management/blob/main/docs/design/README.md',
  },
  {
    title: 'Desktop design',
    link: 'https://github.com/yuna9068/kanban-task-management/blob/main/docs/design/preview.jpg',
  },
  {
    title: 'Add Task',
    link: 'https://res.cloudinary.com/dz209s6jk/image/upload/f_auto,q_auto,w_700/Challenges/ehqvxlqbe1q4m22wwuvm.jpg',
  },
  {
    title: 'View Task',
    link: 'https://res.cloudinary.com/dz209s6jk/image/upload/f_auto,q_auto,w_700/Challenges/iv8e2bbeplbfs641jksi.jpg',
  },
  {
    title: 'Tablet design',
    link: 'https://res.cloudinary.com/dz209s6jk/image/upload/f_auto,q_auto,w_700/Challenges/zdp0qj2lisrfwomfbrxo.jpg',
  },
  {
    title: 'Mobile design',
    link: 'https://res.cloudinary.com/dz209s6jk/image/upload/f_auto,q_auto,w_700/Challenges/uzyruyovh7rvfter09tp.jpg',
  },
]

const gitHub = [
  {
    title: 'Profile',
    link: 'https://github.com/yuna9068',
  },
  {
    title: 'Repository',
    link: 'https://github.com/yuna9068/kanban-task-management',
  },
  {
    title: 'README',
    link: 'https://github.com/yuna9068/kanban-task-management/blob/main/README.md',
  },
]
</script>

<template>
  <div class="about">
    <section class="section">
      <div class="section-heading">
        <h3 class="section-heading-title sr-only">
          About
        </h3>
      </div>
      <div class="section-content">
        依據
        <NuxtLink
          class="link"
          to="https://www.frontendmentor.io"
          target="_blank"
          external
        >
          Frontend Mentor
        </NuxtLink>
        網站上
        <NuxtLink
          class="link"
          to="https://www.frontendmentor.io/challenges/kanban-task-management-web-app-wgQLt-HlbB"
          target="_blank"
          external
        >
          Kanban task management web app
        </NuxtLink>
        挑戰提供的設計稿進行開發
      </div>
    </section>

    <section class="section">
      <div class="section-heading">
        <h3 class="section-heading-title">
          Features
        </h3>
      </div>
      <div class="section-content">
        <ul
          v-for="feature in features"
          :key="feature.title"
          class="list"
        >
          <li>
            <p>{{ feature.title }}</p>
            <ul class="list">
              <li
                v-for="item in feature.list"
                :key="item"
              >
                {{ item }}
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </section>

    <section class="section">
      <div class="section-heading">
        <h3 class="section-heading-title">
          Built with
        </h3>
      </div>
      <div class="section-content">
        <ul class="list">
          <li
            v-for="item in built"
            :key="item.name"
          >
            <template v-if="item.link">
              <NuxtLink
                class="link"
                :to="item.link"
                target="_blank"
                external
              >
                {{ item.name }}
              </NuxtLink>
              :&nbsp;{{ item.desc }}
            </template>
            <template v-else>
              {{ item.name }}
            </template>
          </li>
        </ul>
      </div>
    </section>

    <section class="section">
      <div class="section-heading">
        <h3 class="section-heading-title">
          Acknowledgments
        </h3>
      </div>
      <div class="section-content">
        <ul class="list">
          <li
            v-for="item in acknowledgments"
            :key="item.title"
          >
            <NuxtLink
              class="link"
              :to="item.link"
              target="_blank"
              external
            >
              {{ item.title }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </section>

    <section class="section">
      <div class="section-heading">
        <h3 class="section-heading-title">
          Design files
        </h3>
      </div>
      <div class="section-content">
        <ul class="list">
          <li
            v-for="item in design"
            :key="item.title"
          >
            <NuxtLink
              class="link"
              :to="item.link"
              target="_blank"
              external
            >
              {{ item.title }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </section>

    <section class="section">
      <div class="section-heading">
        <h3 class="section-heading-title">
          GitHub
        </h3>
      </div>
      <div class="section-content">
        <ul class="list">
          <li
            v-for="item in gitHub"
            :key="item.title"
          >
            <NuxtLink
              class="link"
              :to="item.link"
              target="_blank"
              external
            >
              {{ item.title }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.about {
  margin: 0 auto;
  padding: 30px 10%;
  letter-spacing: 1.5px;
}

.section {
  margin-bottom: 20px;

  &-heading-title {
    color: var(--text-secondary-color);
    font-size: 18px;
    font-weight: 700;
    line-height: 2;
    text-align: center;
  }

  &-content {
    @include text-l;

    padding: 0 1em;
  }
}

.link {
  color: $primary;
  text-shadow: none;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    color: $primary-light;
  }
}

.list {
  padding-left: 1em;
  list-style: circle;
}
</style>
