var Redcaser = Redcaser || {};

Redcaser.ExecutionWidget = (function () {
  'use strict';

  var ExecutionWidgetHeader = Redcaser.ExecutionWidgetHeader;
  var ExecutionSuiteBuilder = Redcaser.ExecutionSuiteBuilder;

  // self :: DOM
  var self = function (root) {
    this.root   = root;
    this.body   = null;
    this.header = null;

    this.executionSuites = null;

    this.initialize();
  };

  var def = self.prototype;

  def.initialize = function () {
    this.createWidgetHeader();
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

  def.getExecutionSuites = function () {
    var params = {
      done: this.createExecuionSuiteBody.bind(this),
      fail: this.handleExecuionSuiteError.bind(this)
    }

    Redcaser.API.executionSuites.index(params);
  };

  def.createExecuionSuiteBody = function (response) {
    this.initializeBody();

    var node = ExecutionSuiteBuilder.buildExecutionSuiteSelect(response);

    this.body.appendChild(node);
    this.root.appendChild(this.body);
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

  return self;
})();
