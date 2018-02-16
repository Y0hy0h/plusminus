import {shallow} from '@vue/test-utils'
import ExpenseInput from '@/components/ExpenseInput.vue'

describe('ExpenseInput.vue', () => {
  it('should initialize the date to current day', () => {
    const today = new Date('2018-02-14')
    global.Date = jest.fn(() => today)
    const wrapper = shallow(ExpenseInput)
    expect(wrapper.vm.date).toEqual('2018-02-14')
  })
})
