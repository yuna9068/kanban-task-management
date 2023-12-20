<script lang="ts" setup>
</script>

<template>
  <section class="section section-link">
    <div class="section-container">
      <h2 class="sr-only">
        Sitemap
      </h2>
      <NuxtLink to="/about" class="link">
        About kanban
      </NuxtLink>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.section-link {
  padding-block: 1em;
}

.link {
  @include text-l;

  display: inline-block;
  color: $primary;
  font-weight: 700;

  &::after {
    content: "\279C";
    display: inline-block;
    translate: -0.5em;
    opacity: 0;
    transition: all 0.3s;
  }

  &:hover {
    &::after {
      translate: 0.3em;
      opacity: 1;
    }
  }
}
</style>
