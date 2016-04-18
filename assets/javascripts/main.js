var Redcaser = {};

$(function () {
  var element = document.getElementsByClassName('tree-root')[0];
  if (element) {
    Redcaser.testSuiteTree = new TestSuiteTree(element);
  }
});
