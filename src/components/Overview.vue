<template>
    <ul>
        <li v-for="expense in allExpenses">{{ expense.cents }}</li>
    </ul>
</template>

<script lang="ts">
  import {Expense} from '@/model/expense'
  import {Component, Prop, Vue} from 'vue-property-decorator'

  @Component
  export default class Overview extends Vue {
    @Prop() private allExpenses!: Expense[]
  }
</script>

<style scoped>

</style>