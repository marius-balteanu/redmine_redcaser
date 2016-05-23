var Redcaser = Redcaser || {};

Redcaser.EnvironmentSelectorEvents = (function () {
  'use strict';

  var EnvironmentDialog = Redcaser.EnvironmentDialog;

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
      ['click', 'environment-create', this.handleEnvironmentCreate]
    ];
  };

  // addEventHandler :: [String, String, (Event -> *)], Object
  self.addEventHandler = function (config, context) {
    context.root.addEventListener(config[0], function (event, ui) {
      if (event.target.classList.contains(config[1])) {
        if (ui) {
          config[2].bind(this)(event, ui, context);
        } else {
          config[2].bind(this)(event, context);
        }
      }
    }.bind(this))
  };

  // handleEnvironmentCreate :: Event, Object
  self.handleEnvironmentCreate = function (event, context) {
    Redcaser.environmentDialog.forCreate(context);
  };

  return self;
})();
