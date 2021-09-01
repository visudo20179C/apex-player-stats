import Vue from 'vue'
import App from './App.vue'
import VueTailwind from 'vue-tailwind'
import { HalfCircleSpinner } from 'epic-spinners'
import settings from "./plugins/vue-tailwind/settings";
import './main.css'

Vue.use(VueTailwind, settings)
Vue.use(HalfCircleSpinner)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
