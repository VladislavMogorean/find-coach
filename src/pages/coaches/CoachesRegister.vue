<template>
  <section class="coaches-register">
    <base-card class="coaches-register__card">
      <h2 class="coaches-register__title">Register as a coach now!</h2>
      <coach-form @register-coach="registerCoach"></coach-form>
    </base-card>
  </section>
</template>

<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import CoachForm from "../../components/coaches/CoachForm.vue";

const store = useStore();
const router = useRouter();

// Methods
const registerCoach = (coachData) => {
  store.dispatch("coaches/registerCoach", coachData);
  router.replace("/coaches");
};
</script>

<style scoped lang="scss">
.coaches-register {
  &__title {
    text-align: center;
    margin-bottom: 1.5rem;
  }
}
</style>
