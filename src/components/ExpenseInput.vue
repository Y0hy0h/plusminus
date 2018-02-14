<template>
    <div class="new-expense">
        <input v-model="amount" type="number" class="amount"/>
        <input v-model="description" type="text" class="description"/>
        <button @click="saveExpense" class="save">Save</button>
    </div>
</template>

<script lang="ts">
  import {Expense} from '@/model/expense'
  import {Component, Vue} from 'vue-property-decorator'

  @Component
  export default class ExpenseInput extends Vue {
    private amount: number = 0
    private description: string = ''

    private saveExpense() {
      const newExpense = new Expense(this.amount, this.description)
      this.$emit('save-expense', newExpense)
    }
  }
</script>

<style scoped lang="sass">
    .new-expense
        display: flex
        flex-direction: column
</style>