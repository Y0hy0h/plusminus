<template lang="pug">
    form
        md-field
            label Amount
            md-input.amount(
            @keypress="updateAmount"
            :value="expense.cents | currency"
            type="text"
            readonly
            )
        md-field
            label Description
            md-input.description(
            v-model="expense.description"
            type="text"
            )
        md-datepicker(v-model="expense.date")
</template>

<script lang="ts">
  import { Component, Model, Vue } from 'vue-property-decorator'

  import { Expense } from '@/model/expense'

  @Component
  export default class ExpenseInput extends Vue {
    @Model('change') private expense!: Expense

    public updateAmount(event: KeyboardEvent) {
      const parsedNumber = parseInt(event.key, 10)
      if (!isNaN(parsedNumber)) {
        this.expense.cents = this.expense.cents * 10 + parsedNumber
        this.$emit('change', this.expense)
      } else if (['Backspace', 'Delete'].includes(event.key)) {
        this.expense.cents = Math.floor(this.expense.cents / 10)
        this.$emit('change', this.expense)
      }
    }
  }
</script>

<style scoped lang="stylus">
    .amount /deep/ input
        text-align: right
</style>