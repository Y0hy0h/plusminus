import Vue from 'vue'

import App from '@/App.vue'
import installRouter, { router } from '@/router'
import store from '@/store'
import installMaterial from '@/materialDesign'
import installFilters from '@/filters'

import '@/registerServiceWorker'

Vue.config.productionTip = false

installRouter(Vue)
installMaterial(Vue)
installFilters(Vue)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
