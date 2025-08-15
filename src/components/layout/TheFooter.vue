<template>
  <footer class="footer">
    <div class="footer__content">
      <nav class="footer__navigation">
        <ul class="footer__list">
          <li class="footer__item">
            <router-link to="/coaches">Coaches</router-link>
          </li>
          <li class="footer__item">
            <router-link to="/about">About</router-link>
          </li>
          <li class="footer__item" v-if="!isLoggedIn">
            <router-link to="/auth">Login</router-link>
          </li>
          <li class="footer__item">
            <router-link to="/requests" v-if="isLoggedIn">Requests</router-link>
          </li>
        </ul>
      </nav>
      <a
        href="https://www.yourcompany.com"
        class="footer__copyright"
        target="_blank"
        >© 2025 Your Company Name</a
      >
    </div>
  </footer>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
  },
};
</script>

<style scoped lang="scss">
@use "@/assets/css/helpers" as *;

.footer {
  @include gradient-primary;
  margin-top: 40px;
  padding: 1rem;
  &__content {
    @include flex-center;
    @include flex-column;
    gap: 1rem;
  }

  &__title {
    margin: 0;
    font-size: 1.5rem;
    color: #fff;
  }

  &__copyright {
    color: #fff;
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.3s;

    &:hover {
      color: #ffcc00;
    }
  }

  &__navigation {
    margin-top: 1rem;

    .footer__list {
      list-style: none;
      padding: 0;
      display: flex;
      gap: 1rem;

      .footer__item {
        a {
          text-decoration: none;
          color: #fff;
          transition: color 0.3s;

          &:hover {
            color: #ffcc00;
          }
        }
      }
    }
  }

  .router-link-active {
    color: #ffcc00 !important;

    &::after {
      width: 100% !important;
      background-color: #ffcc00;
    }
  }
}
</style>
