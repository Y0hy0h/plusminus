import {Expense} from '@/model/expense'
import {shallow} from '@vue/test-utils'
import Overview from '@/components/Overview.vue'

describe('Overview.vue', () => {
  it('list all expenses in prop', () => {
    const allExpenses = [
      new Expense(100),
      new Expense(200),
    ]
    const wrapper = shallow(Overview, {
      propsData: {allExpenses},
    })
    expect(wrapper.html()).toContain('<ul><li>100</li><li>200</li></ul>')
  })
})
