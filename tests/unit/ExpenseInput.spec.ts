import Vue from 'vue'
import { mount, Wrapper } from '@vue/test-utils'

import ExpenseInput from '@/components/ExpenseInput/ExpenseInput.vue'
import { Expense } from '@/model/expense'

describe('ExpenseInput.vue', () => {
  it('sets input number as expense\'s cents', () => {
    const wrapper = mount(ExpenseInput, {
      propsData: {
        expense: new Expense(0, new Date('2018-03-09')),
      },
    })

    const amountInput = wrapper.find('.amount')
    amountInput.trigger('keypress', {key: '8'})
    amountInput.trigger('keypress', {key: '7'})

    expect(lastEmittedExpenseOf(2, wrapper).cents).toEqual(87)
  })

  it('deletes last digit on backspace or delete', () => {
    const wrapper = mount(ExpenseInput, {
      propsData: {
        expense: new Expense(123, new Date('2018-03-09')),
      },
    })

    const amountInput = wrapper.find('.amount')
    amountInput.trigger('keypress', {key: 'Backspace'})

    return Vue.nextTick().then(() => {
      expect(emittedExpense(wrapper).cents).toEqual(12)

      amountInput.trigger('keypress', {key: 'Delete'})

      return Vue.nextTick()
    }).then(() => {
      expect(emittedExpense(wrapper).cents).toEqual(1)
    })

  })

  it('ignores letters and special characters', () => {
    const wrapper = mount(ExpenseInput, {
      propsData: {
        expense: new Expense(0, new Date('2018-03-09')),
      },
    })

    const amountInput = wrapper.find('.amount')
    amountInput.trigger('keypress', {key: 'i'})
    amountInput.trigger('keypress', {key: ','})
    amountInput.trigger('keypress', {key: '€'})

    return Vue.nextTick().then(() => {
      expect(wrapper.emitted().change).toBeUndefined()
    })
  })
})

function lastEmittedExpenseOf(expectedChanges: number, wrapper: Wrapper<Vue>): Expense {
  const emittedChanges = wrapper.emitted().change
  expect(emittedChanges.length).toEqual(expectedChanges)
  return emittedChanges[expectedChanges - 1][0]
}

function emittedExpense(wrapper: Wrapper<Vue>): Expense {
  const totalEmitted = wrapper.emitted().change.length
  return lastEmittedExpenseOf(totalEmitted, wrapper)
}
