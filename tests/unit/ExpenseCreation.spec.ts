import { mount, shallow } from '@vue/test-utils'

import lolex from 'lolex'

import ExpenseCreation from '@/components/ExpenseInput/ExpenseCreation.vue'


describe('ExpenseCreation.vue', () => {
  it('initializes the expense\'s date to current day', () => {
    const today = new Date('2018-02-14')
    const clock = lolex.install({
      now: today,
    })
    const wrapper = shallow(ExpenseCreation)
    expect(wrapper.vm.expense.date).toEqual(today)
    clock.uninstall()
  })

  it('passes expense when committing', () => {
    const wrapper = shallow(ExpenseCreation)
    const oldExpense = wrapper.vm.expense

    wrapper.vm.commitExpense()

    expect(wrapper.emitted()['commit-expense']).toEqual([[oldExpense]])
  })

  it('creates new expense when committing', () => {
    const wrapper = mount(ExpenseCreation)
    const oldExpense = wrapper.vm.expense

    wrapper.vm.commitExpense()

    expect(wrapper.vm.expense).not.toBe(oldExpense)
  })
})

