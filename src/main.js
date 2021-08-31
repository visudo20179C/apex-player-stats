import Vue from 'vue'
import App from './App.vue'
import VueTailwind from 'vue-tailwind'
import settings from "./plugins/vue-tailwind/settings";
import './main.css'

Vue.use(VueTailwind, settings)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
