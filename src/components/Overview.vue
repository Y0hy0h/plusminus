<template>
    <div class="overview">
        <ExpenseInput @save-expense="saveExpense"/>
        <ExpenseList :all-expenses="allExpenses"/>
    </div>
</template>

<script lang="ts">
  import {Expense} from '@/model/expense'
  import ExpenseInput from '@/components/ExpenseInput.vue'
  import ExpenseList from '@/components/ExpenseList.vue'
  import {Component, Prop, Vue} from 'vue-property-decorator'

  @Component({
    components: {
      ExpenseInput,
      ExpenseList,
    },
  })
  export default class Overview extends Vue {
    @Prop() private allExpenses!: Expense[]

    public saveExpense(expense: Expense): void {
      this.allExpenses.push(expense)
    }
  }
</script>

<style scoped lang="sass">
    .overview
        margin: auto
        width: 800px
</style>