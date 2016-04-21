var Redcaser = Redcaser || {};

Redcaser.api = RedcaserAPI;

$(function () {
  var element = document.getElementsByClassName('tree-root')[0];
  if (element) {
    Redcaser.testSuiteTree = new TestSuiteTreeWidget(element);
  }
});
