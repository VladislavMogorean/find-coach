<template>
  <div class="not-found">
    <h1 class="not-found__error">404</h1>
    <h2 class="not-found__title">Sorry, we couldn't find that page</h2>
    <p class="not-found__message">
      The page you are looking for might have been removed, had its name
      changed, or is temporarily unavailable.
    </p>
    <router-link to="/">Go to Home</router-link>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/css/helpers" as *;

.not-found {
  @include flex-center;
  @include flex-column;
  padding: 2rem;

  &__title {
    font-size: 2rem;
    font-weight: bold;
    color: #333;
  }

  &__error {
    font-size: 7rem;
    font-weight: 900;
    color: #000;
    margin-bottom: 0.5rem;
  }

  &__message {
    font-size: 1rem;
    color: #666;
  }

  a {
    display: inline-block;
    margin-top: 1rem;
    text-decoration: none;
    color: #23588d;
    font-weight: bold;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    border: 1px solid #23588d;
    border-radius: 4px;
    transition: color 0.3s;

    &:hover {
      color: #ffcc00;
    }
  }
}
</style>
