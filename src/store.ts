import Vue from 'vue'
import Vuex, { MutationTree } from 'vuex'
import VuexPersistence from 'vuex-persist'

import localForage from 'localforage'
import { autoserializeAs, Deserialize } from 'cerialize'

import { Expense } from '@/model/expense'

Vue.use(Vuex)

class State {
  @autoserializeAs(Expense) public allExpenses: Expense[] = []
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
  strictMode: process.env.NODE_ENV !== 'production',
  storage: localForage,
  async restoreState(key: string): Promise<State> {
    const state = await localForage.getItem(key)
    const deserialized = Deserialize(state, State)
    return deserialized
  },
  asyncStorage: true,
})
mutationTree.RESTORE_MUTATION = vuexLocal.RESTORE_MUTATION

export default new Vuex.Store<State>({
  strict: process.env.NODE_ENV !== 'production',
  state: new State(),
  mutations: mutationTree,
  actions: {},
  plugins: [
    vuexLocal.plugin,
  ],
})
