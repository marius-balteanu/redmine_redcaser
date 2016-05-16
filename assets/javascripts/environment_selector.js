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

  def.build = function  (data, selectedId) {
    var node = document.createElement('div');

    node.appendChild(this.buildEnvironmentLabel());
    node.appendChild(this.buildEnvironmentInput(data, selectedId));
    node.appendChild(this.buildEnvironmentAddButton());

    return node;
  };

  // buildEnvironmentLabel :: -> DOM
  def.buildEnvironmentLabel = function () {
    var node = document.createElement('label');

    node.appendChild(document.createTextNode('Environment'));

    return node;
  };

  // buildEnvironmentInput :: -> DOM
  def.buildEnvironmentInput = function (data, selectedId) {
    var node = document.createElement('select');
    node.classList.add('environment-select');

    data.forEach(function (element) {
      var option = document.createElement('option');
      option.value = element.id;

      if (element.id == selectedId) option.selected = true;

      var text = document.createTextNode(element.name);

      option.appendChild(text);
      node.appendChild(option);
    });

    return node;
  };

  // buildEnvironmentAddButton :: -> DOM
  def.buildEnvironmentAddButton = function () {
    var node = document.createElement('a');
    node.classList.add('environment-create');
    node.href = '#';

    var text = document.createTextNode('Add environment');
    node.appendChild(text);

    return node;
  };

  def.buildSelect = function () {
  }

  def.addEventHandlers = function () {
    EnvironmentSelectorEvents.attach(this);
  };

  return self;
})();
