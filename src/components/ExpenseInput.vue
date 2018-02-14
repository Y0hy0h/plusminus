<template>
    <v-form class="new-expense">
        <v-card>
            <v-card-text>
                <v-text-field label="Amount" suffix="€" v-model="amount" type="number" class="amount"/>
                <v-text-field label="Description" v-model="description" type="text" class="description"/>
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

    private saveExpense() {
      const newExpense = new Expense(this.amount, this.description)
      this.$emit('save-expense', newExpense)
    }
  }
</script>

<style scoped lang="stylus">
</style>