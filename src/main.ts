import Vue from "vue";
import App from "./App.vue";
import { CheckboxGroup, Checkbox } from "element-ui";
import "element-theme-chalk";

Vue.use(CheckboxGroup);
Vue.use(Checkbox);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
