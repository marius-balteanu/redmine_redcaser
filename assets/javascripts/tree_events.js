var TreeEvents = (function () {
  'use strict'

  var self = {}

  // build :: Object
  self.attach = function (context) {
    var handlers = this.eventHandlers()

    handlers.forEach(function (element) {
      this.addEventHandler(element, context)
    }.bind(this))
  }

  // eventHandlers :: -> [[String, String, (Event -> *)]]
  self.eventHandlers = function () {
    // [event name, class, handler]
    return [
      ['click', 'suite-case',           this.handleCaseClick    ],
      ['click', 'suite-checkbox',       this.handleSuiteCheckbox],
      ['click', 'suite-create',         this.handleSuiteCreate  ],
      ['click', 'suite-actions-edit',   this.handleSuiteEdit    ],
      ['click', 'suite-actions-delete', this.handleSuiteDelete  ],
      ['click', 'case-actions-edit',    this.handleCaseEdit     ]
    ]
  }

  // addEventHandler :: [String, String, (Event -> *)], Object
  self.addEventHandler = function (config, context) {
    context.root.addEventListener(config[0], function (event, ui) {
      if (event.target.classList.contains(config[1])) {
        if (ui) {
          config[2].bind(this)(event, ui, context)
        } else {
          config[2].bind(this)(event, context)
        }
      }
    }.bind(this))
  }

  // handleSuiteEdit :: Event, Object
  self.handleSuiteEdit = function (event, context) {
    var suiteId = event.target.dataset.id

    var params = {
      id:   suiteId,
      done: function (response) {
        Redcaser.suiteDialog.forUpdate(response, context)
      },
      fail: function (response) { console.log(response) }
    }

    Redcaser.API.testSuites.edit(params)
  }

  // handleSuiteCheckbox :: Event, Object
  self.handleSuiteCheckbox = function (event, context) {

  }

  // handleCaseClick :: Event, Object
  self.handleCaseClick = function (event, context) {

  }

  // handleCaseEdit :: Event, Object
  self.handleCaseEdit = function (event, context) {
    var issueId = event.target.dataset.issue_id
    var testSuiteId = event.target.dataset.test_suite_id

    location.href = '/issues/' + issueId + '/edit?test_suite_id=' + testSuiteId
  }

    // handleSuiteCreate :: Event, Object
  self.handleSuiteCreate = function (event, context) {
    var params = {
      done: function (response) {
        Redcaser.suiteDialog.forCreate(response, context)
      },
      fail: function (response) { console.log(response) }
    }

    Redcaser.API.testSuites.new(params)
  }

  // handleSuiteDelete :: Event, Object
  self.handleSuiteDelete = function (event, context) {
    var id = parseInt(event.target.dataset.id)

    var params = {
      id:   id,
      done: function (response) {
        var node = context.testSuites[id].node

        node.parentNode.removeChild(node)

        context.testSuites[id] = undefined
      },
      fail: function (response) { console.log(response) }
    }

    Redcaser.API.testSuites.destroy(params)
  }

  return self
})()
