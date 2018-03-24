module.exports = {
  url () { return process.env.VUE_DEV_SERVER_URL },
  elements: {
    newExpenseAmount: '.amount input',
    newExpenseDescription: '.description input',
    saveButton: 'button.save',
    expenseList: '.expense-list',
  }
}