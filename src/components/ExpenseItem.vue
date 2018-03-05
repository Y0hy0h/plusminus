<template lang="pug">
    v-list-tile(@click="itemSelected")
        v-list-tile-content
            v-list-tile-title {{ expense.cents | currency }}
            v-list-tile-sub-title {{ expense.date | date }} | {{ expense.description }}
        v-list-tile-action
            v-btn(icon @click="deleteExpense")
                v-icon(color="grey lighten-1") clear
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