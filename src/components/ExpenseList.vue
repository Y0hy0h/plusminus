<template>
    <v-list two-line class="expense-list">
        <v-list-tile v-for="expense in allExpenses" :key="expense.cents">
            <v-list-tile-content>
                <v-list-tile-title>{{ expense.cents }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ expense.date.toLocaleDateString() }} | {{ expense.description }}
                </v-list-tile-sub-title>
            </v-list-tile-content>
        </v-list-tile>
    </v-list>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator'
  import {Expense} from '@/model/expense'

  @Component
  export default class ExpenseList extends Vue {
    @Prop() private allExpenses!: Expense[]
  }
</script>

<style scoped lang="stylus">
    .expense-list
        text-align: left
</style>