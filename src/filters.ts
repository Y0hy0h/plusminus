import Vue from 'vue'

Vue.filter('currency', (value: string) => {
  const cents: number = parseInt(value, 10)
  const currencyFormatter = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  })
  return currencyFormatter.format(cents / 100)
})
