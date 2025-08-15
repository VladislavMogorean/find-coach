<template>
  <base-card class="user-auth">
    <form class="user-auth__form" @submit.prevent="submitForm">
      <div class="user-auth__container">
        <label for="email" class="user-auth__label"
          >Email<span class="text-danger">*</span></label
        >
        <br />
        <input
          id="email"
          v-model.trim="email.val"
          type="text"
          :class="{ 'is-invalid': !email.isValid }"
          placeholder="youremail@example.com"
          class="user-auth__input"
          @blur="clearValidity(email)"
        />
        <br />
        <span v-if="!email.isValid" class="text-danger">
          Email must not be empty or invalid.
        </span>
      </div>
      <div class="user-auth__container">
        <label for="password" class="user-auth__label"
          >Password<span class="text-danger">*</span></label
        >
        <br />
        <input
          id="password"
          v-model.trim="password.val"
          type="password"
          :class="{ 'is-invalid': !password.isValid }"
          placeholder="********"
          class="user-auth__input"
          @blur="clearValidity(password)"
        />
        <br />
        <span v-if="!password.isValid" class="text-danger">
          Password must be not empty and between 8 and 20 characters (with at
          least one letter and one number).
        </span>
      </div>

      <div class="user-auth__control">
        <base-button type="submit" mode="success" class="user-auth__submit">{{
          submitButtonCaption
        }}</base-button>
        <base-button
          type="button"
          @click="switchAuthMode"
          mode="secondary"
          class="user-auth__signup"
          >{{ switchModeButtonCaption }}</base-button
        >
      </div>
    </form>
  </base-card>
</template>

<script setup>
import { ref, computed } from "vue";
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
const password = ref({
  val: "",
  isValid: true,
});
const formIsValid = ref(true);
const mode = ref("login");
const isLoading = ref(false);

// Constants
const numbers = "0123456789";
const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Computed
const submitButtonCaption = computed(() => {
  return mode.value === "login" ? "Login" : "Signup";
});

const switchModeButtonCaption = computed(() => {
  return mode.value === "login" ? "Signup instead" : "Login instead";
});

// Methods
const clearValidity = (input) => {
  input.isValid = true;
  formIsValid.value = true;
};

const validateForm = () => {
  formIsValid.value = true;

  if (
    email.value.val === "" ||
    !email.value.val.includes("@") ||
    !email.value.val.includes(".")
  ) {
    email.value.isValid = false;
    formIsValid.value = false;
  } else {
    email.value.isValid = true;
  }

  if (
    password.value.val === "" ||
    password.value.val.length < 8 ||
    password.value.val.length > 20 ||
    !password.value.val.split("").some((char) => letters.includes(char)) ||
    !password.value.val.split("").some((char) => numbers.includes(char))
  ) {
    password.value.isValid = false;
    formIsValid.value = false;
  } else {
    password.value.isValid = true;
  }
};

const submitForm = async () => {
  validateForm();

  if (!formIsValid.value) {
    return;
  }

  isLoading.value = true;

  const actionPayload = {
    email: email.value.val,
    password: password.value.val,
  };

  try {
    if (mode.value === "login") {
      await store.dispatch("login", actionPayload);
    } else {
      await store.dispatch("signup", actionPayload);
    }
    const redirectUrl = "/" + (route.query.redirect || "coaches");
    router.replace(redirectUrl);
  } catch (error) {
    isLoading.value = false;
  } finally {
    isLoading.value = false;
  }
};

const switchAuthMode = () => {
  mode.value = mode.value === "login" ? "signup" : "login";
};
</script>

<style scoped lang="scss">
@use "@/assets/css/helpers" as *;

.user-auth {
  @include flex-center;
  &__form {
    @include flex-column;
    gap: 1rem;
  }

  &__label {
    @include label-base;
    padding-left: 0.3rem;
  }

  &__input {
    @include input-base;
    min-width: 600px;
  }

  &__control {
    display: flex;
    gap: 1rem;
  }
}

.text-danger {
  @include text-error;
  margin-left: 0.1rem;
}

.is-invalid {
  border-color: #dc3545;
}
</style>
