import IntlPolyfill from 'intl'

import { currencyFilter, dateFilter } from '@/filters'

describe('intl filter', () => {
  const originalNumberFormat = Intl.NumberFormat
  const originalDateTimeFormat = Intl.DateTimeFormat
  beforeAll(() => {
    Intl.NumberFormat = IntlPolyfill.NumberFormat
    Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat
  })

  afterAll(() => {
    Intl.NumberFormat = originalNumberFormat
    Intl.DateTimeFormat = originalDateTimeFormat
  })

  describe('currency filter', () => {
    it('should format given integer correctly', () => {
      const cents = 3214
      expect(currencyFilter(cents)).toEqual('32,14 €')
    })
  })

  describe('date filter', () => {
    it('should format given date correctly', () => {
      const date = new Date('2018-02-14')
      expect(dateFilter(date)).toEqual('14.02.2018')
    })
  })
})
