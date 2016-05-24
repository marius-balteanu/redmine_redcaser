var Redcaser = Redcaser || {}

Redcaser.TestCaseSelectorEvents = (function () {
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
      ['change', 'queries-select',    this.handleQueryChange],
      ['change', 'case-header-check', this.handleCheckToggle],
    ]
  }

  // addEventHandler :: [String, String, (Event -> *)], Object
  self.addEventHandler = function (config, context) {
    context.root.addEventListener(config[0], function (event) {
      if (event.target.classList.contains(config[1])) {
        config[2].bind(this)(event, context)
      }
    }.bind(this))
  }

  self.handleQueryChange = function (event, context) {
    var id = event.target.value

    context.getTestCaseList(id)
  }

  self.handleCheckToggle = function (event, context) {
    var isChecked = event.target.checked
    var children  = context.caseList.childNodes

    for(var index = 0; index < children.length; index += 1) {
      var checkbox = children[index].childNodes[0]

      checkbox.checked = isChecked
    }
  }

  return self
})()
