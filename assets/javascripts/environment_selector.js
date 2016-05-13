var Redcaser = Redcaser || {};

Redcaser.EnvironmentSelector = (function () {
  'use strict';

  var EnvironmentSelector = Redcaser.EnvironmentSelector;

  var self = function (environments, executionSuite) {
    var selectedId = executionSuite ? executionSuite.environment_id : null;

    this.root = this.build(environments, selectedId);

    this.addEventHandlers();
  };

  var def = self.prototype;

  def.build = function (data, selectedId) {
    var node = document.createElement('div');

    data.environments.forEach(function (element) {
      var option = document.createElement('option');
      option.value = element.id;

      if (element.id == selectedId) option.selected = true;

      var text = document.createTextNode(element.name);
      node.appendChild(text);
    });

    return node;
  }

  def.addEventHandlers = function () {
    TestCaseSelectorEvents.attach(this);
  };

  return self;
})();
