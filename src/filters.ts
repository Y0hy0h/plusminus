import { Vue } from 'vue/types/vue'
import { VueConstructor } from 'vue'

import { DateTime } from 'luxon'

export function currencyFilter(value: number): string {
  const currencyFormatter = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  })
  return currencyFormatter.format(value / 100)
}

export function dateFilter(value: Date): string {
  const date = DateTime.fromJSDate(value)
  return date.setLocale('de-DE').toLocaleString({
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',

  })
}

export default (vueInstance: VueConstructor<Vue>) => {
  vueInstance.filter('currency', currencyFilter)
  vueInstance.filter('date', dateFilter)
}
