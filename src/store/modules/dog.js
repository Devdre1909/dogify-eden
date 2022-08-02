const state = () => ({
  breeds: {},
  selectedBreeds: {},
  globalLoading: false,
});
const mutations = {
  setBreeds(state, breeds) {
    state.breeds = breeds;
  },
  updateBreedsList(state, { name, list }) {
    state.selectedBreeds[name] = list;
  },
  setGlobalLoading(state, status) {
    state.globalLoading = status;
  },
};
const actions = {};
const getters = {
  getBreeds: (state) => {
    const breeds = [];
    if (Object.keys(state.breeds).length > 0) {
      for (const key in state.breeds) {
        if (Object.hasOwnProperty.call(state.breeds, key)) {
          const breed = state.breeds[key];
          if (breed.length > 0) {
            breeds.push({
              name: key,
              hasChildren: true,
              children: breed,
            });
          } else {
            breeds.push({
              name: key,
              hasChildren: false,
              children: [],
            });
          }
        }
      }
    }
    return breeds;
  },
  getBreed: (state) => (breed) => state.selectedBreeds[breed],
  getGlobalLoading: state => state.globalLoading
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
