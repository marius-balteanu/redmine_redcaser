var Redcaser = Redcaser || {};

Redcaser.ExecutionSuiteBuilder = (function () {
  'use strict';

  // self :: DOM
  var self = {};

  self.buildExecutionSuiteSelect = function (data) {
    var node = document.createElement('select');

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
  }

  return self;
})();
