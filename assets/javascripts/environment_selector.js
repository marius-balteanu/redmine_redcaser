var Redcaser = Redcaser || {};

Redcaser.EnvironmentSelector = (function () {
  'use strict'

  var EnvironmentSelectorEvents = Redcaser.EnvironmentSelectorEvents

  var self = function (environments, executionSuite) {
    this.inputs     = {}
    this.selectedId = executionSuite ? executionSuite.environment_id : null
    this.root       = this.build(environments)

    EnvironmentSelectorEvents.attach(this)
  }

  var def = self.prototype

  def.build = function  (data) {
    this.inputs.select = DOMBuilder.select({
      classes:  ['environment-select'],
      children: DOMBuilder.options({
        data:         data,
        selected:     this.selectedId,
        valueField:   'id',
        textField:    'name'
      })
    })

    return DOMBuilder.div({
      children: [
        DOMBuilder.label({children: [DOMBuilder.text('Environment')]}),
        this.inputs.select,
        DOMBuilder.link({
          classes:  ['environment-create'],
          href:     '#',
          children: [DOMBuilder.text('Add environment')]
        })
      ]
    })
  }

  def.appendOption = function (environment) {
    this.inputs.select.appendChild(
      DOMBuilder.option({
        value:    environment.id,
        children: [DOMBuilder.text(environment.name)]
      })
    )
  }

  return self
})()
