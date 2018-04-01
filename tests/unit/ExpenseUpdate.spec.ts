import Vue from 'vue'
import { createLocalVue, mount } from '@vue/test-utils'
import installFilters from '@/filters'
import installMaterial from '@/materialDesign'

import ExpenseUpdate from '@/components/ExpenseInput/ExpenseUpdate.vue'
import { Expense } from '@/model/expense'

const localVue = createLocalVue()
installFilters(localVue)
installMaterial(localVue)

describe('ExpenseUpdate.vue', () => {
  it('copies the prop expense', () => {
    const propExpense = new Expense(10, new Date('2018-03-09'))
    const wrapper = mount(ExpenseUpdate, {
      propsData: {
        expenseToUpdate: propExpense,
      },
      localVue,
    })

    expect(wrapper.vm.expense).toEqual(propExpense)
    expect(wrapper.vm.expense).not.toBe(propExpense)
  })

  it('copies prop expense when that is updated', async () => {
    const propExpense = new Expense(10, new Date('2018-03-09'))
    const wrapper = mount(ExpenseUpdate, {
      propsData: {
        expenseToUpdate: propExpense,
      },
      localVue,
    })

    const newPropExpense = new Expense(20, new Date('2018-04-09'))
    wrapper.vm.expenseToUpdate = newPropExpense

    await Vue.nextTick()
    expect(wrapper.vm.expense).toEqual(newPropExpense)
    expect(wrapper.vm.expense).not.toBe(newPropExpense)
  })

  it('detects when expense has been changed', () => {
    const propExpense = new Expense(10, new Date('2018-03-09'))
    const wrapper = mount(ExpenseUpdate, {
      propsData: {
        expenseToUpdate: propExpense,
      },
      localVue,
    })

    expect(wrapper.vm.expenseChanged).toEqual(false)

    wrapper.vm.expense.cents += 10

    expect(wrapper.vm.expenseChanged).toEqual(true)

    wrapper.vm.expense.cents -= 10

    expect(wrapper.vm.expenseChanged).toEqual(false)
  })
})
