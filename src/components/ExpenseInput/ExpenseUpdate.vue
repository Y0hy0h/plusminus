<template lang="pug">
    v-card
        v-card-text
            ExpenseInput(v-model="expense")
        v-card-actions
            v-btn(:disabled="!expenseChanged" @click="commitExpense") Update
            v-btn(@click="cancel") Cancel
</template>

<script lang="ts">
  import { Expense } from '@/model/expense'
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
  import ExpenseInput from '@/components/ExpenseInput/ExpenseInput.vue'
  import { cloneDeep, isEqual } from 'lodash'

  @Component({
  components: {
    ExpenseInput,
  },
})
export default class ExpenseUpdate extends Vue {
  @Prop() private expenseToUpdate!: Expense
  private expense: Expense

  constructor() {
    super()
    this.expense = cloneDeep(this.expenseToUpdate)
  }

  @Watch('expenseToUpdate')
  public onExpenseChange(newExpense: Expense) {
    this.expense = cloneDeep(newExpense)
  }

  get expenseChanged(): boolean {
    return !isEqual(this.expense, this.expenseToUpdate)
  }

  public commitExpense() {
    this.$emit('commit-expense', this.expense)
  }

  public cancel() {
    this.$emit('cancel')
  }
}
</script>

<style scoped>

</style>