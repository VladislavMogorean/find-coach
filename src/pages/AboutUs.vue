<template>
  <section class="about-us">
    <base-card class="about-us__card">
      <h1 class="about-us__title">About Us</h1>
      <p class="about-us__description">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
        tempore similique, nihil dolore totam sapiente animi velit error quo
        quaerat odit repudiandae, necessitatibus eum debitis ut molestiae
        molestias asperiores eveniet accusamus rem, omnis numquam accusantium.
        Recusandae, cumque vel impedit minus minima magni hic voluptate id
        blanditiis quis in dignissimos fugit asperiores architecto repudiandae!
        Ut eaque quisquam animi reiciendis possimus, inventore rem nemo impedit
        totam nesciunt nulla ullam sunt maiores neque dolore autem officiis
        molestiae facilis laboriosam in consequuntur? Rem ipsam, ipsa sit earum
        id sequi illum libero qui natus exercitationem enim veniam et nam! Aut
        est incidunt hic deserunt eos sapiente nisi quae totam quisquam suscipit
        exercitationem similique aliquam ipsa, officia consequuntur! Facilis
        dolor odit tenetur delectus. Et, similique ea.
      </p>
    </base-card>
    <base-card class="about-us__card">
      <h2 class="about-us__subtitle">Our Mission</h2>
      <p class="about-us__mission">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla ducimus,
        rerum ut commodi non, enim nemo delectus explicabo amet incidunt eveniet
        sunt hic quae nihil, quasi deserunt perferendis fuga nam.
      </p>
    </base-card>
  </section>
</template>

<style scoped lang="scss">
@use "@/assets/css/helpers" as *;

.about-us {
  &__card {
    margin-bottom: 2rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__title {
    @include text-gradient;
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: 1.5rem;
  }

  &__subtitle {
    @include text-gradient;
    font-size: 1.8rem;
    font-weight: 800;
    margin-bottom: 1rem;
  }

  &__description,
  &__mission {
    font-size: 1.1rem;
    line-height: 1.7;
    color: #2c3e50;
    text-align: justify;
  }
}
</style>
