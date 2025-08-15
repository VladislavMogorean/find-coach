<template>
  <div class="spinner-container">
    <div class="modern-spinner">
      <div class="spinner-circle"></div>
      <div class="spinner-circle"></div>
      <div class="spinner-circle"></div>
    </div>
    <p class="loading-text">Loading...</p>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/css/helpers" as *;

.spinner-container {
  @include flex-center;
  @include flex-column;
  padding: 2rem;
  gap: 1rem;
}

.loading-text {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.modern-spinner {
  @include flex-center;
  gap: 8px;

  .spinner-circle {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    @include gradient-primary;
    animation: bounce 1.4s ease-in-out infinite both;

    &:nth-child(1) {
      animation-delay: -0.32s;
    }

    &:nth-child(2) {
      animation-delay: -0.16s;
    }

    &:nth-child(3) {
      animation-delay: 0s;
    }
  }
}

@keyframes bounce {
  0%,
  80%,
  100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  40% {
    transform: scale(1.2);
    opacity: 1;
  }
}
</style>
