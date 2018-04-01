<template lang="pug">
    md-list-item(@click="itemSelected")
        .md-list-item-text
            span {{ expense.cents | currency }}
            span {{ expense.date | date }} | {{ expense.description }}
        .md-list-action
            md-button.md-icon-button(@click="deleteExpense")
                md-icon clear
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  import { Expense } from '../model/expense'

  @Component
  export default class ExpenseItem extends Vue {
    @Prop() private expense!: Expense

    public itemSelected() {
      this.$emit('selected', this.expense)
    }

    public deleteExpense(event: MouseEvent) {
      event.stopPropagation()
      this.$emit('delete-expense', this.expense)
    }
  }
</script>

<style scoped>

</style>