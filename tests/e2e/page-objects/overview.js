module.exports = {
  url () { return process.env.VUE_DEV_SERVER_URL },
  elements: {
    newExpenseAmount: '.amount',
    newExpenseDescription: '.description',
    saveButton: 'button.save',
    expenseList: '.expense-list',
  }
}