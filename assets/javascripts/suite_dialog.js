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
    this.inputs.name   = DOMBuilder.textInput({classes: ['name-filed']})
    this.inputs.parent = DOMBuilder.select({classes: ['parent-filed']})

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
            this.inputs.parent
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
  def.forCreate = function (target, data) {
    var object   = this.modal
    var parentId = target.dataset.parent_id

    object.parent().data('suite-id', null)

    $('.name-field').val('')

    var select = $('.parent-field')
    select.empty()

    select.append('<option value=""></option>')
    data.test_suites.forEach(function (element) {
      if (element.id == parentId) {
        select.append('<option value="' + element.id + '" selected="selected">' + element.name + '</option>')
      }
      else {
        select.append('<option value="' + element.id + '">' + element.name + '</option>')
      }
    }.bind(this))

    object.dialog('option', 'title', 'Create Test Suite')
    object.dialog(
      'option',
      'buttons',
      [{
        class: 'suite-submit',
        text:  'OK',
        click: this.submitForCreate.bind(this)
      }]
    )
    object.dialog('open')
  }

  // forUpdate :: DOM
  def.forUpdate = function (target, data) {
    var object   = this.modal
    var id       = target.dataset.id
    var parentId = target.dataset.parent_id

    object.parent().data('suite-id', id)

    $('.name-field').val(data.test_suite.name)

    var select = $('.parent-field')
    select.empty()

    select.append('<option value=""></option>')
    data.test_suites.forEach(function (element) {
      if (element.id == parentId) {
        select.append('<option value="' + element.id + '" selected="selected">' + element.name + '</option>')
      }
      else {
        select.append('<option value="' + element.id + '">' + element.name + '</option>')
      }
    }.bind(this))


    object.dialog('option', 'title', 'Update Test Suite')
    object.dialog(
      'option',
      'buttons',
      [{
        class: 'suite-submit',
        text:  'OK',
        click: this.submitForUpdate.bind(this)
      }]
    )
    object.dialog('open')
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
    var root = $(target).closest('.ui-dialog')

    return {
      id: root.data('suite-id'),
      params: {
        test_suite: {
          name:      root.find('.name-field').val(),
          parent_id: root.find('.parent-field').val()
        }
      }
    }
  }

  return self
})()
