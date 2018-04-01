import { Vue } from 'vue/types/vue'
import { VueConstructor } from 'vue'
import Router from 'vue-router'

export const router = new Router({
  routes: [],
})

export default (vueInstance: VueConstructor<Vue>) => {
  vueInstance.use(Router)
}
