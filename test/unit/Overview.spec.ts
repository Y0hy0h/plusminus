import {Expense} from '@/model/expense'
import {mount} from '@vue/test-utils'
import Overview from '@/components/Overview.vue'

describe('Overview.vue', () => {
  it('list all expenses in prop', () => {
    const allExpenses = [
      new Expense(100),
      new Expense(200),
    ]
    const wrapper = mount(Overview, {
      propsData: {allExpenses},
    })
    expect(wrapper.html()).toContain('100')
    expect(wrapper.html()).toContain('200')
  })
})
