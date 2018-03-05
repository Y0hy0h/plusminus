import { shallow } from '@vue/test-utils'

import lolex from 'lolex'

import ExpenseCreation from '@/components/ExpenseInput/ExpenseCreation.vue'
import { Expense } from '@/model/expense.ts'


describe('ExpenseCreation.vue', () => {
  it('should initialize the expense\'s date to current day', () => {
    const today = new Date('2018-02-14')
    const clock = lolex.install({
      now: today,
    })
    const wrapper = shallow(ExpenseCreation, {
      propsData: {
        expense: new Expense(0, today),
      },
    })
    expect(wrapper.props().expense.date).toEqual(today)
    clock.uninstall()
  })
})
