var Redcaser = Redcaser || {};

Redcaser.EnvironmentSelector = (function () {
  'use strict';

  var EnvironmentSelectorEvents = Redcaser.EnvironmentSelectorEvents;

  var self = function (environments, executionSuite) {
    var selectedId = executionSuite ? executionSuite.environment_id : null;

    this.root = self.build(environments, selectedId);

    this.addEventHandlers();
  };

  var def = self.prototype;

  self.build = function  (data, selectedId) {
    return DOMBuilder.div({
      children: [
        DOMBuilder.label({children: [DOMBuilder.text('Environment')]}),
        DOMBuilder.select({
          classes:  ['environment-select'],
          children: DOMBuilder.options({
            data:         data,
            selected:     selectedId,
            valueField:   'id',
            textField:    'name'
          })
        }),
        DOMBuilder.link({
          classes:  ['environment-create'],
          href:     '#',
          children: [DOMBuilder.text('Add environment')]
        })
      ]
    })
  };

  def.addEventHandlers = function () {
    EnvironmentSelectorEvents.attach(this);
  };

  return self;
})();
