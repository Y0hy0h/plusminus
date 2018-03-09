import Vue from 'vue'
import { mount } from '@vue/test-utils'

import ExpenseUpdate from '@/components/ExpenseInput/ExpenseUpdate.vue'
import { Expense } from '@/model/expense'

describe('ExpenseUpdate.vue', () => {
  it('copies the prop expense', () => {
    const propExpense = new Expense(10, new Date('2018-03-09'))
    const wrapper = mount(ExpenseUpdate, {
      propsData: {
        expenseToUpdate: propExpense,
      },
    })

    expect(wrapper.vm.expense).toEqual(propExpense)
    expect(wrapper.vm.expense).not.toBe(propExpense)
  })

  it('copies prop expense when that is updated', () => {
    const propExpense = new Expense(10, new Date('2018-03-09'))
    const wrapper = mount(ExpenseUpdate, {
      propsData: {
        expenseToUpdate: propExpense,
      },
    })

    const newPropExpense = new Expense(20, new Date('2018-04-09'))
    wrapper.vm.expenseToUpdate = newPropExpense

    // TODO: .nextTick() feels unnecessary, bug in vue-test-utils or unit-jest?
    Vue.nextTick().then(() => {
      expect(wrapper.vm.expense).toEqual(newPropExpense)
      expect(wrapper.vm.expense).not.toBe(newPropExpense)
    })
  })

  it('detects when expense has been changed', () => {
    const propExpense = new Expense(10, new Date('2018-03-09'))
    const wrapper = mount(ExpenseUpdate, {
      propsData: {
        expenseToUpdate: propExpense,
      },
    })

    expect(wrapper.vm.expenseChanged).toEqual(false)

    wrapper.vm.expense.cents += 10

    expect(wrapper.vm.expenseChanged).toEqual(true)

    wrapper.vm.expense.cents -= 10

    expect(wrapper.vm.expenseChanged).toEqual(false)
  })
})
