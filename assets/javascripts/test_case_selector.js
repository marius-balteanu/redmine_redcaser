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
    this.caseList      = DOMBuilder.tbody({classes:  ['case-list']})
    this.headerCheck   = DOMBuilder.checkbox({classes: ['case-header-check']})

    return DOMBuilder.div({
      children: [
        DOMBuilder.label({children: [DOMBuilder.text('Queries')]}),
        this.inputs.select,
        DOMBuilder.table({
          classes:  ['issues'],
          children: [
            DOMBuilder.tr({
              children: [
                DOMBuilder.th({
                  classes:  ['case-header-check'],
                  children: [this.headerCheck]
                }),
                DOMBuilder.th({children: [DOMBuilder.text('Name')]})
              ]
            }),
            this.caseList
          ]
        }),
      ]
    })
  }

  def.rebuild = function (data, executionSuite) {
    this.executionSuite = executionSuite

    var selectedId = executionSuite ? executionSuite.query_id : null
    var select     = this.inputs.select

    this.headerCheck.checked = false

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

    if (selectedId) {
      this.getTestCaseList(selectedId)
    }
    else {
      while (this.caseList.firstChild) {
        this.caseList.removeChild(this.caseList.firstChild)
      }
    }
  }

  def.buildCaseList = function (data, selected) {
    while (this.caseList.firstChild) {
      this.caseList.removeChild(this.caseList.firstChild)
    }

    data.forEach(function (element) {
      this.caseList.appendChild(
        DOMBuilder.tr({
          classes:  ['case-element'],
          children: [
            DOMBuilder.td({
              classes: ['checkbox'],
              children: [
                DOMBuilder.checkbox({
                  value:   element.id,
                  checked: selected.includes(element.id)
                }),
              ]
            }),
            DOMBuilder.td({
                children: [DOMBuilder.text(element.subject)]
            })
          ]
        })
      )
    }.bind(this))
  }

  def.getTestCaseList = function (id) {
    var executionId = this.executionSuite ? this.executionSuite.id : null

    var params = {
      id:   id,
      data: {execution_suite_id: executionId},
      done: this.displayTestCases.bind(this),
      fail: function (response) { console.log(response) }
    }

    Redcaser.API.queryTestCases.show(params)
  }

  def.displayTestCases = function (response) {
    this.testCases = response.test_cases

    this.buildCaseList(this.testCases, response.selected)
  }

  return self
})()
