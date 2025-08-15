<template>
  <section class="coaches">
    <coach-filter @filter-changed="setFilters"></coach-filter>
    <base-card class="coaches-list">
      <div class="coaches-list__controls">
        <base-button type="button" @click="loadCoaches">Refresh</base-button>
        <base-button link to="auth?redirect=register" v-if="!isLoggedIn"
          >Login to Register as Coach</base-button
        >
        <base-button
          v-if="!isCoach && isLoggedIn && !isLoading"
          :to="'/coaches/register'"
          link
          mode="primary"
          >Register as Coach</base-button
        >
      </div>
      <base-spinner v-if="isLoading"></base-spinner>
      <ul v-if="hasCoaches" class="coaches-list__items">
        <coach-item
          v-for="coach in filteredCoaches"
          :id="coach.id"
          :key="coach.id"
          :first-name="coach.firstName"
          :last-name="coach.lastName"
          :areas="coach.areas"
          :rate="coach.hourlyRate"
        ></coach-item>
      </ul>
      <h3 v-if="!isLoading && !hasCoaches" class="coaches-list__error">
        No Coaches Found
      </h3>
    </base-card>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import CoachItem from "../../components/coaches/CoachItem.vue";
import CoachFilter from "../../components/coaches/CoachFilter.vue";

const store = useStore();

// Reactive state
const isLoading = ref(false);
const activeFilters = ref({
  frontend: true,
  backend: true,
  career: true,
});

// Computed
const isLoggedIn = computed(() => store.getters.isAuthenticated);
const isCoach = computed(() => store.getters["coaches/isCoach"]);
const hasCoaches = computed(
  () => !isLoading.value && store.getters["coaches/hasCoaches"]
);

const filteredCoaches = computed(() => {
  const coaches = store.getters["coaches/getCoaches"];
  return coaches.filter((coach) => {
    const frontendMatch =
      activeFilters.value.frontend &&
      coach.areas.some((area) =>
        ["frontend", "front-end", "react", "vue", "angular"].includes(
          area.toLowerCase()
        )
      );

    const backendMatch =
      activeFilters.value.backend &&
      coach.areas.some((area) =>
        ["backend", "back-end", "node", "express"].includes(area.toLowerCase())
      );

    const careerMatch =
      activeFilters.value.career &&
      coach.areas.some((area) =>
        ["career", "career-coaching"].includes(area.toLowerCase())
      );

    return frontendMatch || backendMatch || careerMatch;
  });
});

// Methods
const setFilters = (updatedFilters) => {
  activeFilters.value = updatedFilters;
};

const loadCoaches = async () => {
  isLoading.value = true;
  try {
    await store.dispatch("coaches/loadCoaches");
  } catch (error) {
    console.error("Failed to load coaches:", error);
  } finally {
    isLoading.value = false;
  }
};

// Lifecycle
onMounted(() => {
  loadCoaches();
});
</script>

<style scoped lang="scss">
@use "@/assets/css/helpers" as *;

.coaches {
  &-list {
    &__controls {
      @include flex-between;
      margin-bottom: 2rem;
      padding: 1.5rem;
      @include glass-effect(10px, 0.1);
      border-radius: var(--border-radius-lg);
    }

    &__items {
      @include grid-auto(350px, 2rem);
      padding: 0;
      margin: 0;
      list-style: none;
    }

    &__error {
      @include flex-center;
      text-align: center;
      color: rgba(255, 255, 255, 0.8);
      font-size: 1.5rem;
      margin: 3rem 0;
      padding: 2rem;
      @include glass-effect(10px, 0.1);
      border-radius: var(--border-radius-lg);
    }
  }
}
</style>
