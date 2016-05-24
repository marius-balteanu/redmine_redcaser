var Redcaser = Redcaser || {}

Redcaser.ExecutionEvents = (function () {
  'use strict'

  var ExecutionDialog   = Redcaser.ExecutionDialog
  var EnvironmentDialog = Redcaser.EnvironmentDialog

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
      ['change', 'execution-select',   this.handleExecutionChange  ],
      ['change', 'list-item-select',   this.handleStatusChange     ],
      ['click',  'case-list-edit',     this.handleSuiteEdit        ],
      ['click',  'case-list-delete',   this.handleSuiteDelete      ],
      ['click',  'case-footer-submit', this.handlePreviewSubmit    ],
      ['click',  'execution-create',   this.handleExecutionCreate  ],
      ['click',  'list-item-name',     this.handleListItemClick    ],
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

  // handleExecutionChange :: Event, Object
  self.handleExecutionChange = function (event, context) {
    var executionId = event.target.value

    var params = {
      id:   executionId,
      done: function (response) {
        context.createExecutionSuiteBody(response)
      },
      fail: function (response) { console.log(response) }
    }

    Redcaser.API.executionSuites.show(params)
  }

  // handleStatusChange :: Event, Object
  self.handleStatusChange = function (event, context) {
    var id = event.target.dataset.id

    var test_case = context.testCases[id]

    var data = {
      test_case_status: {
        execution_suite_id:  context.selectedExecutionSuite.id,
        execution_result_id: event.target.value,
        test_case_id:        id
      }
    }

    var params = {
      data: data,
      done: function (response) {
        this.updateStatusForListItem(response, context)
      }.bind(this),
      fail: function (response) { console.log(response) }
    }

    if (test_case.status) {
      params.id = event.target.dataset.test_case_status_id

      Redcaser.API.testSuiteStatuses.update(params)
    }
    else {
      Redcaser.API.testSuiteStatuses.create(params)
    }
  }

  self.handleSuiteEdit = function (event, context) {
    var id = event.target.dataset.id

    var params = {
      id:   id,
      done: function (response) {
        Redcaser.executionDialog.forUpdate(response, context)
      },
      fail: function (response) { console.log(response) }
    }

    Redcaser.API.executionSuites.edit(params)
  }

  self.handleSuiteDelete = function (event, context) {
    var id = event.target.dataset.id

    var params = {
      id:   id,
      done: function (response) { location.reload(true) },
      fail: function (response) { console.log(response) }
    }

    Redcaser.API.executionSuites.destroy(params)
  }

  // handlePreviewSubmit :: Event, Object
  self.handlePreviewSubmit = function (event, context) {
    var id      = event.target.dataset.id
    var parent  = event.target.parentNode
    var comment = parent.getElementsByClassName('case-footer-comment')[0].value
    var status  = parent.getElementsByClassName('case-footer-select')[0].value

    var test_case = context.testCases[id]

    var data = {
      test_case_status: {
        execution_suite_id:  context.selectedExecutionSuite.id,
        execution_result_id: status,
        test_case_id:        id
      },
      comment: comment
    }

    var params = {
      data: data,
      done: function (response) {
        this.updateStatusForListItem(response, context)
      }.bind(this),
      fail: function (response) { console.log(response) }
    }

    if (test_case.status) {
      params.id = event.target.dataset.test_case_status_id

      Redcaser.API.testSuiteStatuses.update(params)
    }
    else {
      Redcaser.API.testSuiteStatuses.create(params)
    }
  }

  // handleExecutionCreate :: Event, Object
  self.handleExecutionCreate = function (event, context) {
    var params = {
      done: function (response) {
        Redcaser.executionDialog.forCreate(response, context)
      },
      fail: function (response) { console.log(response) }
    }

    Redcaser.API.executionSuites.new(params)
  }

  // handleListItemClick :: Event, Object
  self.handleListItemClick = function (event, context) {
    var id = event.target.dataset.id

    context.displayCasePreview(id)
  }

  // updateStatusForListItem :: Object, Object
  self.updateStatusForListItem = function (data, context) {
    var testCaseStatus = data.test_case_status
    var listItem = context.listItems[testCaseStatus.test_case_id.toString()]
    var nameText = listItem.getElementsByClassName('list-item-status-name')[0]
      .childNodes[0]
    var nameSelect = listItem.getElementsByClassName('list-item-select')[0]

    nameText.nodeValue = testCaseStatus.name
    nameSelect.value   = testCaseStatus.status_id

    if (context.preview) {
      var textField = context.preview
        .getElementsByClassName('case-footer-comment')[0]
      var selectField = context.preview
        .getElementsByClassName('case-footer-select')[0]

      textField.value   = ''
      selectField.value = testCaseStatus.status_id
    }
  }

  return self
})()
