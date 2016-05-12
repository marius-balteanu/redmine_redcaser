var Redcaser = Redcaser || {};

Redcaser.TestCaseSelectorEvents = (function () {
  'use strict';

  var self = {};

  // build :: Object
  self.attach = function (context) {
    var handlers = this.eventHandlers();

    handlers.forEach(function (element) {
      this.addEventHandler(element, context);
    }.bind(this));
  };

  // eventHandlers :: -> [[String, String, (Event -> *)]]
  self.eventHandlers = function () {
    // [event name, class, handler]
    return [
      ['change', 'queries-select', this.handleQueryChange],
    ];
  }

  // addEventHandler :: [String, String, (Event -> *)], Object
  self.addEventHandler = function (config, context) {
    context.root.addEventListener(config[0], function (event) {
      if (event.target.classList.contains(config[1])) {
        config[2].bind(this)(event, context);
      }
    }.bind(this))
  }

  self.handleQueryChange = function (event, context) {
    var id = event.target.value;

    context.getTestCaseList(id);
  };

  return self;
})();
