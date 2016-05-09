var Redcaser = Redcaser || {};

Redcaser.ExecutionWidgetHeader = (function () {
  'use strict';

  var self = {};

  // build :: Object -> DOM
  self.build = function (element) {
    var node = this.buildHeaderNode(element);

    node.appendChild(this.buildHeaderTitle());
    node.appendChild(this.buildHeaderActions());

    return node;
  };

  // buildHeaderNode :: -> DOM
  self.buildHeaderNode = function () {
    var node = document.createElement('div');
    node.classList.add('execution-header');

    return node;
  };

  // buildHeaderTitle :: -> DOM
  self.buildHeaderTitle = function () {
    var node = document.createElement('div');
    node.classList.add('execution-title');

    var text = document.createTextNode('Execution Suites');
    node.appendChild(text);

    return node;
  };

  // buildHeaderActions :: -> DOM
  self.buildHeaderActions = function () {
    var node = document.createElement('div');
    node.classList.add('execution-actions');

    var text = document.createTextNode('Actions');
    node.appendChild(text);

    node.appendChild(this.buildHeaderActionsCreate());
    node.appendChild(this.buildHeaderActionsEnvironment());

    return node;
  };

  // buildHeaderActionsCreate :: -> DOM
  self.buildHeaderActionsCreate = function () {
    var node = document.createElement('a');
    node.classList.add('execution-create');
    node.href = '#';

    var text = document.createTextNode('Add execution suite');
    node.appendChild(text);

    return node;
  };

  // buildHeaderActionsEnvironment :: -> DOM
  self.buildHeaderActionsEnvironment = function () {
    var node = document.createElement('a');
    node.classList.add('environment-create');
    node.href = '#';

    var text = document.createTextNode('Add environment');
    node.appendChild(text);

    return node;
  };

  return self;
})();
