<template>
    <div class="overview">
        <ExpenseInput :expenseToUpdate="activeExpense" @commit-expense="commitExpense"/>
        <ExpenseList :all-expenses="allExpenses" @delete-expense="deleteExpense" @item-selected="itemSelected"/>
    </div>
</template>

<script lang="ts">
  import { Expense } from '@/model/expense'
  import ExpenseInput from '@/components/ExpenseInput.vue'
  import ExpenseList from '@/components/ExpenseList.vue'
  import { Component, Vue } from 'vue-property-decorator'
  import { mutations } from '@/store'

  @Component({
    components: {
      ExpenseInput,
      ExpenseList,
    },
  })
  export default class Overview extends Vue {
    private activeExpense: Expense | null = null

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

    public deleteExpense(expense: Expense): void {
      this.$store.commit(mutations.DELETE_EXPENSE, {expense})
    }
  }
</script>

<style scoped lang="stylus">
</style>