<template>
    <ul class="expense-list">
        <li v-for="expense in allExpenses">{{ expense.cents }} | {{ expense.description }}</li>
    </ul>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator'
  import {Expense} from '@/model/expense'

  @Component
  export default class ExpenseList extends Vue {
    @Prop() private allExpenses!: Expense[]
  }
</script>

<style scoped>

</style>