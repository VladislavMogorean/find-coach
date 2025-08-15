<template>
  <form class="coach-register__form" @submit.prevent="submitForm">
    <div class="coach-register__form-control">
      <label for="firstname" class="coach-register__label"
        >Firstname<span class="text-danger">*</span></label
      >
      <br />
      <input
        id="firstname"
        v-model.trim="firstName.val"
        type="text"
        :class="{ 'is-invalid': !firstName.isValid }"
        placeholder="James"
        class="coach-register__input"
        @blur="clearValidity(firstName)"
      />
      <br />
      <span v-if="!firstName.isValid" class="text-danger">
        Firstname must not be empty.
      </span>
    </div>
    <div class="coach-register__form-control">
      <label for="lastname" class="coach-register__label"
        >Lastname<span class="text-danger">*</span></label
      >
      <br />
      <input
        id="lastname"
        v-model.trim="lastName.val"
        type="text"
        :class="{ 'is-invalid': !lastName.isValid }"
        placeholder="Smith"
        class="coach-register__input"
        @blur="clearValidity(lastName)"
      />
      <br />
      <span v-if="!lastName.isValid" class="text-danger">
        Lastname must not be empty.
      </span>
    </div>
    <div class="coach-register__form-control">
      <label for="description" class="coach-register__label"
        >Description<span class="text-danger">*</span></label
      >
      <br />
      <textarea
        id="description"
        v-model.trim="description.val"
        class="coach-register__textarea"
        :class="{ 'is-invalid': !description.isValid }"
        placeholder="I am a coach with 10 years of experience..."
        rows="5"
        @blur="clearValidity(description)"
      ></textarea>
      <br />
      <span v-if="!description.isValid" class="text-danger">
        Description must not be empty.
      </span>
    </div>
    <div class="coach-register__form-control">
      <label for="rate" class="coach-register__label"
        >Hourly Rate<span class="text-danger">*</span></label
      >
      <br />
      <input
        id="rate"
        v-model.number="hourlyRate.val"
        type="number"
        placeholder="50"
        :class="{ 'is-invalid': !hourlyRate.isValid }"
        min="0"
        class="coach-register__input"
        @blur="clearValidity(hourlyRate)"
      />
      <br />
      <span v-if="!hourlyRate.isValid" class="text-danger">
        Hourly Rate must be a positive number.
      </span>
    </div>
    <div class="coach-register__form-control coach-register__areas">
      <h3 class="coach-register__title">
        Areas of Expertise<span class="text-danger">*</span>
      </h3>
      <div>
        <input
          id="frontend"
          v-model="areas.val"
          type="checkbox"
          value="frontend"
          class="coach-register__checkbox"
          @change="clearValidity(areas)"
        />
        <label for="frontend" class="coach-register__label">Frontend</label>
      </div>
      <div>
        <input
          id="backend"
          v-model="areas.val"
          type="checkbox"
          value="backend"
          class="coach-register__checkbox"
          @change="clearValidity(areas)"
        />
        <label for="backend" class="coach-register__label">Backend</label>
      </div>
      <div>
        <input
          id="career"
          v-model="areas.val"
          type="checkbox"
          class="coach-register__checkbox"
          value="career"
          @change="clearValidity(areas)"
        />
        <label for="career" class="coach-register__label">Career</label>
      </div>
      <br />
      <p v-if="!areas.isValid" class="text-danger">
        At least one area of expertise must be selected.
      </p>
    </div>

    <base-button type="submit" mode="success">Register</base-button>
  </form>
</template>

<script setup>
import { ref } from "vue";

// Reactive state
const firstName = ref({
  val: "",
  isValid: true,
});
const lastName = ref({
  val: "",
  isValid: true,
});
const description = ref({
  val: "",
  isValid: true,
});
const hourlyRate = ref({
  val: null,
  isValid: true,
});
const areas = ref({
  val: [],
  isValid: true,
});
const formIsValid = ref(true);

// Emits
const emit = defineEmits(["register-coach"]);

// Methods
const clearValidity = (input) => {
  input.isValid = true;
  formIsValid.value = true;
};

const validateForm = () => {
  formIsValid.value = true;

  if (firstName.value.val === "") {
    firstName.value.isValid = false;
    formIsValid.value = false;
  } else {
    firstName.value.isValid = true;
  }

  if (lastName.value.val === "") {
    lastName.value.isValid = false;
    formIsValid.value = false;
  } else {
    lastName.value.isValid = true;
  }

  if (description.value.val === "") {
    description.value.isValid = false;
    formIsValid.value = false;
  } else {
    description.value.isValid = true;
  }

  if (!hourlyRate.value.val || hourlyRate.value.val < 0) {
    hourlyRate.value.isValid = false;
    formIsValid.value = false;
  } else {
    hourlyRate.value.isValid = true;
  }

  if (areas.value.val.length === 0) {
    areas.value.isValid = false;
    formIsValid.value = false;
  } else {
    areas.value.isValid = true;
  }
};

const submitForm = () => {
  validateForm();

  if (!formIsValid.value) {
    return;
  }

  const formData = {
    firstName: firstName.value.val,
    lastName: lastName.value.val,
    description: description.value.val,
    hourlyRate: hourlyRate.value.val,
    areas: areas.value.val,
  };

  emit("register-coach", formData);
};
</script>

<style scoped lang="scss">
@use "@/assets/css/helpers" as *;

.coach-register__form {
  @include flex-column;
  max-width: 600px;
  margin: 0 auto;

  &-control {
    @include form-field;
    position: relative;
  }
}

.coach-register {
  &__label {
    @include label-base;
  }

  &__input {
    @include input-base;
    min-width: 100%;
  }

  &__textarea {
    @include input-base;
    min-width: 100%;
    resize: vertical;
    min-height: 120px;
    font-family: inherit;
  }

  &__areas {
    gap: 0;

    > div {
      display: flex;
      align-items: center;
      margin-bottom: 0.8rem;
      gap: 0.5rem;
    }
  }

  &__checkbox {
    @include checkbox-form;
    flex-shrink: 0;
  }

  &__label {
    margin: 0;
    cursor: pointer;
    font-weight: 500;
    color: var(--color-dark);
    font-size: 1rem;
    transition: color var(--transition-base);

    &:hover {
      color: var(--color-primary);
    }
  }

  &__title {
    margin: 1.5rem 0 1rem 0;
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--color-dark);
    @include text-gradient;
  }
}

.text-danger {
  @include text-error;
}

.is-invalid {
  border-color: var(--color-danger);
  box-shadow: 0 4px 20px rgba(231, 76, 60, 0.2);
  animation: shake 0.5s ease-in-out;
}
</style>
