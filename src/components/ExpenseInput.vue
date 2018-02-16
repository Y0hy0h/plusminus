<template>
    <v-form class="new-expense">
        <v-card>
            <v-card-text>
                <v-text-field
                        label="Amount"
                        @keypress="updateAmount"
                        :value="amount | currency"
                        type="text"
                        class="amount"
                        readonly
                />
                <v-text-field
                        label="Description"
                        v-model="description"
                        type="text"
                        class="description"
                />
                <v-menu min-width="290px" full-width offset-y :nudge-right="40">
                    <v-text-field
                            slot="activator"
                            label="Date"
                            v-model="dateString"
                            prepend-icon="event"
                            readonly
                    />
                    <v-date-picker v-model="dateString" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
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
  import {Expense} from '@/model/expense'
  import {Component, Vue} from 'vue-property-decorator'

  @Component
  export default class ExpenseInput extends Vue {
    private amount: number = 0
    private description: string = ''
    private dateString: string = new Date().toISOString().slice(0, 10)

    public saveExpense() {
      const date = new Date(this.dateString)
      const newExpense = new Expense(this.amount, date, this.description)
      this.$emit('save-expense', newExpense)
    }

    public updateAmount(event: KeyboardEvent): void {
      const parsedNumber = parseInt(event.key, 10)
      if (!isNaN(parsedNumber)) {
        this.amount = this.amount * 10 + parsedNumber
      } else if (['Backspace', 'Delete'].includes(event.key)) {
        this.amount = Math.floor(this.amount / 10)
      }
    }

  }
</script>

<style scoped lang="stylus">
</style>