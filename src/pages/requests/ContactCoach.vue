<template>
  <form class="coaches-contact__form" @submit.prevent="submitForm">
    <div class="coaches-contact__container">
      <label for="email" class="coaches-contact__label"
        >Your Email<span class="text-danger">*</span></label
      >
      <input
        id="email"
        v-model.trim="email.val"
        type="email"
        :class="{ 'is-invalid': !email.isValid }"
        placeholder="test@example.com"
        class="coaches-contact__input"
        @blur="clearInvalidation('email')"
      />
      <span v-if="!email.isValid" class="error-message"
        >Please enter a valid email address.</span
      >
    </div>
    <div class="coaches-contact__container">
      <label for="message" class="coaches-contact__label"
        >Your Message<span class="text-danger">*</span></label
      >
      <textarea
        id="message"
        v-model.trim="message.val"
        :class="{ 'is-invalid': !message.isValid }"
        rows="5"
        placeholder="I would like to know more about your coaching services..."
        class="coaches-contact__textarea"
        @blur="clearInvalidation('message')"
      ></textarea>
      <span v-if="!message.isValid" class="error-message"
        >Please enter a message.</span
      >
    </div>
    <div class="coaches-contact__actions">
      <base-button type="submit">Send Message</base-button>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";

const store = useStore();
const router = useRouter();
const route = useRoute();

// Reactive state
const email = ref({
  val: "",
  isValid: true,
});
const message = ref({
  val: "",
  isValid: true,
});
const dataIsValid = ref(true);

// Methods
const clearInvalidation = (input) => {
  if (input === "email") {
    email.value.isValid = true;
  } else if (input === "message") {
    message.value.isValid = true;
  }
  dataIsValid.value = true;
};

const formValidation = () => {
  dataIsValid.value = true;

  if (
    email.value.val === "" ||
    !email.value.val.includes("@") ||
    !email.value.val.includes(".")
  ) {
    email.value.isValid = false;
    dataIsValid.value = false;
  } else {
    email.value.isValid = true;
  }

  if (message.value.val.trim() === "") {
    message.value.isValid = false;
    dataIsValid.value = false;
  } else {
    message.value.isValid = true;
  }
};

const submitForm = () => {
  formValidation();

  if (!dataIsValid.value) {
    return;
  }

  store.dispatch("requests/contactCoach", {
    email: email.value.val,
    message: message.value.val,
    coachId: route.params.id,
  });

  router.replace("/coaches");
};
</script>

<style scoped lang="scss">
@use "@/assets/css/helpers" as *;

.coaches-contact {
  &__form {
    gap: 1rem;
  }

  &__container {
    @include form-field;
  }

  &__label {
    @include label-base;
  }

  &__input,
  &__textarea {
    @include input-base;
    width: 100%;
    margin-bottom: 1rem;
  }

  &__actions {
    text-align: right;
  }
}

.is-invalid {
  border-color: red;
}

.error-message {
  @include text-error;
  margin-top: -0.5rem;
}

.text-danger {
  color: red;
  margin-left: 0.25rem;
}
</style>
