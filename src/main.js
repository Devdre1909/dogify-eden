import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";

import "./assets/css/global.scss";

import LazyLoadDirective from "./directives/LazyLoadDirective";

Vue.config.productionTip = false;

Vue.directive("lazyload", LazyLoadDirective);

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
