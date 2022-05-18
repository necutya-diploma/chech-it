/*!

=========================================================
* Vue Argon Design System - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system/blob/master/LICENSE.md)

* Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
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

Vue.config.productionTip = false;
Vue.config.devtools = true;

Vue.use(Argon);
Vue.use(VeeValidate);
Vue.use(Donut);

setupInterceptors(store);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
