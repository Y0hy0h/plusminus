import Vue from 'vue'
import Vuex from 'vuex'
import { mount } from '@vue/test-utils'

import Overview from '@/components/Overview.vue'
import ExpenseCreation from '@/components/ExpenseInput/ExpenseCreation.vue'
import ExpenseUpdate from '@/components/ExpenseInput/ExpenseUpdate.vue'
import { Expense } from '@/model/expense'
import { mutations } from '@/store'

describe('Overview.vue', () => {
  it('initially has no active expense, then sets active expense when item was selected', () => {
    const expense = new Expense(10, new Date())
    const allExpenses: Expense[] = [expense]
    const wrapper = mount(Overview, {
      computed: {
        allExpenses: () => allExpenses,
      },
    })

    expect(wrapper.vm.activeExpense).toBeNull()

    // TODO: Find bug that prevents the callback from being executed when using events
    // wrapper.find(ExpenseList).trigger('item-selected', {expense})
    wrapper.vm.itemSelected(expense)

    expect(wrapper.vm.activeExpense).toBe(expense)
  })

  it('cancel sets active expense to null', () => {
    const expense = new Expense(10, new Date())
    const allExpenses: Expense[] = [expense]
    const wrapper = mount(Overview, {
      data: {
        activeExpense: expense,
      },
      computed: {
        allExpenses: () => allExpenses,
      },
    })

    expect(wrapper.vm.activeExpense).toBe(expense)

    // wrapper.find(ExpenseUpdate).trigger('cancel')
    wrapper.vm.cancel()

    expect(wrapper.vm.activeExpense).toBeNull()
  })

  describe('with mocked store', () => {
    const mockedMutations: { [key: string]: any } = {}
    Object.values(mutations).forEach((mutationName: string) => mockedMutations[mutationName] = jest.fn())
    const store = new Vuex.Store({
      mutations: mockedMutations,
    })

    it('renders ExpenseUpdate when it has active expense, else ExpenseCreation', async () => {
      const expense = new Expense(10, new Date())
      const allExpenses: Expense[] = [expense]
      const wrapper = mount(Overview, {
        computed: {
          allExpenses: () => allExpenses,
        },
        store,
      })

      wrapper.vm.activeExpense = null

      await Vue.nextTick()
      expect(wrapper.contains(ExpenseCreation)).toBe(true)

      wrapper.vm.activeExpense = expense

      await Vue.nextTick()
      expect(wrapper.contains(ExpenseUpdate)).toBe(true)
    })

    it('commiting an expense with no active expense creates new expense', () => {
      const allExpenses: Expense[] = []
      const wrapper = mount(Overview, {
        computed: {
          allExpenses: () => allExpenses,
        },
        store,
      })

      const newExpense = new Expense(15, new Date())
      wrapper.vm.commitExpense(newExpense)

      expect(mockedMutations['add-expense']).toHaveBeenCalledWith({}, {expense: newExpense})
    })

    it('commiting an expense with active expense updates it', () => {
      const oldExpense = new Expense(100, new Date())
      const allExpenses: Expense[] = [oldExpense]
      const wrapper = mount(Overview, {
        data: {
          activeExpense: oldExpense,
        },
        computed: {
          allExpenses: () => allExpenses,
        },
        store,
      })

      const newExpense = new Expense(15, new Date())
      wrapper.vm.commitExpense(newExpense)

      expect(mockedMutations['update-expense']).toHaveBeenCalledWith({}, {oldExpense, newExpense})
    })

    it('resets active expense if it was deleted', () => {
      const expense = new Expense(100, new Date())
      const allExpenses: Expense[] = [expense]
      const wrapper = mount(Overview, {
        data: {
          activeExpense: expense,
        },
        computed: {
          allExpenses: () => allExpenses,
        },
        store,
      })

      wrapper.vm.deleteExpense(expense)

      expect(wrapper.vm.activeExpense).toBeNull()
      expect(mockedMutations['delete-expense']).toHaveBeenCalledWith({}, {expense})
    })

    it('keeps active expense if other expense got deleted', () => {
      const expenseToDelete = new Expense(100, new Date())
      const expenseToKeep = new Expense(20, new Date())
      const allExpenses: Expense[] = [expenseToDelete, expenseToKeep]
      const wrapper = mount(Overview, {
        data: {
          activeExpense: expenseToKeep,
        },
        computed: {
          allExpenses: () => allExpenses,
        },
        store,
      })

      wrapper.vm.deleteExpense(expenseToDelete)

      expect(wrapper.vm.activeExpense).toBe(expenseToKeep)
      expect(mockedMutations['delete-expense']).toHaveBeenCalledWith({}, {expense: expenseToDelete})
    })
  })
})
