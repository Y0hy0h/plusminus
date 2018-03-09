import Vue from 'vue'
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

  it('passes expense when save button is pressed', () => {
    const wrapper = shallow(ExpenseCreation)
    const oldExpense = wrapper.vm.expense

    wrapper.find('v-btn').trigger('click')

    expect(wrapper.emitted()['commit-expense']).toEqual([[oldExpense]])
  })

  it('creates new expense when save button is pressed', () => {
    const wrapper = mount(ExpenseCreation)
    const oldExpense = wrapper.vm.expense

    wrapper.find('v-btn').trigger('click')

    Vue.nextTick().then(() => {
      expect(wrapper.vm.expense).not.toBe(oldExpense)
    })
  })
})

