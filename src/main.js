import Vue from 'vue'
import App from './App.vue'
import VueTailwind from 'vue-tailwind'
import VTooltip from 'v-tooltip'
import { HalfCircleSpinner } from 'epic-spinners'
import settings from "./plugins/vue-tailwind/settings";
import './main.css'
import './tooltips.css'

Vue.use(VueTailwind, settings)
Vue.use(HalfCircleSpinner)
Vue.use(VTooltip)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
