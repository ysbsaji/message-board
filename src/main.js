import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axiosPlugin from './plugins/axios'
import vuetify from './plugins/vuetify'


Vue.config.productionTip = false
Vue.use(axiosPlugin)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
