<template>
  <li class="coaches-list__item">
    <h3 class="coaches-list__item-name">{{ fullName }}</h3>
    <h4 class="coaches-list__item-rate">${{ rate }}</h4>
    <div class="coaches-list__item-areas">
      <base-badge
        v-for="area in areas"
        :key="area"
        :type="getBadgeType(area)"
        >{{ area }}</base-badge
      >
    </div>
    <div class="coaches-list__item-actions">
      <base-button :to="coachContactLink" mode="success" link
        >Contact</base-button
      >
      <base-button :to="coachDetailsLink" mode="success" link
        >View Details</base-button
      >
    </div>
  </li>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    areas: {
      type: Array,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
  },
  computed: {
    fullName() {
      return `${this.firstName} ${this.lastName}`;
    },
    coachContactLink() {
      return `/coaches/${this.id}/contact`;
    },
    coachDetailsLink() {
      return `/coaches/${this.id}`;
    },
  },
  methods: {
    getBadgeType(area) {
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
    },
  },
};
</script>

<style scoped lang="scss">
@use "@/assets/css/helpers" as *;

.coaches-list__item {
  list-style: none;
  margin: 0;
  @include glass-card;
  @include container-padding;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    @include gradient-accent;
  }

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  }

  &-name {
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 0.8rem;
    color: #2c3e50;
    @include text-gradient;
  }

  &-rate {
    font-size: 1.4rem;
    font-weight: 600;
    color: #27ae60;
    margin-bottom: 1.2rem;
    padding: 0.5rem 1rem;
    background: rgba(39, 174, 96, 0.1);
    border-radius: 25px;
    display: inline-block;
    border: 2px solid rgba(39, 174, 96, 0.2);

    &::before {
      content: "💰 ";
      margin-right: 0.5rem;
    }
  }

  &-areas {
    margin-bottom: 1.5rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
  }

  &-actions {
    display: flex;
    gap: 0.5rem;
    justify-content: flex-start;
    align-items: center;
  }
}
</style>
