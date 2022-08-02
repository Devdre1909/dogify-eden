<template>
  <div>
    <div class="header__container">
      <div class="header__">
        <div class="title-and-action">
          <router-link to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
          </router-link>
          <span>{{ breed }}</span>
        </div>
      </div>
      <div class="header__icons">
        <router-link :to="`/${breed}`">More {{ this.breed }} </router-link>
        <a href="#">GITHUB</a>
      </div>
    </div>
    <div class="image__wide">
      <img class="image__img" :src="url" alt="url" />
    </div>
  </div>
</template>

<script>
export default {
  name: "SingleDogImage",
  data() {
    return {
      url: "",
      breed: "",
    };
  },
  created() {
    this.breed = this.$route.params.breed;
    this.url = this.$route.query.url;
  },
  mounted() {
    window.scrollTo({
      top: 0,
    });
  },
};
</script>

<style lang="scss" scoped>
.title-and-action {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-transform: capitalize;

  svg {
    cursor: pointer;
    width: 24px;
    display: block;
    margin-right: 1rem;
  }
}

.image {
  &__wide {
    width: 100%;
    /* max-height: 500px; */
  }

  &__img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
}
</style>
