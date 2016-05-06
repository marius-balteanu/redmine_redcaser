var Redcaser = Redcaser || {};

Redcaser.ExecutionEvents = (function () {
  'use strict';

  var ExecutionDialog = Redcaser.ExecutionDialog;

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
      ['click', 'execution-create', this.handleExecutionCreate],
    ];
  }

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
  }

  // handleExecutionCreate :: Event, Object
  self.handleExecutionCreate = function (event, context) {
    var params = {
      done: function (response) {
        ExecutionDialog.forCreate(context.executionEditDialog, event.target, response);
      },
      fail: function () { console.log('Fail!'); }
    };

    Redcaser.API.testSuites.new(params);
  }

  return self;
})();
