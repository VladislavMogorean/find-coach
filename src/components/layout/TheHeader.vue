<template>
  <header class="header">
    <div class="header__logo">
      <router-link to="/">Find a Coach</router-link>
    </div>
    <nav class="header__navigation">
      <ul class="header__navigation-list">
        <li class="header__navigation-item">
          <router-link to="/coaches">All Coaches</router-link>
        </li>
        <li class="header__navigation-item" v-if="isLoggedIn">
          <router-link to="/requests"> Coaching Requests </router-link>
        </li>
        <li v-if="!isLoggedIn" class="header__navigation-item">
          <router-link to="/auth">Login</router-link>
        </li>
        <li class="header__navigation-item">
          <router-link to="/about">About us</router-link>
        </li>
        <li class="header__navigation-item" v-if="isLoggedIn">
          <base-button type="button" @click="logout" mode="info"
            >Logout</base-button
          >
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

// Computed
const isLoggedIn = computed(() => store.getters.isAuthenticated);

// Methods
const logout = () => {
  store.dispatch("logout");
  router.replace("/coaches");
};
</script>

<style scoped lang="scss">
@use "@/assets/css/helpers" as *;

.header {
  @include flex-between;
  @include gradient-primary;
  padding: 1.5rem 2rem;
  margin-bottom: 2rem;
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  &__logo {
    font-size: 1.8rem;
    font-weight: 800;
    color: #ffffff;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

    a {
      text-decoration: none;
      color: #ffffff;
      transition: all 0.3s ease;

      &:hover {
        transform: scale(1.05);
        color: #ffeaa7;
      }
    }
  }

  &__navigation {
    &-list {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }

    &-item {
      list-style: none;

      a {
        display: inline-block;
        text-decoration: none;
        color: #ffffff;
        font-size: 1rem;
        font-weight: 500;
        padding: 1rem 1.5rem;
        position: relative;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        border-radius: 25px;
        backdrop-filter: blur(10px);

        &::before {
          content: "";
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        &::after {
          content: "";
          position: absolute;
          bottom: 5px;
          left: 50%;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #ffeaa7, #fab1a0);
          transition: all 0.3s ease;
          transform: translateX(-50%);
          border-radius: 1px;
        }

        &:hover {
          color: #ffeaa7;
          transform: translateY(-2px);

          &::before {
            opacity: 1;
          }

          &::after {
            width: 60%;
          }
        }

        &:focus {
          outline: none;
          box-shadow: none;
        }
      }
    }
  }

  .router-link-active {
    color: #ffeaa7 !important;

    &:focus {
      outline: none !important;
      box-shadow: none !important;
    }

    &::before {
      opacity: 1 !important;
    }

    &::after {
      width: 60% !important;
    }
  }
}
</style>
