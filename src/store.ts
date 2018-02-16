import Vue from 'vue'
import Vuex, {MutationTree} from 'vuex'
import {Expense} from '@/model/expense'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

class State {
  public allExpenses: Expense[] = []
}

export enum mutations {
  ADD_EXPENSE = 'add-expense',
}

const mutationTree: MutationTree<State> = {
  [mutations.ADD_EXPENSE](state: State, payload: { expense: Expense }): void {
    state.allExpenses.push(payload.expense)
  },
}

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
})

export default new Vuex.Store<State>({
  state: new State(),
  mutations: mutationTree,
  actions: {},
  plugins: [
    // vuexLocal.plugin,
  ],
})
