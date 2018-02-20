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
                        min-width="290px"
                        full-width
                        offset-y
                        :nudge-right="40"
                        :close-on-content-click="false"
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
                        <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.menu.save(dateString)">OK</v-btn>
                    </v-date-picker>
                </v-menu>
            </v-card-text>
            <v-card-actions>
                <v-btn @click="saveExpense" class="save">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-form>
</template>

<script lang="ts">
  import { Expense } from '@/model/expense'
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class ExpenseInput extends Vue {
    @Prop() private expenseToUpdate!: Expense | null

    get expense(): Expense {
      if (this.expenseToUpdate === null) {
        this.expenseToUpdate = new Expense(0, new Date())
      }
      return this.expenseToUpdate
    }

    get dateString(): string {
      return this.expense.date.toISOString().slice(0, 10)
    }

    set dateString(dateString: string) {
      this.expense.date = new Date(dateString)
    }

    public saveExpense() {
      this.$emit('save-expense', this.expense)
    }

    public updateAmount(event: KeyboardEvent) {
      const parsedNumber = parseInt(event.key, 10)
      if (!isNaN(parsedNumber)) {
        this.expense.cents = this.expense.cents * 10 + parsedNumber
      } else if (['Backspace', 'Delete'].includes(event.key)) {
        this.expense.cents = Math.floor(this.expense.cents / 10)
      }
    }

  }
</script>

<style scoped lang="stylus">
    .amount /deep/ input
        text-align: right
</style>