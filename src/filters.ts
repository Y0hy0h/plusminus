import Vue from 'vue'

import { DateTime } from 'luxon'

export function currencyFilter(value: number): string {
  const currencyFormatter = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  })
  return currencyFormatter.format(value / 100)
}

Vue.filter('currency', currencyFilter)

export function dateFilter(value: Date): string {
  const date = DateTime.fromJSDate(value)
  return date.setLocale('de-DE').toLocaleString({
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',

  })
}

Vue.filter('date', dateFilter)
