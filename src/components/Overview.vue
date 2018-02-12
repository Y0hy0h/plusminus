<template>
    <ul>
        <li v-for="expense in allExpenses">{{ expense.cents }}</li>
    </ul>
</template>

<script lang="ts">
  import { Expense } from '@/model/expense'
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class Overview extends Vue {
    public allExpenses: Expense[] = [
      new Expense(100),
      new Expense(200),
      new Expense(300),
    ]
  }
</script>

<style scoped>

</style>