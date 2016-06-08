var Redcaser = Redcaser || {}

Redcaser.Events = (function () {
  'use strict'

  var self = {}

  // attach :: Object
  self.attach = function (context) {
    var handlers = this.eventHandlers()

    handlers.forEach(function (element) {
      this.addEventHandler(element, context)
    }.bind(this))
  }

  // addEventHandler :: [String, String, (Event, Object -> *)], Object
  self.addEventHandler = function (config, context) {
    context.root.addEventListener(config[0], function (event, ui) {
      if (event.target.classList.contains(config[1])) {
        config[2].bind(this)(event, context)
      }
    }.bind(this))
  }

  return self
})()

Redcaser.TreeEvents = (function () {
  'use strict'

  var self = $.extend({}, Redcaser.Events)

  // eventHandlers :: -> [[String, String, (Event -> *)]]
  self.eventHandlers = function () {
    // [event name, class, handler]
    return [
      ['click', 'suite-create',         this.handleSuiteCreate],
      ['click', 'suite-actions-edit',   this.handleSuiteEdit  ],
      ['click', 'suite-actions-delete', this.handleSuiteDelete],
      ['click', 'case-actions-edit',    this.handleCaseEdit   ]
    ]
  }

  // handleSuiteEdit :: Event, Object
  self.handleSuiteEdit = function (event, context) {
    var suiteId = event.target.dataset.id

    var params = {
      id:   suiteId,
      done: function (response) {
        Redcaser.suiteDialog.forUpdate(response, context)
      },
      fail: function (response) { alert(response.responseJSON.errors) }
    }

    Redcaser.API.testSuites.edit(params)
  }

  // handleCaseEdit :: Event, Object
  self.handleCaseEdit = function (event, context) {
    var issueId = event.target.dataset.issue_id
    var testSuiteId = event.target.dataset.test_suite_id

    var url = '/issues/' + issueId + '/edit?test_suite_id=' + testSuiteId
    window.open(url, "_blank")
  }

    // handleSuiteCreate :: Event, Object
  self.handleSuiteCreate = function (event, context) {
    var params = {
      done: function (response) {
        Redcaser.suiteDialog.forCreate(event, response, context)
      },
      fail: function (response) { alert(response.responseJSON.errors) }
    }

    Redcaser.API.testSuites.new(params)
  }

  // handleSuiteDelete :: Event, Object
  self.handleSuiteDelete = function (event, context) {
    var id = parseInt(event.target.dataset.id)
    var node = context.testSuites[id].node

    if (node.getElementsByClassName("suite-case").length > 0) {
        alert("Cannot delete test suite while not empty")
    } else if (confirm('Really delete this test suite?')) {
        var params = {
        id:   id,
        done: function (response) {
          node.parentNode.removeChild(node)

          delete context.testSuites[id]
        },
        fail: function (response) {
          var errors = response.responseJSON.errors

          alert(errors)
        }
      }

      Redcaser.API.testSuites.destroy(params)
    }

  }

  return self
})()

