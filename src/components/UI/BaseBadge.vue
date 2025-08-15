<template>
  <span class="badge" :class="type">
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: "BaseBadge",
  props: {
    type: {
      type: String,
      required: false,
      default: "",
      validator(value) {
        return ["frontend", "backend", "career"].includes(value);
      },
    },
  },
};
</script>

<style scoped lang="scss">
@use "@/assets/css/helpers" as *;

.badge {
  display: inline-block;
  padding: 0.4rem 0.8rem;
  margin: 0.2rem;
  border-radius: 1.5rem;
  font-weight: bold;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  border: 2px solid transparent;

  &.frontend {
    @include gradient-primary;
    color: white;
    box-shadow: 0 2px 10px rgba(102, 126, 234, 0.3);

    &:hover {
      @include hover-lift;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    }
  }

  &.backend {
    @include gradient-secondary;
    color: white;
    box-shadow: 0 2px 10px rgba(245, 87, 108, 0.3);

    &:hover {
      @include hover-lift;
      box-shadow: 0 4px 15px rgba(245, 87, 108, 0.4);
    }
  }

  &.career {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    color: white;
    box-shadow: 0 2px 10px rgba(79, 172, 254, 0.3);

    &:hover {
      @include hover-lift;
      box-shadow: 0 4px 15px rgba(79, 172, 254, 0.4);
    }
  }
}
</style>
