<template>
  <router-link
    v-lazyload
    class="image__wrapper"
    :to="`/${breedFromLink(source)}/single?url=${source}`"
  >
    <ImageSpinner class="image__spinner" />

    <img
      class="image__item"
      :data-source="source"
      :alt="breedFromLink(source)"
    />

    <span class="image__tag">
      {{ breedFromLink(source) }}
    </span>
  </router-link>
</template>

<script>
import ImageSpinner from "./ImageSpineer.vue";

export default {
  name: "ImageItem",
  components: { ImageSpinner },
  props: {
    source: {
      type: String,
      required: true,
    },
  },
  filters: {},
  methods: {
    breedFromLink(link) {
      if (!link) return "";
      return link.split("/")[4];
    },
  },
};
</script>

<style scoped lang="scss">
.image {
  &__wrapper {
    overflow: hidden;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 13px;
    width: 100%;
    height: 300px;
    color: black;

    &.loaded {
      .image {
        &__item {
          visibility: visible;
          opacity: 1;
        }

        &__spinner {
          display: none;
        }
      }
    }

    &:hover {
      .image {
        &__item {
          transform: scale(0.95);
        }
        &__tag {
          transform: translate(-50%, 0) translateY(5px);
        }
      }
    }
  }

  &__spinner {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
  }

  &__item {
    width: 100%;
    border-radius: 4px;
    transition: all 0.4s ease-in-out;
    opacity: 0;
    visibility: hidden;
    transition: 0.7s;
    border: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    object-fit: cover;
    vertical-align: middle;
    transition: 0.7s;
  }

  &__tag {
    position: absolute;
    bottom: 5px;
    left: 50%;
    transform: translate(-50%, 0) translateY(50px);
    text-transform: uppercase;
    background-color: white;
    text-align: center;
    font-family: 14px;
    padding: 0.3rem 0.5rem;
    transition: 0.7s;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
}
</style>
