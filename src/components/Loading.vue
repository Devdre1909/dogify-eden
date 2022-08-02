<template>
  <div class="load__wrapper">
    <div class="load__container">
      <p class="load__title">
        {{ withError ? "Sorry, an error occurred" : "Loading" }}
      </p>
      <div v-if="withError" class="load__fact">
        <p>{{ errorMessage }}</p>
        <p>
          <router-link to="/">Back to home</router-link>
        </p>
      </div>
      <p v-else>
        Dog Fact (Some have such good noses they can sniff out medical problems)
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoadingComponent",
  props: {
    withError: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.load {
  &__wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    height: 100vh;
    width: 100%;
  }
  &__container {
  }
  &__title {
    font-weight: 600;
    margin-bottom: 0.7rem;
  }
  &__fact {
    font-size: 14px;
    margin-bottom: 0.7rem;
  }
}
</style>
