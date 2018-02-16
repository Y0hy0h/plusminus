import {shallow} from '@vue/test-utils'
import ExpenseList from '@/components/ExpenseList.vue'
import {Expense} from '@/model/expense'

describe('ExpenseList.vue', () => {
  it('it should display all expenses in props', () => {
    const allExpenses = [
      new Expense(123, new Date('2018-02-13')),
      new Expense(456, new Date('2018-02-14')),
    ]
    const wrapper = shallow(ExpenseList, {
      propsData: {
        allExpenses,
      },
    })
    expect(wrapper.html()).toContain('123')
    expect(wrapper.html()).toContain('2018-02-12')
    expect(wrapper.html()).toContain('456')
    expect(wrapper.html()).toContain('2018-02-14')
  })
})
