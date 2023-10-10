import Vue from "vue";
import VueRx from 'vue-rx'; // 封装好差的库。
import App from "./App.vue";
import router from "./router";
import { Observable } from 'rxjs'

Vue.config.productionTip = false;
Vue.use(VueRx); // 封装好差的库。

new Vue({
  //@ts-ignore
  router: router,
  render: h => h(App),
}).$mount("#app");
