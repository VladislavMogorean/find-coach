<template>
  <div class="container">
    <section class="coaches-details">
      <base-card class="coaches-details__card">
        <h2 class="coaches-details__name">{{ fullName }}</h2>
        <h3 class="coaches-details__rate">${{ rate }} hour</h3>
      </base-card>
    </section>
    <section class="coaches-contact">
      <base-card class="coaches-contact__card">
        <header class="coaches-contact__header">
          <h2 class="coaches-contact__title">Interested? Reach out now</h2>
          <base-button link :to="contactLink" type="button"
            >Contact</base-button
          >
        </header>
        <router-view></router-view>
      </base-card>
    </section>
    <section class="coaches-areas">
      <base-card class="coaches-areas__card">
        <base-badge
          v-for="area in areas"
          :key="area"
          :type="getBadgeType(area)"
          >{{ area }}</base-badge
        >
        <p class="coaches-areas__description">{{ description }}</p>
      </base-card>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";

const props = defineProps(["id"]);
const store = useStore();

// Reactive state
const selectedCoach = ref(null);

// Computed
const fullName = computed(() => {
  if (!selectedCoach.value) return "";
  return `${selectedCoach.value.firstName} ${selectedCoach.value.lastName}`;
});

const contactLink = computed(() => `/coaches/${props.id}/contact`);
const areas = computed(() => selectedCoach.value?.areas || []);
const rate = computed(() => selectedCoach.value?.hourlyRate || 0);
const description = computed(() => selectedCoach.value?.description || "");

// Methods
const getBadgeType = (area) => {
  const areaLower = area.toLowerCase();

  if (
    areaLower.includes("frontend") ||
    areaLower.includes("front-end") ||
    areaLower.includes("react") ||
    areaLower.includes("vue") ||
    areaLower.includes("angular")
  ) {
    return "frontend";
  } else if (
    areaLower.includes("backend") ||
    areaLower.includes("back-end") ||
    areaLower.includes("node") ||
    areaLower.includes("python") ||
    areaLower.includes("java")
  ) {
    return "backend";
  } else {
    return "career";
  }
};

// Lifecycle
onMounted(() => {
  selectedCoach.value = store.getters["coaches/getCoaches"].find(
    (coach) => coach.id === props.id
  );
});
</script>

<style scoped lang="scss">
@use "@/assets/css/helpers" as *;

.coaches-details {
  &__card {
    margin-bottom: 1.5rem;
  }

  &__name {
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
  }

  &__rate {
    font-size: 1.2rem;
    color: #666;
  }
}

.coaches-contact {
  &__card {
    margin-bottom: 1.5rem;
  }

  &__header {
    @include flex-between;
    margin-bottom: 1rem;
  }

  &__title {
    font-size: 1.5rem;
  }
}

.coaches-areas {
  &__card {
    margin-bottom: 1.5rem;
  }

  &__description {
    margin-top: 0.5rem;
  }
}
</style>
