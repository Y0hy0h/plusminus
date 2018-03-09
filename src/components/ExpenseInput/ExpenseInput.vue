<template lang="pug">
    v-form
        v-text-field(
        label="Amount"
        @keypress="updateAmount"
        :value="expense.cents | currency"
        type="text"
        class="amount"
        readonly
        )
        v-text-field(
        label="Description"
        v-model="expense.description"
        type="text"
        class="description"
        )
        DatePickerField(v-model="expense.date")
</template>

<script lang="ts">
  import { Component, Model, Vue } from 'vue-property-decorator'

  import DatePickerField from '@/components/ExpenseInput/DatePickerField.vue'
  import { Expense } from '@/model/expense'

  @Component({
    components: {
      DatePickerField,
    },
  })
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