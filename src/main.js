import Vue from 'vue'
import App from './App.vue'
import VueTailwind from 'vue-tailwind'
import './main.css'

const settings ={}

Vue.use(VueTailwind, settings)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
