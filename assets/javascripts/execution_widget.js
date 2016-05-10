var Redcaser = Redcaser || {};

Redcaser.ExecutionWidget = (function () {
  'use strict';

  var ExecutionWidgetHeader  = Redcaser.ExecutionWidgetHeader;
  var ExecutionSuiteBuilder  = Redcaser.ExecutionSuiteBuilder;
  var ExecutionEvents        = Redcaser.ExecutionEvents;
  var ExecutionDialog        = Redcaser.ExecutionDialog;
  var EnvironmentDialog      = Redcaser.EnvironmentDialog;
  var TestCasePreviewBuilder = Redcaser.TestCasePreviewBuilder;

  // self :: DOM
  var self = function (root) {
    this.root   = root;
    this.body   = null;
    this.header = null;

    this.testCases = null;

    this.selectedExecutionSuite = null;

    this.initialize();
  };

  var def = self.prototype;

  def.initialize = function () {
    this.createWidgetHeader();
    this.createDialogs();
    this.addEventHandlers();
    this.getExecutionSuites();
  };

  def.createWidgetHeader = function () {
    this.resetHeader();

    this.header = ExecutionWidgetHeader.build();

    this.root.appendChild(this.header);
  };

  def.resetHeader = function () {
    if (this.header) {
      this.root.removeChild(this.header);
    }
  };

  def.createDialogs = function () {
    this.createExecutionEditDialog();
    this.createEnvironmentEditDialog();
  };

  def.createExecutionEditDialog = function () {
    this.executionEditDialog = ExecutionDialog.build();
    ExecutionDialog.initialize(this.executionEditDialog);
  };

  def.createEnvironmentEditDialog = function () {
    this.environmentEditDialog = EnvironmentDialog.build();
    EnvironmentDialog.initialize(this.environmentEditDialog);
  };


  def.addEventHandlers = function () {
    ExecutionEvents.attach(this);
  };

  def.getExecutionSuites = function () {
    var params = {
      done: this.createExecuionSuiteSelect.bind(this),
      fail: this.handleExecuionSuiteError.bind(this)
    }

    Redcaser.API.executionSuites.index(params);
  };

  def.createExecuionSuiteSelect = function (response) {
    var node = ExecutionSuiteBuilder.buildExecutionSuiteSelect(response);

    this.header.appendChild(node);
  };

  def.initializeBody = function () {
    if (this.body) {
      this.root.removeChild(this.body);
    }

    this.body = document.createElement('div');
    this.body.classList.add('execution-body');
  };

  def.handleExecuionSuiteError = function (response) {
    console.log('Fail!');
    console.log(response);
  };

  def.createExecutionSuiteBody = function (data) {
    this.testCases = data.test_cases.reduce(function (total, element) {
      total[element.id] = element;

      return total;
    }, {});

    this.selectedExecutionSuite = data.execution_suite;

    this.initializeBody();
    var node = ExecutionSuiteBuilder.buildExecutionSuiteBody(data);

    this.body.appendChild(node);
    this.root.appendChild(this.body);
  };

  def.displayCasePreview = function (id) {
    this.initializePreview();

    this.preview = TestCasePreviewBuilder.build(this.testCases[parseInt(id)]);

    this.root.appendChild(this.preview);
  };

  def.initializePreview = function () {
    if (this.preview) {
      this.root.removeChild(this.preview);
    }
  };

  return self;
})();