Redcaser.ExecutionEvents = (function () {
  'use strict'

  var ExecutionDialog   = Redcaser.ExecutionDialog
  var EnvironmentDialog = Redcaser.EnvironmentDialog

  var self = $.extend({}, Redcaser.Events)

  // eventHandlers :: -> [[String, String, (Event -> *)]]
  self.eventHandlers = function () {
    // [event name, class, handler]

    return [
      ['change', 'execution-all-versions',     this.handleAllVersions    ],
      ['change', 'execution-select',           this.handleExecutionChange],
      ['change', 'list-item-select',           this.handleStatusChange   ],
      ['click',  'execution-list-edit',        this.handleSuiteEdit      ],
      ['click',  'execution-list-clone',       this.handleSuiteClone     ],
      ['click',  'execution-list-delete',      this.handleSuiteDelete    ],
      ['click',  'case-footer-submit',         this.handlePreviewSubmit  ],
      ['click',  'execution-create',           this.handleExecutionCreate],
      ['click',  'list-item-name',             this.handleListItemClick  ],
      ['click',  'case-footer-related-submit', this.handleRelationCreate ]
    ]
  }

  // handleAllVersions :: Event, Object
  self.handleAllVersions = function (event, context) {
    var all = event.target.checked

    context.getExecutionSuites(all)
  }

  // handleExecutionChange :: Event, Object
  self.handleExecutionChange = function (event, context) {
    var executionId = event.target.value

    context.loadExecutionSuite(executionId)
  }

  // handleStatusChange :: Event, Object
  self.handleStatusChange = function (event, context) {
    if (!event.target.value) return

    var id        = event.target.dataset.id
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
      fail: function (response) { alert(response.responseJSON.errors) }
    }

    if (test_case.status) {
      params.id = event.target.dataset.test_case_status_id

      Redcaser.API.testSuiteStatuses.update(params)
    }
    else {
      Redcaser.API.testSuiteStatuses.create(params)
    }
  }

  self.handleSuiteClone = function (event, context) {
    var id = event.target.dataset.id

    var params = {
      id:   id,
      data: {all: context.allVersions.checked},
      done: function (response) {
        Redcaser.executionDialog.forClone(response, context)
      },
      fail: function (response) { alert(response.responseJSON.errors) }
    }

    Redcaser.API.executionSuites.edit(params)
  }

  self.handleSuiteEdit = function (event, context) {
    var id = event.target.dataset.id

    var params = {
      id:   id,
      data: {all: context.allVersions.checked},
      done: function (response) {
        Redcaser.executionDialog.forUpdate(response, context)
      },
      fail: function (response) { alert(response.responseJSON.errors) }
    }

    Redcaser.API.executionSuites.edit(params)
  }

  self.handleSuiteDelete = function (event, context) {
    var id = event.target.dataset.id

    if (confirm('Really delete this execution suite and all related test results? This action cannot be undone.')) {
      var params = {
        id:   id,
        done: function (response) {
          context.removeSuiteOption(id)

          while (context.body.firstChild) {
            context.body.removeChild(context.body.firstChild)
          }

          context.select.value = ''
        },
        fail: function (response) { alert(response.responseJSON.errors) }
      }

      Redcaser.API.executionSuites.destroy(params)
    }
  }

  // handlePreviewSubmit :: Event, Object
  self.handlePreviewSubmit = function (event, context) {
    var params    = this.gatherPreviewData(event, context)

    if (params.data.test_case_status.execution_result_id === ' ') return

    var id        = event.target.dataset.id
    var test_case = context.testCases[id]

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
      data: {all: context.allVersions.checked},
      done: function (response) {
        Redcaser.executionDialog.forCreate(response, context)
      },
      fail: function (response) { alert(response.responseJSON.errors) }
    }

    Redcaser.API.executionSuites.new(params)
  }

  // handleListItemClick :: Event, Object
  self.handleListItemClick = function (event, context) {
    var id = event.target.dataset.id

    context.displayCasePreview(id)
    context.preview.dataset.test_case_id = id
  }

  // updateStatusForListItem :: Object, Object
  self.updateStatusForListItem = function (data, context) {
    var testCaseStatus = data.test_case_status
    var listItem       = context.listItems[testCaseStatus.test_case_id.toString()]
    var nameSelect     = listItem.getElementsByClassName('list-item-select')[0]

    nameSelect.value = testCaseStatus.status_id
    if (!nameSelect.childNodes[0].getAttribute('value').trim()) {
      nameSelect.removeChild(nameSelect.childNodes[0])
    }

    if (context.preview && testCaseStatus.test_case_id == context.preview.dataset.test_case_id) {
      var textField = context.preview
        .getElementsByClassName('case-footer-comment')[0]
      var selectField = context.preview
        .getElementsByClassName('case-footer-select')[0]

      textField.value   = ''
      selectField.value = testCaseStatus.status_id
    }
  }

  // handleRelationCreate :: Event, Object
  self.handleRelationCreate = function (event, context) {
    var params = this.gatherPreviewData(event, context)

    var id        = event.target.dataset.id
    var test_case = context.testCases[id]

    var relation  = event.target.parentNode.getElementsByClassName('case-footer-related-select')[0].value

    if (params.data.test_case_status.execution_result_id === ' ') return

    params.done = function () {
      var url = '/projects/' + context.project.identifier
        + '/issues/new?test_case[relation_type]='
        + relation
        + '&test_case[issue_id]='
        + test_case.issue_id
        + '&issue[tracker_id]='
        + Redcaser.defect_id

        window.open(url, '_blank')
    }

    if (test_case.status) {
      params.id = event.target.dataset.test_case_status_id

      Redcaser.API.testSuiteStatuses.update(params)
    }
    else {
      Redcaser.API.testSuiteStatuses.create(params)
    }
  }

  self.gatherPreviewData = function (event, context) {
    var id      = event.target.dataset.id
    var parent  = event.target.parentNode.parentNode

    var comment = parent.getElementsByClassName('case-footer-comment')[0].value
    var status  = parent.getElementsByClassName('case-footer-select')[0].value

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
      fail: function (response) { alert(response.responseJSON.errors) }
    }

    return params
  }
  return self
})()

