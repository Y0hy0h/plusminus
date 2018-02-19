<template>
    <div class="overview">
        <ExpenseInput @save-expense="saveExpense"/>
        <ExpenseList :all-expenses="allExpenses" @delete-expense="deleteExpense"/>
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
    get allExpenses(): Expense[] {
      return this.$store.state.allExpenses
    }

    public saveExpense(expense: Expense): void {
      this.$store.commit(mutations.ADD_EXPENSE, {expense})
    }

    public deleteExpense(expense: Expense): void {
      this.$store.commit(mutations.DELETE_EXPENSE, {expense})
    }
  }
</script>

<style scoped lang="stylus">
</style>