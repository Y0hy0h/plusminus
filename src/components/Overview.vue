<template>
    <div>
        <div class="new-expense">
            <input v-model="amount" type="number" class="amount"/>
            <input v-model="description" type="text" class="description"/>
            <button @click="saveExpense()" class="save">Save</button>
        </div>
        <ul class="expense-list">
            <li v-for="expense in allExpenses">{{ expense.cents }} | {{ expense.description }}</li>
        </ul>
    </div>
</template>

<script lang="ts">
import {Expense} from '@/model/expense'
import {Component, Prop, Vue} from 'vue-property-decorator'

@Component
export default class Overview extends Vue {
  @Prop() private allExpenses!: Expense[]

  private amount: number = 0
  private description: string = ''

  public saveExpense(): void {
    this.allExpenses.push(new Expense(this.amount, this.description))
  }
}
</script>

<style scoped>

</style>