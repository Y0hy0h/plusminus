<template lang="pug">
    v-card
        v-card-text
            ExpenseInput(v-model="expense")
        v-card-actions
            v-btn(@click="commitExpense") Save
</template>

<script lang="ts">
  import { Expense } from '@/model/expense'
  import { Component, Vue } from 'vue-property-decorator'
  import ExpenseInput from '@/components/ExpenseInput/ExpenseInput.vue'

  @Component({
    components: {
      ExpenseInput,
    },
  })
  export default class ExpenseCreation extends Vue {
    private expense: Expense = new Expense(0, new Date())

    public commitExpense() {
      this.$emit('commit-expense', this.expense)
      this.expense = new Expense(0, new Date())
    }
  }
</script>

<style scoped>
</style>