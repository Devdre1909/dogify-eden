<template>
  <div>
    <Loading v-if="globalLoading" :withError="isError" :errorMessage="error" />
    <div v-else>
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
          <a href="#">GITHUB</a>
        </div>
      </div>
      <div class="image-grid">
        <vImage v-for="img in images" :key="img" :source="img" />
      </div>
    </div>
  </div>
</template>

<script>
import { dogApi } from "@/services/api/dogApi";
import { mapGetters } from "vuex";
import vImage from "@/components/Image.vue";
import Loading from "../components/Loading.vue";

export default {
  name: "BreedView",
  components: { vImage, Loading },
  data() {
    return {
      breed: "",
      gettingBreeds: false,
      images: [],
      isError: false,
      error: "",
    };
  },
  computed: {
    ...mapGetters({
      breeds: "dog/getBreeds",
      globalLoading: "dog/getGlobalLoading",
    }),
  },
  watch: {
    $route(newValue) {
      if (newValue.params.breed !== this.breed) {
        this.breed = newValue.params.breed;
        this.getImages();
      }
    },
  },
  created() {
    this.breed = this.$route.params.breed;
    this.getImages();
  },
  methods: {
    async getImages() {
      this.images = this.$store.getters["dog/getBreed"](this.breed);

      if (this.images) return;

      this.$store.commit("dog/setGlobalLoading", true);

      const [req, err] = await dogApi().getAllImagesInABreed(this.breed);
      if (err) {
        this.isError = true;
        this.error = err.message;
        return;
      }

      this.$store.commit("dog/updateBreedsList", {
        name: this.breed,
        list: req.message,
      });

      this.images = req.message;
      this.$store.commit("dog/setGlobalLoading", false);
    },
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
</style>
