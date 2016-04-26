var TreeEvents = (function () {
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
      ['click', 'suite-case',          this.handleCaseClick    ],
      ['click', 'suite-checkbox',      this.handleSuiteCheckbox],
      ['click', 'suite-create',        this.handleSuiteCreate  ],
      ['click', 'suite-title',         this.handleSuiteEdit    ],
      ['click', 'case-link-edit',      this.handleCaseEdit     ],
      ['click', 'case-actions-edit',   this.handleCaseEdit     ],
      ['click', 'case-actions-delete', this.handleCaseDelete   ],
      ['click', 'case-actions-view',   this.handleCaseView     ]
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

  // handleSuiteEdit :: Event, Object
  self.handleSuiteEdit = function (event, context) {
    SuiteDialog.forUpdate(context.suiteEditDialog);
  };

  // handleSuiteCheckbox :: Event, Object
  self.handleSuiteCheckbox = function (event, context) {

  };

  // handleCaseClick :: Event, Object
  self.handleCaseClick = function (event, context) {

  };

  // handleCaseEdit :: Event, Object
  self.handleCaseEdit = function (event, context) {
    CaseDialog.forUpdate(context.caseEditDialog);
  };

  // handleCaseDelete :: Event, Object
  self.handleCaseDelete = function (event, context) {

  };

  // handleCaseView :: Event, Object
  self.handleCaseView = function (event, context) {

  };

  // handleSuiteCreate :: Event, Object
  self.handleSuiteCreate = function (event, context) {
    SuiteDialog.forCreate(context.suiteEditDialog);
  }

  return self;
})();
