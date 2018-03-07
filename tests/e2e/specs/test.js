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

    const expectedFormattedAmount = /(\$ ?)?815[.,]?02( ?€)?/ // allow different formats for robustness

    page.navigate()
      .setValue('@newExpenseAmount', '81502')
    page.expect.element('@newExpenseAmount').value.to.match(expectedFormattedAmount)
    page.setValue('@newExpenseDescription', 'Dummy Expense')
      .click('@saveButton')
    page.expect.element('@expenseList').text.to.match(expectedFormattedAmount)
    page.assert.containsText('@expenseList', 'Dummy Expense')
  },

  after: browser => {
    browser.end()
  }
}
