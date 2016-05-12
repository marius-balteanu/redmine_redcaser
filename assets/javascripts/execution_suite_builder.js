var Redcaser = Redcaser || {};

Redcaser.ExecutionSuiteBuilder = (function () {
  'use strict';

  // self :: DOM
  var self = {};

  self.buildExecutionSuiteSelect = function (data) {
    var node = document.createElement('select');
    node.classList.add('execution-select');

    var empty = document.createElement('option');
    node.appendChild(empty);

    data.forEach(function (element) {
      node.appendChild(this.buildExecutionSuiteOption(element));
    }.bind(this));

    return node;
  };

  self.buildExecutionSuiteOption = function (element) {
    var node   = document.createElement('option');
    node.value = element.id;

    var text = document.createTextNode(element.name);
    node.appendChild(text);

    return node;
  };

  self.buildExecutionSuiteBody = function (data) {
    var node = document.createElement('div');
    node.classList.add('case-list-root')

    if (data.execution_suite) {
      node.appendChild(this.buildCaseListToolbar(data));
      node.appendChild(this.buildCaseListHeader(data));
      node.appendChild(this.buildCaseListBody(data));
    }

    return node;
  };

  self.buildCaseListToolbar = function (data) {
    var node = document.createElement('div');
    node.classList.add('case-list-toolbar')

    node.appendChild(this.buildCaseListTitle(data));

    return node;
  };

  self.buildCaseListTitle = function (data) {
    var node = document.createTextNode(data.execution_suite.name);

    return node;
  };

  self.buildCaseListHeader = function (data) {
    var node = document.createElement('div');
    node.classList.add('case-list-header')

    node.appendChild(this.buildCaseListHeaderCheckbox());
    node.appendChild(this.buildCaseListHeaderId());
    node.appendChild(this.buildCaseListHeaderTitle());
    node.appendChild(this.buildCaseListHeaderStatus());

    return node;
  };

  self.buildCaseListHeaderCheckbox = function () {
    var node = document.createElement('span');
    node.classList.add('list-header-check');

    var check  = document.createElement('input');
    check.type = 'checkbox';

    node.appendChild(check);

    return node;
  };

  self.buildCaseListHeaderId = function () {
    var node = document.createElement('span');
    node.classList.add('list-header-id');

    var text = document.createTextNode('Id');

    node.appendChild(text);

    return node;
  };

  self.buildCaseListHeaderTitle = function () {
    var node = document.createElement('span');
    node.classList.add('list-header-title');

    var text = document.createTextNode('Title');

    node.appendChild(text);

    return node;
  };

  self.buildCaseListHeaderStatus = function () {
    var node = document.createElement('span');
    node.classList.add('list-header-status');

    var text = document.createTextNode('Status');

    node.appendChild(text);

    return node;
  };

  self.buildCaseListBody = function (data) {
    var node = document.createElement('div');
    node.classList.add('case-list-body');

    var elements = data.test_cases;

    elements.forEach(function (element) {
      node.appendChild(this.buildCaseListItem(element, data));
    }.bind(this));

    return node;
  };

  self.buildCaseListItem = function (element, data) {
    var node = document.createElement('div');
    node.classList.add('list-item');

    node.appendChild(this.buildCaseListItemCheckbox(element));
    node.appendChild(this.buildCaseListItemId(element));
    node.appendChild(this.buildCaseListItemName(element));
    node.appendChild(this.buildCaseListItemStatus(element, data));

    return node;
  };

  self.buildCaseListItemCheckbox = function (element) {
    var node = document.createElement('span');
    node.classList.add('list-item-check');

    var check  = document.createElement('input');
    check.type = 'checkbox';

    node.appendChild(check);

    return node;
  };

  self.buildCaseListItemId = function (element) {
    var node = document.createElement('span');
    node.classList.add('list-item-id');

    var text = document.createTextNode(element.id);

    node.appendChild(text);

    return node;
  };

  self.buildCaseListItemName = function (element) {
    var node = document.createElement('span');
    node.classList.add('list-item-name');
    node.dataset.id = element.id;

    var text = document.createTextNode(element.name);

    node.appendChild(text);

    return node;
  };

  self.buildCaseListItemStatus = function (element, data) {
    var node = document.createElement('span');
    node.classList.add('list-item-status');

    var status;

    if (element.status) {
      status = element.status.name;
    }
    else {
      status = 'Untested';
    }

    var text = document.createTextNode(status);
    node.appendChild(text);

    var select = document.createElement('select');
    select.classList.add('list-item-select');
    select.dataset.id = element.id;

    select.appendChild(document.createElement('option'));
    data.execution_results.forEach(function (execution_result) {
      var option = document.createElement('option');
      option.value = execution_result.id;

      if (element.status && element.status.id === execution_result.id) {
        option.selected = true;
      }

      var option_text = document.createTextNode(execution_result.name);

      option.appendChild(option_text);
      select.appendChild(option);
    });

    node.appendChild(select);

    return node;
  };

  return self;
})();
