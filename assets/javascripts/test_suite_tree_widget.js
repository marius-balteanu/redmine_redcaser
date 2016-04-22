var TestSuiteTreeWidget = (function () {
  'use strict';

  // self :: DOM
  var self = function (root) {
    this.root   = root;
    this.header = null;
    this.body   = null;

    this.caseEditDialog   = null;
    this.suiteEditDialog  = null;

    this.initialize();
  };

  var def = self.prototype;

  def.initialize = function () {
    this.createTestSuiteHeader();
    this.createDialogs();
    this.addEventHandlers();
    this.getTestSuiteData();
  };

  def.createTestSuiteHeader = function () {
    this.resetHeader();

    this.header = TestSuiteHeader.build();

    this.root.appendChild(this.header);
  };

  def.resetHeader = function () {
    if (this.header) {
      this.root.removeChild(this.header);
    }
  };

  def.createDialogs = function () {
    this.createCaseEditDialog();
    this.createSuiteEditDialog();
  };

  def.createCaseEditDialog = function () {
    this.caseEditDialog = CaseDialog.build();
    CaseDialog.initialize(this.caseEditDialog);
  };

  def.createSuiteEditDialog = function () {
    this.suiteEditDialog = SuiteDialog.build();
    SuiteDialog.initialize(this.suiteEditDialog);
  };

  def.getTestSuiteData = function () {
    var params = {
      done: this.createTestSuiteTree.bind(this),
      fail: this.handleTestSuiteError.bind(this)
    }

    Redcaser.api.testSuites.index(params);
  };

  // createTestSuiteTree :: Object
  def.createTestSuiteTree = function (response) {
    this.initializeBody();

    var tree = TestSuiteTree.build(response);

    this.body.appendChild(tree);
    this.root.appendChild(this.body);

    this.makeSuiteCasesSortable();
  };

  def.initializeBody = function () {
    if (this.body) {
      $('.suite-cases').sortable('destroy');
      this.root.removeChild(this.body);
    }

    this.body = document.createElement('div');
    this.body.classList.add('tree-body');
  };

  def.makeSuiteCasesSortable = function () {
    var cases = $('.suite-cases');

    cases.sortable({
      connectWith: '.suite-cases',
      handle:      '.case-drag',
      placeholder: 'suite-case-placeholder'
    });
  };

  // buildTestSuiteTree :: Object
  def.handleTestSuiteError = function (response) {
    console.log('Error!');
  };

  def.addEventHandlers = function () {
    TreeEvents.attach(this);
  };

  return self;
})();
