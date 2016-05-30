var Redcaser = Redcaser || {}

$(function () {
  var element

  element = document.getElementsByClassName('tree-root')[0]
  if (element) {
    Redcaser.testSuiteTree = new Redcaser.TestSuiteTreeWidget(element)
    Redcaser.suiteDialog   = new Redcaser.SuiteDialog()
  }

  element = document.getElementsByClassName('execution-suites-root')[0]
  if (element) {
    Redcaser.executionSuiteWidget = new Redcaser.ExecutionWidget(element)
    Redcaser.executionDialog      = new Redcaser.ExecutionDialog()
    Redcaser.environmentDialog    = new Redcaser.EnvironmentDialog()
  }
})
