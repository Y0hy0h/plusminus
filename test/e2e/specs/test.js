// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'Smoke test': browser => {
    const page = browser.page.overview()

    page.navigate()
      .assert.title('PlusMinus')
  },

  'Expense addition': browser => {
    const page = browser.page.overview()

    page.navigate()
      .setValue('@newExpenseAmount', '81502')
      .setValue('@newExpenseDescription', 'Dummy Expense')
      .click('@saveButton')
      .assert.containsText('@expenseList', '81502')
      .assert.containsText('@expenseList', 'Dummy Expense')
  },

  after: browser => {
    browser.end()
  }
}
