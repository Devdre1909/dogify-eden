<template>
  <div class="main__wrapper">
    <sidebar :isSidebarOpen.sync="isSidebarOpen" />
    <main class="main__container">
      <div class="main__header">
        <span class="main__menu-mobile" @click="isSidebarOpen = !isSidebarOpen">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </span>
      </div>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar/Sidebar.vue";
export default {
  components: { Sidebar },
  name: "MainLayout",
  data() {
    return {
      isSidebarOpen: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.main {
  &__wrapper {
    height: 100vh;
    margin: auto;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    overflow: hidden;
  }

  &__header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0.8rem 0.5rem;

    @media (min-width: 768px) {
      display: none;
    }
  }

  &__menu-mobile {
    padding: 1rem;
    svg {
      width: 24px;
      height: 24px;
      color: black;
    }
  }

  @media (min-width: 768px) {
    &__wrapper {
      grid-template-columns: 320px 1fr;
    }
  }

  &__container {
    padding: 1rem;
    height: 100vh;
    overflow-x: scroll;
  }
}
</style>
