var Redcaser = Redcaser || {};

Redcaser.EnvironmentSelector = (function () {
  'use strict';

  var EnvironmentSelectorEvents = Redcaser.EnvironmentSelectorEvents;

  var self = function (environments, executionSuite) {
    var selectedId = executionSuite ? executionSuite.environment_id : null;

    this.root = this.build(environments, selectedId);

    this.addEventHandlers();
  };

  var def = self.prototype;

  def.build = function (data, selectedId) {
    var node = document.createElement('select');

    data.forEach(function (element) {
      var option = document.createElement('option');
      option.value = element.id;

      if (element.id == selectedId) option.selected = true;

      var text = document.createTextNode(element.name);

      option.appendChild(text);
      node.appendChild(option);
    });

    return node;
  }

  def.addEventHandlers = function () {
    EnvironmentSelectorEvents.attach(this);
  };

  return self;
})();
