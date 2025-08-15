<template>
  <li class="request-received__item">
    <base-card class="request-received__card">
      <a :href="`mailto:${email}`" class="request-received__email">{{
        email
      }}</a>

      <p class="request-received__message">{{ message }}</p>
    </base-card>
  </li>
</template>

<script>
export default {
  props: {
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
.request-received {
  &__card {
    margin-bottom: 1rem;
  }

  &__list-item {
    padding: 1rem;
  }

  &__email {
    font-weight: bold;
    color: #007bff;
    text-decoration: none;
    transition: color 0.5s;
    &:hover {
      text-decoration: underline;
    }
  }

  &__message {
    margin-top: 0.5rem;
    color: #555;
  }
}
</style>
