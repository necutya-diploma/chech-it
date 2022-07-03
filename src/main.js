// імпорт залежностей
import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import VeeValidate from 'vee-validate';
import Argon from "./plugins/argon-kit";
import './registerServiceWorker'
import store from "./store";
import setupInterceptors from './services/setupInterceptors';
import Donut from 'vue-css-donut-chart';
import 'vue-css-donut-chart/dist/vcdonut.css';

// виставлення налаштувань
Vue.config.productionTip = false;
Vue.config.devtools = true;

// DIP
Vue.use(Argon);
Vue.use(VeeValidate);
Vue.use(Donut);

// налаштування інтерцепторів
setupInterceptors(store);

// створення Vue екземпляру
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
