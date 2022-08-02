<template>
  <aside :class="`sidebar ${isSidebarOpen ? 'sidebar--isOpen' : ''}`">
    <h2 class="sidebar__title">
      <router-link to="/">Dofigy</router-link>
    </h2>
    <form class="search-breeds-form">
      <input
        type="text"
        placeholder="Search breeds..."
        aria-label="Search breeds"
        v-model="searchInput"
      />
    </form>
    <div class="sidebar__content">
      <template v-for="(breed, i) in filteredBreeds">
        <router-link
          v-if="breed.hasChildren === false"
          class="breeds"
          :key="`${breed.name}-${i}`"
          :to="`/${breed.name}`"
          @click.native="updateState(false)"
        >
          {{ breed.name }}
        </router-link>
        <details
          v-else
          class="breeds breeds--expandable"
          :key="`${breed.name}${i}`"
        >
          <summary>
            <router-link
              :to="`/${breed.name}`"
              @click.native="updateState(false)"
              >{{ breed.name }}</router-link
            >
          </summary>
          <ul class="breed-sub-list">
            <li v-for="bChild in breed.children" :key="bChild">
              {{ bChild }}
            </li>
          </ul>
        </details>
      </template>
    </div>
  </aside>
</template>

<script>
import { dogApi } from "@/services/api/dogApi";
import { mapGetters } from "vuex";

export default {
  name: "HomeView",
  props: {
    isSidebarOpen: {
      type: Boolean,
      default: false,
    },
  },

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
    }),
    filteredBreeds() {
      return this.breeds.filter((breed) => {
        if (breed.hasChildren) {
          const list = [breed.name, ...breed.children];
          return list
            .toString()
            .toLowerCase()
            .includes(this.searchInput.toLowerCase());
        } else {
          return breed.name.toLowerCase().includes(this.searchInput);
        }
      });
    },
  },
  created() {
    this.getBreeds();
  },
  methods: {
    updateState(status) {
      this.$emit("update:isSidebarOpen", status);
    },
    async getBreeds() {
      const [res, err] = await dogApi().getAllBreads();
      if (err) {
        console.log(err);
        return;
      }
      this.$store.commit("dog/setBreeds", res.message);
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  background-color: aliceblue;
  padding: 2rem 0rem;
  max-height: 100vh;
  overflow-y: scroll;
  position: absolute;
  width: 100%;
  z-index: 3;
  top: 7rem;
  transform: translateY(-160%);
  transition: 0.7s;

  &--isOpen {
    transform: translateY(0%);
  }

  @media (min-width: 768px) {
    display: block;
    position: relative;
    transform: unset;
    top: unset;

  }

  &__title {
    text-align: center;
    margin-bottom: 1rem;
  }
}

.search-breeds-form {
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
}

.search-breeds-form input {
  display: block;
  width: 100%;
  padding: 0.5rem 1rem;
  font-size: 1rem;
}

.breeds:first-child {
  border-top: 1px solid rgb(197, 197, 197);
}

.breeds {
  padding: 1rem 1.2rem;
  text-transform: uppercase;
  border-bottom: 1px solid rgb(197, 197, 197);
  cursor: pointer;
  display: block;
  text-decoration: none;
  color: black;
}

.breeds:hover {
  background-color: antiquewhite;
}

.breeds--expandable {
}

.breeds--expandable summary {
  position: relative;
}

.breeds--expandable summary::marker {
  content: "";
}

.breeds--expandable summary::after {
  content: "+";
  position: absolute;
  right: 0;
  top: 0;
}

.breeds--expandable .breed-sub-list {
  margin-top: 1rem;
  list-style: none;
}

.breeds--expandable .breed-sub-list li {
  margin-left: 0.3rem;
  padding: 0.5rem 0;
}

a {
  text-decoration: none;
  color: inherit;
}
</style>
