var Redcaser = Redcaser || {}

Redcaser.EnvironmentSelector = (function () {
  'use strict'

  var EnvironmentSelectorEvents = Redcaser.EnvironmentSelectorEvents

  var self = function (environments, executionSuite) {
    this.inputs = {}
    this.root   = this.build(environments)

    EnvironmentSelectorEvents.attach(this)
  }

  var def = self.prototype

  def.build = function  () {
    this.inputs.select = DOMBuilder.select({classes: ['environment-select']})

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

  def.rebuild = function (data, selectedId) {
    var select = this.inputs.select

    while (select.firstChild) {
      select.removeChild(select.firstChild);
    }

    data.forEach(function (element) {
      select.appendChild(
        DOMBuilder.option({
          value:    element.id,
          selected: element.id == selectedId,
          children: [DOMBuilder.text(element.name)]
        })
      )
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
