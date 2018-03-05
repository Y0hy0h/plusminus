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
        v-menu(
        ref="menu"
        v-model="dateMenu"
        lazy
        min-width="290px"
        full-width
        offset-y
        :nudge-right="40"
        :close-on-content-click="false"
        :return-value.sync="dateString"
        )
            v-text-field(
            slot="activator"
            label="Date"
            :value="this.expense.date | date"
            prepend-icon="event"
            readonly
            )
            v-date-picker(v-model="dateString" no-title scrollable)
                v-spacer
                v-btn(flat color="primary" @click="dateMenu = false") Cancel
                v-btn(flat color="primary" @click="$refs.menu.save(dateString)") OK
</template>

<script lang="ts">
  import { Expense } from '@/model/expense'
  import { Component, Model, Vue } from 'vue-property-decorator'

  @Component
  export default class ExpenseInput extends Vue {
    @Model('change') private expense!: Expense

    private dateMenu: boolean = false

    get dateString(): string {
      return this.expense.date.toISOString().slice(0, 10)
    }

    set dateString(dateString: string) {
      this.expense.date = new Date(dateString)
      this.$emit('change', this.expense)
    }

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