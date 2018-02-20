<template>
    <v-list two-line class="expense-list">
        <ExpenseItem
                :expense="expense"
                v-for="expense in allExpenses"
                :key="expense.cents"
                @delete-expense="deleteExpense"
                @selected="itemSelected"
        />
    </v-list>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import ExpenseItem from '@/components/ExpenseItem.vue'
  import { Expense } from '@/model/expense'

  @Component({
    components: {
      ExpenseItem,
    },
  })
  export default class ExpenseList extends Vue {
    @Prop() private allExpenses!: Expense[]

    public deleteExpense(expense: Expense) {
      this.$emit('delete-expense', expense)
    }

    public itemSelected(expense: Expense) {
      this.$emit('item-selected', expense)
    }
  }
</script>

<style scoped lang="stylus">
    .expense-list
        text-align: left
</style>