Redcaser.TestCaseSelectorEvents = (function () {
  'use strict'

  var self = $.extend({}, Redcaser.Events)

  // eventHandlers :: -> [[String, String, (Event -> *)]]
  self.eventHandlers = function () {
    // [event name, class, handler]
    return [
      ['change', 'queries-select',    this.handleQueryChange],
      ['change', 'case-header-check', this.handleCheckToggle]
    ]
  }

  self.handleQueryChange = function (event, context) {
    var id = event.target.value

    if (id) {
      context.getTestCaseList(id)
    }
    else {
      while (context.caseList.firstChild) {
        context.caseList.removeChild(context.caseList.firstChild)
      }
    }
  }

  self.handleCheckToggle = function (event, context) {
    var isChecked = event.target.checked
    var children  = context.caseList.childNodes

    for(var index = 0; index < children.length; index += 1) {

      var checkbox = children[index].getElementsByClassName('checkbox')[0].firstChild
      checkbox.checked = isChecked
    }
  }

  return self
})()


Redcaser.EnvironmentSelectorEvents = (function () {
  'use strict'

  var EnvironmentDialog = Redcaser.EnvironmentDialog

  var self = $.extend({}, Redcaser.Events)

  // eventHandlers :: -> [[String, String, (Event -> *)]]
  self.eventHandlers = function () {
    // [event name, class, handler]
    return [
      ['click', 'environment-create', this.handleEnvironmentCreate],
      ['click', 'environment-edit',   this.handleEnvironmentEdit  ],
      ['click', 'environment-delete', this.handleEnvironmentDelete]
    ]
  }

  // handleEnvironmentCreate :: Event, Object
  self.handleEnvironmentCreate = function (event, context) {
    Redcaser.environmentDialog.forCreate(context)
  }

  // handleEnvironmentEdit :: Event, Object
  self.handleEnvironmentEdit = function (event, context) {
    var id = context.inputs.select.value

    var params = {
      id:   id,
      done: function (response) {
        Redcaser.environmentDialog.forUpdate(response, context)
      },
      fail: function (response) { alert(response.responseJSON.errors) }
    }

    Redcaser.API.environments.edit(params)
  }

  // handleEnvironmentDelete :: Event, Object
  self.handleEnvironmentDelete = function (event, context) {
    var id = context.inputs.select.value

    if (confirm('Are you sure?')) {
      var params = {
        id:   id,
        done: function (response) {
          context.deleteOption(id)
        },
        fail: function (response) { alert(response.responseJSON.errors) }
      }

      Redcaser.API.environments.destroy(params)
    }
  }

  return self
})()
