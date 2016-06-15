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
        DOMBuilder.label({children: [DOMBuilder.text('Environment:')]}),
        this.inputs.select,
        DOMBuilder.link({
          classes:  ['environment-create', 'icon-only', 'icon-add'],
          href:     '#',
          children: [DOMBuilder.text('Add environment')]
        }),
        DOMBuilder.link({
          classes:  ['environment-edit', 'icon-only', 'icon-edit'],
          href:     '#',
          children: [DOMBuilder.text('Edit environment')]
        }),
        DOMBuilder.link({
          classes:  ['environment-delete', 'icon-only', 'icon-del'],
          href:     '#',
          children: [DOMBuilder.text('Delete environment')]
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

    this.inputs.select.value = environment.id
  }

  def.deleteOption = function (environment) {
    var nodes = this.inputs.select.childNodes

    for(var index = 0; index < nodes.length; index += 1) {
      var option = nodes[index]

      if(option.value == environment.id) {
        option.removeChild(option.firstChild)
        option.appendChild(DOMBuilder.text(environment.name))

        break
      }
    }
  }

  def.deleteOption = function (id) {
    var nodes = this.inputs.select.childNodes

    for(var index = 0; index < nodes.length; index += 1) {
      var option = nodes[index]

      if(option.value == id) {
        this.inputs.select.removeChild(option)
      }
    }

    if (this.inputs.select.childNodes[0]) {
      this.inputs.select.value = this.inputs.select.childNodes[0].value
    }
  }

  return self
})()
