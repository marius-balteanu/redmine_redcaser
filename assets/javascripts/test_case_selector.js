var Redcaser = Redcaser || {};

Redcaser.TestCaseSelector = (function () {
  'use strict';

  var TestCaseSelectorEvents = Redcaser.TestCaseSelectorEvents;

  var self = function (queries) {
    this.root = this.build(queries);

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
      done: function (response) { console.log(response); },
      fail: function (response) { console.log(response); }
    };

    Redcaser.API.queryTestCases.show(params);
  };

  return self;
})();
