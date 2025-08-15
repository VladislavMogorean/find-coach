<template>
  <the-header></the-header>
  <main>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
  <the-footer></the-footer>
</template>

<script>
import TheFooter from "./components/layout/TheFooter.vue";
import TheHeader from "./components/layout/TheHeader.vue";

export default {
  components: {
    "the-header": TheHeader,
    "the-footer": TheFooter,
  },
  created() {
    this.$store.dispatch("tryLogin");
  },
  computed: {
    didAutoLogout() {
      return this.$store.getters.didAutoLogout;
    },
  },
  watch: {
    didAutoLogout(curValue, oldValue) {
      if (curValue && curValue !== oldValue) {
        this.$router.replace("/auth");
        this.$store.commit("clearAutoLogout");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
  filter: blur(5px);
}

.fade-enter-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
  filter: blur(0);
}
</style>
