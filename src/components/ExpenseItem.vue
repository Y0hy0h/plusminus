<template>
    <v-list-tile>
        <v-list-tile-content>
            <v-list-tile-title>{{ expense.cents | currency }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ dateString(expense.date) }} | {{ expense.description }}
            </v-list-tile-sub-title>
        </v-list-tile-content>
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
  }
</script>

<style scoped>

</style>