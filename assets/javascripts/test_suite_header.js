var TestSuiteHeader = (function () {
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
    node.classList.add('tree-header');

    return node;
  };

  // buildHeaderTitle :: -> DOM
  self.buildHeaderTitle = function () {
    var node = document.createElement('div');
    node.classList.add('tree-title');

    var text = document.createTextNode('Test Cases');
    node.appendChild(text);

    return node;
  };

  // buildHeaderActions :: -> DOM
  self.buildHeaderActions = function () {
    var node = document.createElement('div');
    node.classList.add('tree-actions');

    var text = document.createTextNode('Actions');
    node.appendChild(text);

    node.appendChild(this.buildHeaderActionsCreate());

    return node;
  };

  // buildHeaderActionsCreate :: -> DOM
  self.buildHeaderActionsCreate = function () {
    var node = document.createElement('a');
    node.classList.add('suite-create');
    node.href = '#';

    var text = document.createTextNode('Add test suite');
    node.appendChild(text);

    return node
  };

  return self;
})();
