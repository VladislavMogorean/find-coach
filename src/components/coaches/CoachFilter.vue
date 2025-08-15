<template>
  <base-card class="coaches-filter">
    <h2 class="coaches-filter__title">Find Your Coach</h2>
    <span class="coaches-filter__options">
      <input
        id="frontend"
        type="checkbox"
        class="coaches-filter__checkbox"
        checked
        @change="setFilter"
      />
      <label for="frontend" class="coaches-filter__label">Frontend</label>
    </span>
    <span class="coaches-filter__options">
      <input
        id="backend"
        type="checkbox"
        class="coaches-filter__checkbox"
        checked
        @change="setFilter"
      />
      <label for="backend" class="coaches-filter__label">Backend</label>
    </span>
    <span class="coaches-filter__options">
      <input
        id="career"
        type="checkbox"
        class="coaches-filter__checkbox"
        checked
        @change="setFilter"
      />
      <label for="career" class="coaches-filter__label">Career</label>
    </span>
  </base-card>
</template>

<script>
export default {
  emits: ["filter-changed"],
  data() {
    return {
      filters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  methods: {
    setFilter(event) {
      const inputId = event.target.id;
      const isActive = event.target.checked;
      const updatedFilters = {
        ...this.filters,
        [inputId]: isActive,
      };
      this.filters = updatedFilters;
      this.$emit("filter-changed", updatedFilters);
    },
  },
};
</script>

<style scoped lang="scss">
@use "@/assets/css/helpers" as *;

.coaches-filter {
  &__title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  &__options {
    @include flex-center;
    justify-content: flex-start;
    margin-bottom: 0.5rem;
  }
  &__checkbox {
    appearance: none;
    width: 1rem;
    height: 1rem;
    border: 1px solid #0d6efd;
    border-radius: 0.25rem;
    background-color: #fff;
    cursor: pointer;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    margin: 0;

    &:checked {
      background-color: #0d6efd;
      border-color: #0d6efd;
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='m6 10 3 3 6-6'/%3e%3c/svg%3e");
    }

    &:active {
      box-shadow: inset 0 0 0.25rem rgba(13, 110, 253, 0.5);
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0.25rem rgba(13, 110, 253, 0.5);
    }

    &:hover:not(:disabled) {
      border-color: #0b5ed7;
    }

    &:disabled {
      background-color: #e9ecef;
      border-color: #adb5bd;
      cursor: not-allowed;
    }

    &:disabled + label {
      color: #adb5bd;
    }
  }
  &__label {
    margin-left: 0.3rem;
    font-size: 1rem;
    color: #212529;

    &:hover {
      color: #0d6efd;
    }
  }
}
</style>
