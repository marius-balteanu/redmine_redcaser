var Redcaser = Redcaser || {}

Redcaser.ExecutionWidget = (function () {
  'use strict'

  var ExecutionSuiteBuilder = Redcaser.ExecutionSuiteBuilder
  var ExecutionEvents       = Redcaser.ExecutionEvents
  var ExecutionDialog       = Redcaser.ExecutionDialog
  var EnvironmentDialog     = Redcaser.EnvironmentDialog
  var TestCasePreview       = Redcaser.TestCasePreview

  // self :: DOM
  var self = function (root) {
    this.root      = this.build(root)
    this.testCases = {}

    this.getExecutionSuites()
    ExecutionEvents.attach(this)
  }

  var def = self.prototype

  // build :: DOM -> DOM
  def.build = function (root) {
    this.select = DOMBuilder.select({classes: ['execution-select']})

    this.header = DOMBuilder.div({
      classes:  ['execution-header'],
      children: [
        DOMBuilder.div({
          classes:  ['execution-title'],
          children: [DOMBuilder.text('Execution Suites')]
        }),
        DOMBuilder.div({
          classes:  ['execution-actions'],
          children: [
            DOMBuilder.text('Actions'),
            DOMBuilder.link({
              classes:  ['execution-create'],
              href:     '#',
              children: [DOMBuilder.text('Add execution suite')]
            })
          ]
        }),
        this.select
      ]
    })

    root.appendChild(this.header)

    return root
  };

  def.getExecutionSuites = function () {
    var params = {
      done: this.createExecuionSuiteSelect.bind(this),
      fail: function (response) { console.log(response) }
    }

    Redcaser.API.executionSuites.index(params)
  }

  def.createExecuionSuiteSelect = function (response) {
    this.project = response.project

    while (this.select.firstChild) {
      this.select.removeChild(this.select.firstChild)
    }

    this.select.appendChild(DOMBuilder.option())

    response.execution_suites.forEach(function (element) {
      this.select.appendChild(DOMBuilder.option({
        value:    element.id,
        children: [DOMBuilder.text(element.name)]
      }))
    }.bind(this))
  }

  def.appendSuiteOption = function (executionSuite) {
    this.select.appendChild(
      DOMBuilder.option({
        value:    executionSuite.id,
        children: [DOMBuilder.text(executionSuite.name)]
      })
    )
  }

  def.updateSuiteOption = function (executionSuite) {
    var nodes = this.select.childNodes

    for(var index = 0; index < nodes.length; index += 1) {
      var option = nodes[index]

      if(option.value == executionSuite.id) {
        option.removeChild(option.firstChild)
        option.appendChild(DOMBuilder.text(executionSuite.name))

        break
      }
    }
  }

  def.initializeBody = function () {
    if (this.body && this.body.parentNode === this.root) {
      this.root.removeChild(this.body)
    }

    this.body = document.createElement('div')
    this.body.classList.add('execution-body')
  }

  def.createExecutionSuiteBody = function (data) {
    this.initializeBody()
    this.initializePreview()

    if (data.test_cases) {
      this.testCases = data.test_cases.reduce(function (total, element) {
        total[element.id] = element

        return total
      }, {})
    }
    else {
      this.testCases = {}
    }

    this.statuses = data.execution_results
    this.selectedExecutionSuite = data.execution_suite

    var node = ExecutionSuiteBuilder.buildExecutionSuiteBody(data)

    this.body.appendChild(node)
    this.root.appendChild(this.body)
  }

  def.displayCasePreview = function (id) {
    this.initializePreview()

    this.preview = TestCasePreview.build(
      this.testCases[parseInt(id)],
      this.statuses
    )

    this.root.appendChild(this.preview)
  }

  def.initializePreview = function () {
    if (this.preview && this.preview.parentNode === this.root) {
      this.root.removeChild(this.preview)
    }
  }

  return self
})()
