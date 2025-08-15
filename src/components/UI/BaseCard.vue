<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<script></script>

<style scoped lang="scss">
@use "@/assets/css/helpers" as *;

.container {
  @include glass-card;
  @include container-padding;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    @include gradient-accent;
  }
}
</style>
