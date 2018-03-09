import { mount } from '@vue/test-utils'

import DatePickerField from '@/components/ExpenseInput/DatePickerField.vue'

describe('DatePickerField.vue', () => {
  it('converts date to correct string', () => {
    const expectedDateString = '2018-03-09'
    const wrapper = mount(DatePickerField, {
      propsData: {
        date: new Date(expectedDateString),
      },
    })

    expect(wrapper.vm.dateString).toEqual(expectedDateString)
  })

  it('sets date correctly on dateString change', () => {
    const wrapper = mount(DatePickerField, {
      propsData: {
        date: new Date('2019-03-08'),
      },
    })

    const newDateString = '2017-02-07'
    wrapper.vm.dateString = newDateString

    const emittedChanges = wrapper.emitted().change
    expect(emittedChanges.length).toEqual(1)
    expect(emittedChanges[0][0]).toEqual(new Date(newDateString))
  })
})
