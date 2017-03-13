var Redcaser = Redcaser || {}

Redcaser.ExecutionDialog = (function () {
  var TestCaseSelector    = Redcaser.TestCaseSelector
  var EnvironmentSelector = Redcaser.EnvironmentSelector
  var Validator           = Redcaser.Validator

  var self = function () {
    this.inputs    = {}
    this.body      = this.build()
    this.modal     = this.modal()
    this.validator = new Validator()
  }

  var def = self.prototype

  // build :: -> DOM
  def.build = function () {
    this.inputs.name    = DOMBuilder.textInput({classes: ['name-field']})
    this.inputs.version = DOMBuilder.select({classes: ['version-field']})

    this.inputs.environmentSelector = new EnvironmentSelector()
    this.inputs.testCaseSelector    = new TestCaseSelector()

    return DOMBuilder.div({
      classes:  ['execution-dialog'],
      children: [
        DOMBuilder.div({
          classes:  ['execution-dialog-name'],
          children: [
            DOMBuilder.label({children: [
              DOMBuilder.text('Name:'),
              DOMBuilder.span({
                classes:  ['required'],
                children: [DOMBuilder.text('*')]
              })
            ]}),
            this.inputs.name
          ]
        }),
        DOMBuilder.div({
          classes:  ['execution-dialog-version'],
          children: [
            DOMBuilder.label({children: [
              DOMBuilder.text('Version:'),
              DOMBuilder.span({
                classes:  ['required'],
                children: [DOMBuilder.text('*')]
             })
            ]}),
            this.inputs.version
          ]
        }),
        DOMBuilder.div({
          classes:  ['execution-dialog-environment'],
          children: [this.inputs.environmentSelector.root]
        }),
        DOMBuilder.div({
          classes:  ['execution-dialog-queries'],
          children: [this.inputs.testCaseSelector.root]
        })
      ]
    })
  }

  def.modal = function () {
    var params = {
      autoOpen: false,
      minWidth: 500,
      minHeight: 300,
      modal:    true
    }

    return $(this.body).dialog(params)
  }

  // forClone :: DOM
  def.forClone = function (data, context) {
    var execution_suite = data.execution_suite

    this.context           = context
    this.executionSuiteId  = execution_suite.id
    this.inputs.name.value = 'Copy of: ' + execution_suite.name

    this.rebuildVersionSelect(data.versions, execution_suite.version_id)

    this.inputs.environmentSelector.rebuild(
      data.environments,
      data.execution_suite.environment_id
    )

    this.inputs.testCaseSelector.rebuild(data.queries, execution_suite)

    this.modal.dialog('option', 'title', 'Clone Execution Suite')
    this.modal.dialog(
      'option',
      'buttons',
      [{
        class: 'execution-submit',
        text:  'OK',
        click: this.submitForCreate.bind(this)
      }]
    )

    this.modal.dialog('open')
  }

  // forCreate :: DOM
  def.forCreate = function (data, context) {
    this.context          = context
    this.executionSuiteId = null

    this.inputs.name.value = ''

    this.rebuildVersionSelect(data.versions)
    this.inputs.environmentSelector.rebuild(data.environments)
    this.inputs.testCaseSelector.rebuild(data.queries)

    this.modal.dialog('option', 'title', 'Create Execution Suite')
    this.modal.dialog(
      'option',
      'buttons',
      [{
        class: 'execution-submit',
        text:  'OK',
        click: this.submitForCreate.bind(this)
      }]
    )

    this.modal.dialog('open')
  }

  // forUpdate :: DOM
  def.forUpdate = function (data, context) {
    var execution_suite = data.execution_suite

    this.context           = context
    this.executionSuiteId  = execution_suite.id
    this.inputs.name.value = execution_suite.name

    this.rebuildVersionSelect(data.versions, execution_suite.version_id)

    this.inputs.environmentSelector.rebuild(
      data.environments,
      data.execution_suite.environment_id
    )

    this.inputs.testCaseSelector.rebuild(data.queries, execution_suite)

    this.modal.dialog('option', 'title', 'Update Execution Suite')
    this.modal.dialog(
      'option',
      'buttons',
      [{
        class: 'execution-submit',
        text:  'OK',
        click: this.submitForUpdate.bind(this)
      }]
    )

    this.modal.dialog('open')
  }

  def.rebuildVersionSelect = function (versions, selectedId) {
    var select = this.inputs.version

    while (select.firstChild) {
      select.removeChild(select.firstChild)
    }

    versions.forEach(function (element) {
      select.appendChild(
        DOMBuilder.option({
          value:    element.id,
          selected: element.id == selectedId,
          children: [DOMBuilder.text(element.name)]
        })
      )
    })
  }

  //submitForCreate :: Event
  def.submitForCreate = function (event) {
    var data = this.gatherData()

    this.validator
      .initialize()
      .validateLength(data.params.execution_suite.name, 'Name', {min: 5})

    var messages = this.validator.messages()

    if (!messages.length) {
      var params = {
        data: data.params,
        done: function (response) {
          this.context.appendSuiteOption(response.execution_suite)
          this.context.select.value = response.execution_suite.id
          this.context.loadExecutionSuite(response.execution_suite.id)

          if (this.context.noExecutionSuite) {
            this.context.noExecutionSuite.remove()
          }

          this.modal.dialog('close')
        }.bind(this),
        fail: function (response) { alert(response.responseJSON.errors) }
      }

      Redcaser.API.executionSuites.create(params)
    }
    else {
      alert(messages)
    }
  }

  // submitForUpdate :: Event
  def.submitForUpdate = function (event) {
    var data = this.gatherData()

    this.validator
      .initialize()
      .validateLength(data.params.execution_suite.name, 'Name', {min: 5})

    var messages = this.validator.messages()

    if (!messages.length) {
      var params = {
        id:   data.id,
        data: data.params,
        done: function (response) {
          this.context.updateSuiteOption(response.execution_suite)
          this.context.loadExecutionSuite(response.execution_suite.id)

          this.modal.dialog('close')
        }.bind(this),
        fail: function (response) { alert(response.responseJSON.errors) }
      }

      Redcaser.API.executionSuites.update(params)
    }
    else {
      alert(messages)
    }
  }

  // gatherData :: -> Object
  def.gatherData = function () {
    var testCaseNodes = this.inputs.testCaseSelector.caseList.childNodes
    var testCaseIds   = []

    for (var index = 0; index < testCaseNodes.length; index += 1) {
      var element = testCaseNodes[index].getElementsByClassName('checkbox')[0].firstChild

      if (element.checked) testCaseIds.push(element.value)
    }

    return {
      id: this.executionSuiteId,
      params: {
        execution_suite: {
          environment_id: this.inputs.environmentSelector.inputs.select.value,
          name:           this.inputs.name.value,
          query_id:       this.inputs.testCaseSelector.inputs.select.value,
          test_cases:     testCaseIds,
          version_id:     this.inputs.version.value
        }
      }
    }
  }

  return self
})()
