var Redcaser = Redcaser || {};

Redcaser.TestCaseSelector = (function () {
  'use strict';

  var TestCaseSelectorEvents = Redcaser.TestCaseSelectorEvents;

  var self = function (queries) {
    this.root = this.build(queries);
    this.testCases = {};

    this.addEventHandlers();
  };

  var def = self.prototype;

  def.build = function (data) {
    var node = document.createElement('div');

    node.appendChild(this.buildQueriesLabel());
    node.appendChild(this.buildQueriesSelect(data));

    return node;
  }

  // buildQueriesLabel :: -> DOM
  def.buildQueriesLabel = function () {
    var node = document.createElement('label');

    var text = document.createTextNode('Queries');
    node.appendChild(text);

    return node;
  };

  def.buildQueriesSelect = function (data) {
    var node = document.createElement('select');
    node.classList.add('queries-select');

    node.appendChild(document.createElement('option'));
    data.forEach(function (element) {
      var option   = document.createElement('option');
      option.value = element.id;

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
    var params = {
      id:   id,
      done: this.displayTestCases.bind(this),
      fail: function (response) { console.log(response); }
    };

    Redcaser.API.queryTestCases.show(params);
  };

  def.displayTestCases = function (response) {
    this.testCases = response.test_cases;

    var cases = document.createElement('div')
    cases.classList.add('case-list');

    this.testCases.forEach(function (element) {
      cases.appendChild(this.buildCaseElement(element));
    }.bind(this));

    this.root.appendChild(cases);
  };

  def.buildCaseElement = function (element) {
    var node = document.createElement('div');
    node.classList.add('case-element');

    node.appendChild(this.buildCaseElementCheckbox(element));
    node.appendChild(this.buildCaseElementName(element));

    return node;
  };

  def.buildCaseElementCheckbox = function (element) {
    var node = document.createElement('input');
    node.type = 'checkbox';

    return node;
  };

  def.buildCaseElementName = function (element) {
    var node = document.createTextNode(element.name);

    return node;
  };

  return self;
})();
