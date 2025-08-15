<template>
  <section class="request-received">
    <base-card class="request-received__card">
      <header class="request-received__header">
        <h2 class="request-received__title">Your Request Has Been Received</h2>
      </header>
      <base-spinner v-if="isLoading"></base-spinner>
      <ul v-else-if="hasRequests && !isLoading" class="request-received__list">
        <request-item
          v-for="request in receivedRequests"
          :key="request.id"
          :email="request.userEmail"
          :message="request.message"
        />
      </ul>
      <h3 v-else class="request-received__subtitle">
        You haven't received any response yet, but you can check back later.
      </h3>
    </base-card>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import RequestItem from "../../components/requests/RequestItem.vue";

const store = useStore();

// Reactive state
const isLoading = ref(false);

// Computed
const receivedRequests = computed(() => store.getters["requests/getRequests"]);
const hasRequests = computed(() => store.getters["requests/hasRequests"]);

// Methods
const loadRequests = async () => {
  isLoading.value = true;
  try {
    await store.dispatch("requests/fetchRequests");
  } catch (error) {
    console.error("Failed to load requests:", error);
  } finally {
    isLoading.value = false;
  }
};

// Lifecycle
onMounted(() => {
  loadRequests();
});
</script>

<style scoped lang="scss">
.request-received {
  &__header {
    margin-bottom: 1rem;
  }

  &__card {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__title {
    font-size: 1.5rem;
    font-weight: bold;
  }

  &__list {
    list-style: none;
    padding: 0;
    margin: 0 0 1rem 0;

    &__item {
      margin-bottom: 0.5rem;
    }
  }

  &__subtitle {
    font-size: 1rem;
    color: gray;
  }
}
</style>
