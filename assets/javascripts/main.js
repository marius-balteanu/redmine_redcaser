var Redcaser = Redcaser || {};

$(function () {
  var element;

  element = document.getElementsByClassName('tree-root')[0];
  if (element) {
    Redcaser.testSuiteTree = new TestSuiteTreeWidget(element);
  }

  element = document.getElementsByClassName('execution-suites-root')[0];
  if (element) {
    Redcaser.executionSuiteWidget = new Redcaser.ExecutionWidget(element);
    Redcaser.environmentDialog    = new Redcaser.EnvironmentDialog();
  }
});
