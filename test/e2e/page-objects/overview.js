module.exports = {
  url () { return process.env.VUE_DEV_SERVER_URL },
  elements: {
    newExpenseAmount: '.new-expense input.amount',
    newExpenseDescription: '.new-expense input.description',
    saveButton: '.new-expense button.save',
    expenseList: '.expense-list',
  }
}