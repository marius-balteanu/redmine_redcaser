var Redcaser = Redcaser || {}

Redcaser.SuiteDialog = (function () {
  'use strict'

  var TestSuite = Redcaser.TestSuite
  var Validator = Redcaser.Validator

  var self = function () {
    this.inputs    = {}
    this.body      = this.build()
    this.modal     = this.modal()
    this.validator = new Validator()
  }

  var def = self.prototype

  // build :: -> DOM
  def.build = function () {
    this.inputs.name    = DOMBuilder.textInput({classes: ['name-filed']})
    this.inputs.parents = DOMBuilder.select({classes: ['parent-filed']})

    return DOMBuilder.div({
      classes:  ['suite-dialog'],
      children: [
        DOMBuilder.div({
          classes:  ['suite-dialog-name'],
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
          classes:  ['suite-dialog-parent'],
          children: [
            DOMBuilder.label({children: [DOMBuilder.text('Parent')]}),
            this.inputs.parents
          ]
        })
      ]
    })
  }

  def.modal = function (dialog) {
    var params = {
      autoOpen: false,
      height:   200,
      width:    300,
      modal:    true
    }

    return $(this.body).dialog(params)
  }

  // forCreate :: DOM
  def.forCreate = function (event, data, context) {
    this.context           = context
    this.suiteId           = null
    this.inputs.name.value = ''

    var parentId = event.target.dataset.parent_id

    this.rebuildParentSelect(data.test_suites, parentId)

    this.modal.dialog('option', 'title', 'Create Test Suite')
    this.modal.dialog(
      'option',
      'buttons',
      [{
        class: 'suite-submit',
        text:  'OK',
        click: this.submitForCreate.bind(this)
      }]
    )
    this.modal.dialog('open')
  }

  // forUpdate :: DOM
  def.forUpdate = function (data, context) {
    this.context = context
    this.suiteId = data.test_suite.id

    this.inputs.name.value = data.test_suite.name

    this.rebuildParentSelect(data.test_suites, data.test_suite.parent_id, data.test_suite.id)
    this.modal.dialog('option', 'title', 'Update Test Suite')
    this.modal.dialog(
      'option',
      'buttons',
      [{
        class: 'suite-submit',
        text:  'OK',
        click: this.submitForUpdate.bind(this)
      }]
    )
    this.modal.dialog('open')
  }

  def.rebuildParentSelect = function (parents, selectedId, excludeId) {
    var select = this.inputs.parents

    while (select.firstChild) {
      select.removeChild(select.firstChild);
    }

    select.appendChild(DOMBuilder.option())

    parents.forEach(function (element) {
      if (element.id == excludeId) return

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
      .validateLength(data.params.test_suite.name, 'Name', {min: 5})

    var messages = this.validator.messages()

    if (!messages.length) {
      var params = {
        data: data.params,
        done: function (response) {
          var testSuite   = new TestSuite(response.test_suite, this.context)
          var parentSuite = this.context.testSuites[testSuite.parent_id]

          this.context.testSuites[testSuite.id] = testSuite

          if (parentSuite) {
            parentSuite.childSuitesNode.appendChild(testSuite.node)
            parentSuite.testSuites.push[testSuite]
          }
          else {
            if (this.context.noSuite) {
              this.context.noSuite.remove()
            }
            this.context.body.appendChild(testSuite.node)
          }

          this.modal.dialog('close')
        }.bind(this),
        fail: function (response) { alert(response.responseJSON.errors) }
      }

      Redcaser.API.testSuites.create(params)
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
      .validateLength(data.params.test_suite.name, 'Name', {min: 5})

    var messages = this.validator.messages()

    if (!messages.length) {
      var params = {
        id:   data.id,
        data: data.params,
        done: function (response) {
          var testSuite   = this.context.testSuites[response.test_suite.id]
          var parentSuite = this.context.testSuites[response.test_suite.parent_id]

          testSuite.fields.name.nodeValue = response.test_suite.name

          if (testSuite.parentId !== response.test_suite.parent_id) {
            testSuite.node.parentNode.removeChild(testSuite.node)
            if (parentSuite) {
              parentSuite.childSuitesNode.appendChild(testSuite.node)
              parentSuite.testSuites.push[testSuite]
            }
            else {
              this.context.body.appendChild(testSuite.node)
            }
          }

          this.modal.dialog('close')
        }.bind(this),
        fail: function (response) { alert(response.responseJSON.errors) }
      }

      Redcaser.API.testSuites.update(params)
    }
    else {
      alert(messages)
    }
  }

  // gatherData :: DOM -> Object
  def.gatherData = function (target) {
    return {
      id: this.suiteId,
      params: {
        test_suite: {
          name:      this.inputs.name.value,
          parent_id: this.inputs.parents.value
        }
      }
    }
  }

  return self
})()
