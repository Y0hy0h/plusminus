<template>
    <v-form class="new-expense">
        <v-card>
            <v-card-text>
                <v-text-field
                        label="Amount"
                        @keypress="updateAmount"
                        :value="expense.cents | currency"
                        type="text"
                        class="amount"
                        readonly
                />
                <v-text-field
                        label="Description"
                        v-model="expense.description"
                        type="text"
                        class="description"
                />
                <v-menu
                        ref="menu"
                        v-model="dateMenu"
                        lazy
                        min-width="290px"
                        full-width
                        offset-y
                        :nudge-right="40"
                        :close-on-content-click="false"
                        :return-value.sync="dateString"
                >
                    <v-text-field
                            slot="activator"
                            label="Date"
                            :value="this.expense.date.toLocaleDateString()"
                            prepend-icon="event"
                            readonly
                    />
                    <v-date-picker v-model="dateString" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="dateMenu = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.menu.save(dateString)">OK</v-btn>
                    </v-date-picker>
                </v-menu>
            </v-card-text>
            <v-card-actions>
                <v-btn @click="commitExpense" class="save">{{ expenseToUpdate === null ? 'Save' : 'Update' }}</v-btn>
            </v-card-actions>
        </v-card>
    </v-form>
</template>

<script lang="ts">
  import { Expense } from '@/model/expense'
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
  import { cloneDeep } from 'lodash'

  @Component
  export default class ExpenseInput extends Vue {
    @Prop() private expenseToUpdate!: Expense | null

    private expense: Expense
    private dateMenu: boolean = false

    constructor() {
      super()
      this.expense = cloneDeep(this.expenseToUpdate) || this.getDefaultExpense()
    }

    @Watch('expenseToUpdate')
    public onExpenseChange(val: Expense | null, oldVal: Expense | null) {
      if (val === null) {
        this.expense = this.getDefaultExpense()
      } else {
        this.expense = cloneDeep(val)
      }
    }

    get dateString(): string {
      return this.expense.date.toISOString().slice(0, 10)
    }

    set dateString(dateString: string) {
      this.expense.date = new Date(dateString)
    }

    public commitExpense() {
      this.$emit('commit-expense', this.expense)
      this.expense = this.getDefaultExpense()
    }

    public updateAmount(event: KeyboardEvent) {
      const parsedNumber = parseInt(event.key, 10)
      if (!isNaN(parsedNumber)) {
        this.expense.cents = this.expense.cents * 10 + parsedNumber
      } else if (['Backspace', 'Delete'].includes(event.key)) {
        this.expense.cents = Math.floor(this.expense.cents / 10)
      }
    }

    private getDefaultExpense() {
      return new Expense(0, new Date())
    }
  }
</script>

<style scoped lang="stylus">
    .amount /deep/ input
        text-align: right
</style>