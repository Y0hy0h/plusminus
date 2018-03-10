<template lang="pug">
    .overview
        ExpenseCreation(v-if="activeExpense === null" @commit-expense="commitExpense")
        ExpenseUpdate(v-else :expense-to-update="activeExpense" @commit-expense="commitExpense" @cancel="cancel")
        ExpenseList(:all-expenses="allExpenses" @delete-expense="deleteExpense" @item-selected="itemSelected")
</template>

<script lang="ts">
  import { Expense } from '@/model/expense'
  import ExpenseCreation from '@/components/ExpenseInput/ExpenseCreation.vue'
  import ExpenseUpdate from '@/components/ExpenseInput/ExpenseUpdate.vue'
  import ExpenseList from '@/components/ExpenseList.vue'
  import { Component, Vue } from 'vue-property-decorator'
  import { mutations } from '@/store'

  @Component({
    components: {
      ExpenseCreation,
      ExpenseUpdate,
      ExpenseList,
    },
  })
  export default class Overview extends Vue {
    private activeExpense: Expense | null = null  // null means event creation, active means update

    get allExpenses(): Expense[] {
      return this.$store.state.allExpenses
    }

    public itemSelected(expense: Expense): void {
      this.activeExpense = expense
    }

    public commitExpense(expense: Expense): void {
      if (this.activeExpense === null) {
        this.$store.commit(mutations.ADD_EXPENSE, {expense})
      } else {
        this.$store.commit(mutations.UPDATE_EXPENSE, {oldExpense: this.activeExpense, newExpense: expense})
      }
      this.activeExpense = null
    }

    public cancel(): void {
      this.activeExpense = null
    }

    public deleteExpense(expense: Expense): void {
      if (expense === this.activeExpense) {
        this.cancel()
      }
      this.$store.commit(mutations.DELETE_EXPENSE, {expense})
    }
  }
</script>

<style scoped lang="stylus">
</style>