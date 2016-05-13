var Redcaser = Redcaser || {};

Redcaser.TestCaseSelector = (function () {
  'use strict';

  var TestCaseSelectorEvents = Redcaser.TestCaseSelectorEvents;

  var self = function (queries, executionSuite) {
    var selectedId = executionSuite ? executionSuite.query_id : null;

    this.root = this.build(queries, selectedId);
    this.caseContainer = null;
    this.executionSuite = executionSuite;

    this.testCases = {};

    this.addEventHandlers();
  };

  var def = self.prototype;

  def.build = function (data, selectedId) {
    var node = document.createElement('div');

    node.appendChild(this.buildQueriesLabel());
    node.appendChild(this.buildQueriesSelect(data, selectedId));

    return node;
  }

  // buildQueriesLabel :: -> DOM
  def.buildQueriesLabel = function () {
    var node = document.createElement('label');

    var text = document.createTextNode('Queries');
    node.appendChild(text);

    return node;
  };

  def.buildQueriesSelect = function (data, selectedId) {
    var node = document.createElement('select');
    node.classList.add('queries-select');

    node.appendChild(document.createElement('option'));
    data.forEach(function (element) {
      var option   = document.createElement('option');
      option.value = element.id;

      if (element.id == selectedId) option.selected = true;

      var text = document.createTextNode(element.name);
      option.appendChild(text);

      node.appendChild(option);
    }.bind(this));

    return node;
  };

  def.addEventHandlers = function () {
    TestCaseSelectorEvents.attach(this);
  };

  def.getTestCaseList = function (id) {
    var executionId = this.executionSuite ? this.executionSuite.id : null;

    if (id) {
      var params = {
        id:   id,
        data: {execution_suite_id: executionId},
        done: this.displayTestCases.bind(this),
        fail: function (response) { console.log(response); }
      };

      Redcaser.API.queryTestCases.show(params);
    }
    else {
      this.root.removeChild(this.caseContainer);
    }
  };

  def.displayTestCases = function (response) {
    if (this.caseContainer && this.caseContainer.parentNode === this.root) {
      this.root.removeChild(this.caseContainer);
    }

    this.testCases = response.test_cases;

    this.caseContainer = document.createElement('div')
    this.caseContainer.classList.add('case-list');

    this.testCases.forEach(function (element) {
      this.caseContainer.appendChild(this.buildCaseElement(element, response.selected));
    }.bind(this));

    this.root.appendChild(this.caseContainer);
  };

  def.buildCaseElement = function (element, selected) {
    var node = document.createElement('div');
    node.classList.add('case-element');

    node.appendChild(this.buildCaseElementCheckbox(element, selected));
    node.appendChild(this.buildCaseElementName(element));

    return node;
  };

  def.buildCaseElementCheckbox = function (element, selected) {
    var node   = document.createElement('input');
    node.type  = 'checkbox';
    node.value = element.id;

    if (selected.includes(element.id)) node.checked = true;

    return node;
  };

  def.buildCaseElementName = function (element) {
    var node = document.createTextNode(element.name);

    return node;
  };

  return self;
})();
