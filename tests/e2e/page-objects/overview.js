module.exports = {
  url () { return process.env.VUE_DEV_SERVER_URL },
  elements: {
    newExpenseAmount: '.new-expense .amount input',
    newExpenseDescription: '.new-expense .description input',
    saveButton: '.new-expense button.save',
    expenseList: '.expense-list',
  }
}