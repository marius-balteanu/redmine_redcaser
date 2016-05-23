var Redcaser = Redcaser || {}

Redcaser.TestCaseSelector = (function () {
  'use strict'

  var TestCaseSelectorEvents = Redcaser.TestCaseSelectorEvents

  var self = function () {
    this.inputs    = {}
    this.testCases = {}

    this.root = this.build()

    TestCaseSelectorEvents.attach(this)
  }

  var def = self.prototype

  def.build = function () {
    this.inputs.select = DOMBuilder.select({classes:  ['queries-select']})
    this.caseList      = DOMBuilder.div({classes:  ['case-list']})

    return DOMBuilder.div({
      children: [
        DOMBuilder.label({children: [DOMBuilder.text('Queiries')]}),
        this.inputs.select,
        this.caseList
      ]
    })
  }

  def.rebuild = function (data, executionSuite) {
    this.executionSuite = executionSuite

    var selectedId = executionSuite ? executionSuite.query_id : null

    var select = this.inputs.select

    while (select.firstChild) {
      select.removeChild(select.firstChild)
    }

    select.appendChild(DOMBuilder.option())

    data.forEach(function (element) {
      select.appendChild(
        DOMBuilder.option({
          value:    element.id,
          selected: element.id == selectedId,
          children: [DOMBuilder.text(element.name)]
        })
      )
    })

    if (selectedId) this.getTestCaseList(selectedId)
  }

  def.buildCaseList = function (data, selected) {
    while (this.caseList.firstChild) {
      this.caseList.removeChild(this.caseList.firstChild)
    }

    data.forEach(function (element) {
      this.caseList.appendChild(
        DOMBuilder.div({
          classes:  ['case-element'],
          children: [
            DOMBuilder.checkbox({
              value:   element.id,
              checked: selected.includes(element.id)
            }),
            DOMBuilder.text(element.name)
          ]
        })
      )
    }.bind(this))
  }

  def.getTestCaseList = function (id) {
    var executionId = this.executionSuite ? this.executionSuite.id : null

    if (id) {
      var params = {
        id:   id,
        data: {execution_suite_id: executionId},
        done: this.displayTestCases.bind(this),
        fail: function (response) { console.log(response) }
      }

      Redcaser.API.queryTestCases.show(params)
    }
    else {
      while (this.caseList.firstChild) {
        this.caseList.removeChild(this.caseList.firstChild)
      }
    }
  }

  def.displayTestCases = function (response) {
    this.testCases = response.test_cases

    this.buildCaseList(this.testCases, response.selected)
  }

  return self
})()
