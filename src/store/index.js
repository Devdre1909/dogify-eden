import Vue from "vue";
import Vuex from "vuex";

import dogModule from "./modules/dog";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    dog: dogModule,
  },
});
