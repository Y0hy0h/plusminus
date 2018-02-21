import Vue from 'vue'
import Vuex, { MutationTree } from 'vuex'
import { Expense } from '@/model/expense'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

class State {
  public allExpenses: Expense[] = []
}

export enum mutations {
  ADD_EXPENSE = 'add-expense',
  DELETE_EXPENSE = 'delete-expense',
  UPDATE_EXPENSE = 'update-expense',
}

const mutationTree: MutationTree<State> = {
  [mutations.ADD_EXPENSE](state: State, payload: { expense: Expense }): void {
    state.allExpenses.push(payload.expense)
  },
  [mutations.DELETE_EXPENSE](state: State, payload: { expense: Expense }): void {
    const index = state.allExpenses.indexOf(payload.expense)
    if (index > -1) {
      state.allExpenses.splice(index, 1)
    }
  },
  [mutations.UPDATE_EXPENSE](state: State, payload: { oldExpense: Expense, newExpense: Expense }): void {
    const index = state.allExpenses.indexOf(payload.oldExpense)
    Vue.set(state.allExpenses, index, payload.newExpense)
  },
}

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
})

export default new Vuex.Store<State>({
  strict: process.env.NODE_ENV !== 'production',
  state: new State(),
  mutations: mutationTree,
  actions: {},
  plugins: [
    // vuexLocal.plugin,
  ],
})
