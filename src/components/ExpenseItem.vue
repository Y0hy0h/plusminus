<template>
    <v-list-tile @click="itemSelected">
        <v-list-tile-content>
            <v-list-tile-title>{{ expense.cents | currency }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ dateString(expense.date) }} | {{ expense.description }}
            </v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
            <v-btn icon @click="deleteExpense">
                <v-icon color="grey lighten-1">clear</v-icon>
            </v-btn>
        </v-list-tile-action>
    </v-list-tile>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { Expense } from '../model/expense'

  @Component
  export default class ExpenseItem extends Vue {
    @Prop() private expense!: Expense

    public dateString(date: Date) {
      const formatOptions = {day: '2-digit', month: '2-digit', year: 'numeric'}
      return date.toLocaleDateString('de-DE', formatOptions)
    }

    public itemSelected() {
      this.$emit('selected', this.expense)
    }

    public deleteExpense() {
      this.$emit('delete-expense', this.expense)
    }
  }
</script>

<style scoped>

</style>