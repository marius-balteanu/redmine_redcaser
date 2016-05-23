var Redcaser = Redcaser || {}

Redcaser.EnvironmentDialog = (function () {
  'use strict'

  var self = function () {
    this.inputs = {}
    this.body   = this.build()
    this.modal  = this.modal()
  }

  var def = self.prototype

  // build :: -> DOM
  def.build = function () {
    this.inputs.name = DOMBuilder.textInput({classes: ['name-field']})

    return DOMBuilder.div({
      classes:  ['environment-dialog'],
      children: [
        DOMBuilder.div({
          classes:  ['environment-dialog-name'],
          children: [
            DOMBuilder.label({children: [DOMBuilder.text('Name')]}),
            this.inputs.name
          ]
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
  def.forCreate = function (context) {
    this.context           = context
    this.inputs.name.value = ''

    this.modal.dialog('option', 'title', 'Create Environment')
    this.modal.dialog(
      'option',
      'buttons',
      [{
        class: 'environment-submit',
        text:  'OK',
        click: this.submitForCreate.bind(this)
      }]
    );
    this.modal.dialog('open')
  };

  //submitForCreate :: Event
  def.submitForCreate = function (event) {
    var name = this.inputs.name.value
    var params = {
      data: {environment: {name: name}},
      done: this.handleSubmitSuccess.bind(this),
      fail: function (response) { console.log(response) }
    }

    Redcaser.API.environments.create(params)
  }

  def.handleSubmitSuccess = function (response) {
    this.modal.dialog('close')
    this.context.appendOption(response.environment)
  }

  return self
})();
