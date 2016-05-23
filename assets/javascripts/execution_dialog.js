var Redcaser = Redcaser || {}

Redcaser.ExecutionDialog = (function () {
  var TestCaseSelector    = Redcaser.TestCaseSelector
  var EnvironmentSelector = Redcaser.EnvironmentSelector

  var self = function () {
    this.inputs = {}
    this.body   = this.build()
    this.modal  = this.modal()
  }

  var def = self.prototype

  // build :: -> DOM
  def.build = function () {
    this.inputs.name    = DOMBuilder.textInput({classes: ['name-field']})
    this.inputs.version = DOMBuilder.select({classes: ['version-field']})

    this.inputs.environmentSelector = new EnvironmentSelector()
    this.inputs.querySelector       = new TestCaseSelector()

    return DOMBuilder.div({
      classes:  ['execution-dialog'],
      children: [
        DOMBuilder.div({
          classes:  ['execution-dialog-name'],
          children: [
            DOMBuilder.label({children: [DOMBuilder.text('Name')]}),
            this.inputs.name
          ]
        }),
        DOMBuilder.div({
          classes:  ['execution-dialog-version'],
          children: [
            DOMBuilder.label({children: [DOMBuilder.text('Version')]}),
            this.inputs.version
          ]
        }),
        DOMBuilder.div({
          classes:  ['execution-dialog-environment'],
          children: [this.inputs.environmentSelector.root]
        }),
        DOMBuilder.div({
          classes:  ['execution-dialog-queries'],
          children: [this.inputs.querySelector.root]
        })
      ]
    })
  }

  def.modal = function () {
    var params = {
      autoOpen: false,
      height:   300,
      width:    350,
      modal:    true
    }

    return $(this.body).dialog(params)
  };

  // forCreate :: DOM
  def.forCreate = function (data) {
    var child

    this.selectedId = null

    this.inputs.name = ''

    this.rebuildVersionSelect(data.versions)
    this.inputs.environmentSelector.rebuild(data.environments)
    this.inputs.querySelector.rebuild(data.queries)

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
  };

  // forUpdate :: DOM
  def.forUpdate = function (data) {
    var execution_suite = data.execution_suite

    this.selectedId = execution_suite.id
    this.inputs.name = execution_suite.name

    this.rebuildVersionSelect(data.versions, execution_suite.version_id)

    this.inputs.environmentSelector.rebuild(
      data.environments,
      data.execution_suite.environment_id
    )

    this.inputs.querySelector.rebuild(data.queries, execution_suite)

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
      select.removeChild(select.firstChild);
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

    var params = {
      data: data.params,
      done: function () { location.reload(true) },
      fail: function (response) { console.log(response) }
    };

    Redcaser.API.executionSuites.create(params)
  }

  // submitForUpdate :: Event
  def.submitForUpdate = function (event) {
    var data = this.gatherData()

    var params = {
      id:   data.id,
      data: data.params,
      done: function () { location.reload(true); },
      fail: function (response) { console.log(response); }
    }

    Redcaser.API.executionSuites.update(params)
  }

  // gatherData :: -> Object
  def.gatherData = function () {
    var root = this.modal

    var testCases = root
      .find('.case-element input:checked')
      .map(function (index, element) { return element.value })
      .get()

    return {
      id: root.data('execution-id'),
      params: {
        execution_suite: {
          environment_id: root.find('.environment-select').val(),
          name:           root.find('.name-field').val(),
          query_id:       root.find('.queries-select').val(),
          test_cases:     testCases,
          version_id:     root.find('.version-field').val()
        }
      }
    }
  }

  return self
})();
