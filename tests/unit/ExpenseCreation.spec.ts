import { createLocalVue, mount } from '@vue/test-utils'
import installFilters from '@/filters'
import installMaterial from '@/materialDesign'

import lolex from 'lolex'

import ExpenseCreation from '@/components/ExpenseInput/ExpenseCreation.vue'

const localVue = createLocalVue()
installFilters(localVue)
installMaterial(localVue)


describe('ExpenseCreation.vue', () => {
  it('initializes the expense\'s date to current day', () => {
    const today = new Date('2018-02-14')
    const clock = lolex.install({
      now: today,
    })
    const wrapper = mount(ExpenseCreation, {
      localVue,
    })
    expect(wrapper.vm.expense.date).toEqual(today)
    clock.uninstall()
  })

  it('passes expense when save button is pressed', () => {
    const wrapper = mount(ExpenseCreation, {
      localVue,
    })
    const oldExpense = wrapper.vm.expense

    wrapper.find('md-button').trigger('click')

    expect(wrapper.emitted()['commit-expense']).toEqual([[oldExpense]])
  })

  it('creates new expense when save button is pressed', () => {
    const wrapper = mount(ExpenseCreation, {
      localVue,
    })
    wrapper.vm.expense.cents = 100
    const oldExpense = wrapper.vm.expense

    // TODO: Find out why trigger does not update wrapper.vm.expense, even though commitExpense() is executed
    // wrapper.find('v-btn').trigger('click')
    wrapper.vm.commitExpense()

    expect(wrapper.vm.expense).not.toBe(oldExpense)
  })
})

