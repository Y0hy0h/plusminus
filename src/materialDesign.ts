import 'babel-polyfill'
import { Vue } from 'vue/types/vue'
import { VueConstructor } from 'vue'

import {
  MdButton,
  MdCard,
  MdContent,
  MdDatepicker,
  MdDivider,
  MdField,
  MdIcon,
  MdList,
} from 'vue-material/dist/components'

export default (vueInstance: VueConstructor<Vue>) => {
  vueInstance.use(MdContent)
  vueInstance.use(MdDivider)
  vueInstance.use(MdList)
  vueInstance.use(MdButton)
  vueInstance.use(MdIcon)
  vueInstance.use(MdCard)
  vueInstance.use(MdField)
  vueInstance.use(MdDatepicker)
}
