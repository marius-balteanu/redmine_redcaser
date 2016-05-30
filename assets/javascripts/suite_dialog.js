var Redcaser = Redcaser || {}

Redcaser.SuiteDialog = (function () {
  'use strict'

  var self = function () {
    this.inputs = {}
    this.body   = this.build()
    this.modal  = this.modal()
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
            DOMBuilder.label({children: [DOMBuilder.text('Name')]}),
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
      height:   300,
      width:    350,
      modal:    true
    }

    return $(this.body).dialog(params)
  }

  // forCreate :: DOM
  def.forCreate = function (data, context) {
    this.context           = context
    this.suiteId           = null
    this.inputs.name.value = ''

    this.rebuildParentSelect(data.test_suites)

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

    this.rebuildParentSelect(data.test_suites, data.test_suite.parent_id)
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

  def.rebuildParentSelect = function (parents, selectedId) {
    var select = this.inputs.parents

    while (select.firstChild) {
      select.removeChild(select.firstChild);
    }

    parents.forEach(function (element) {
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
    var data = this.gatherDataFrom(event.target)

    var params = {
      data: data.params,
      done: function () { location.reload(true) },
      fail: function (response) { console.log(response) }
    }

    Redcaser.API.testSuites.create(params)
  }

  // submitForUpdate :: Event
  def.submitForUpdate = function (event) {
    var data = this.gatherDataFrom(event.target)

    var params = {
      id:   data.id,
      data: data.params,
      done: function () { location.reload(true) },
      fail: function (response) { console.log(response) }
    }

    Redcaser.API.testSuites.update(params)
  }

  // gatherDataFrom :: DOM -> Object
  def.gatherDataFrom = function (target) {
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
