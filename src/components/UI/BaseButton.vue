<template>
  <button
    v-if="!link"
    :class="mode"
    class="btn"
    :type="type"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
  <router-link v-else :to="to" class="btn" :class="mode">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      required: false,
      default: null,
      validator(value) {
        return ["primary", "secondary", "success", "danger", "info"].includes(
          value
        );
      },
    },
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
    to: {
      type: String,
      required: false,
      default: "/",
    },
    type: {
      type: String,
      required: false,
      default: "button",
      validator(value) {
        return ["button", "submit", "reset"].includes(value);
      },
    },
  },
  emits: ["click"],
};
</script>

<style scoped lang="scss">
@use "@/assets/css/helpers" as *;

.btn {
  @include button-base;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  border-radius: 50px;
  letter-spacing: 0.5px;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  @include flex-center;
  min-width: 120px;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.4),
      transparent
    );
    transition: left 0.5s;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
  }

  &.primary {
    @include gradient-primary;
    color: white;

    &:hover {
      background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
    }
  }

  &.secondary {
    background: linear-gradient(135deg, #868f96 0%, #596164 100%);
    color: white;

    &:hover {
      background: linear-gradient(135deg, #7a8289 0%, #4f5659 100%);
    }
  }

  &.success {
    background: linear-gradient(135deg, #56ab2f 0%, #a8e6cf 100%);
    color: white;

    &:hover {
      background: linear-gradient(135deg, #4e9929 0%, #98d6bf 100%);
    }
  }

  &.danger {
    background: linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%);
    color: white;

    &:hover {
      background: linear-gradient(135deg, #e63946 0%, #e63022 100%);
    }
  }

  &.info {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    color: white;

    &:hover {
      background: linear-gradient(135deg, #3d8bfe 0%, #00d9fe 100%);
    }
  }
}
</style>
