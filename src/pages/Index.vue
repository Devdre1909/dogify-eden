<template>
  <div>
    <Loading v-if="globalLoading" />
    <div v-else>
      <div class="header__container">
        <div class="header__title">Random Dog Images</div>
        <div class="header__search">
          <input
            type="text"
            placeholder="Search by breeds ..."
            aria-label="Search by breeds"
            v-model="searchInput"
          />
        </div>
        <div class="header__icons">
          <a href="#">GITHUB</a>
        </div>
      </div>
      <div class="image-grid">
        <vImage
          v-for="img in filteredImages"
          :key="idAtRandom(img)"
          :source="img"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { dogApi } from "@/services/api/dogApi";
import { mapGetters } from "vuex";
import vImage from "@/components/Image.vue";
import Loading from "@/components/Loading.vue";

export default {
  name: "HomeView",
  components: { vImage, Loading },
  data() {
    return {
      gettingBreeds: false,
      images: [],
      searchInput: "",
    };
  },
  computed: {
    ...mapGetters({
      breeds: "dog/getBreeds",
      globalLoading: "dog/getGlobalLoading",
    }),
    filteredImages() {
      return this.images.filter((src) =>
        src.toLowerCase().includes(this.searchInput.toLowerCase())
      );
    },
  },
  created() {
    this.getBreeds();
    this.getRandomImage();
  },
  methods: {
    async getBreeds() {
      const [res, err] = await dogApi().getAllBreads();
      if (err) {
        console.log(err);
        return;
      }
      this.$store.commit("dog/setBreeds", res.message);
    },
    getRandomImage() {
      this.$store.commit("dog/setGlobalLoading", true);
      const req = dogApi().getRandom().getRandomImage(50);
      Promise.all([req, req])
        .then(([p1, p2]) => {
          this.images = [...p1[0].message, ...p2[0].message];
          this.$store.commit("dog/setGlobalLoading", false);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    idAtRandom(breed) {
      return `${Math.floor(Math.random() * 1000)}-${breed}`;
    },
  },
};
</script>
