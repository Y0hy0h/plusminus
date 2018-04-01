<template lang="pug">
    div
        md-card-content
            ExpenseInput(v-model="expense")
        md-card-actions(md-alignment="left")
            md-button.save(@click="commitExpense") Save
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