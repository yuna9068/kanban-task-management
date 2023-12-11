<script lang="ts" setup>
</script>

<template>
  <div class="loading">
    <div class="loading-content">
      <div class="icon">
        <div class="icon-bar" />
        <div class="icon-bar" />
        <div class="icon-bar" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.loading {
  display: grid;
  place-content: center;
  width: 100%;
  height: 100%;
}

.icon {
  display: flex;
  justify-content: center;
  gap: 6px;

  &-bar {
    $delay: 0.2s;
    $transition: $delay * 3;

    width: 12px;
    aspect-ratio: 6 / 25;
    border-radius: 4px;
    background: $purple;
    animation: bar $transition ease-in-out infinite alternate;

    @for $i from 0 through 2 {
      &:nth-child(#{$i + 1}) {
        opacity: 1 - 0.25 * $i;
        animation-delay: $delay * $i ;
      }
    }
  }
}

@keyframes bar {
  0% {
    transform: none;
  }

  100% {
    transform: scale(1.2)
  }
}
</style>
