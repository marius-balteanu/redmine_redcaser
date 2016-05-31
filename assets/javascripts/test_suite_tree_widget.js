var Redcaser = Redcaser || {}

Redcaser.TestSuiteTreeWidget = (function () {
  'use strict'

  // self :: DOM
  var self = function (root) {
    this.root   = root
    this.header = this.buildHeader()
    this.body   = null

    this.root.appendChild(this.header)
    this.initialize()
  }

  var def = self.prototype

  def.initialize = function () {
    TreeEvents.attach(this)

    this.getTestSuiteData()
  }

  // buildHeader :: -> DOM
  def.buildHeader = function () {
    return DOMBuilder.div({
      classes:  ['tree-header'],
      children: [
        DOMBuilder.div({
          classes:  ['tree-actions'],
          children: [
            DOMBuilder.link({
              classes:  ['suite-create', 'icon', 'icon-add'],
              children: [DOMBuilder.text('Add test suite')]
            })
          ]
        })
      ]
    })
  }

  def.getTestSuiteData = function () {
    var params = {
      done: this.createTestSuiteTree.bind(this),
      fail: this.handleTestSuiteError.bind(this)
    }

    Redcaser.API.testSuites.index(params)
  }

  // createTestSuiteTree :: Object
  def.createTestSuiteTree = function (response) {
    this.initializeBody()

    var nodes = Redcaser.SuiteTreeBuilder.build(response)

    nodes.forEach(function (element) {
      this.body.appendChild(element)
    }.bind(this))

    this.root.appendChild(this.body)

    this.makeSuiteCasesSortable()
  }

  def.initializeBody = function () {
    if (this.body) {
      $('.suite-cases').sortable('destroy')
      this.root.removeChild(this.body)
    }

    this.body = document.createElement('div')
    this.body.classList.add('tree-body')
  }

  def.makeSuiteCasesSortable = function () {
    var cases = $('.suite-cases')

    cases.sortable({
      connectWith: '.suite-cases',
      handle:      '.case-drag',
      placeholder: 'suite-case-placeholder',
      update :     this.handleCaseMove.bind(this)
    })
  }

  // buildTestSuiteTree :: Object
  def.handleTestSuiteError = function (response) {
    console.log('Error!')
  }

  def.handleCaseMove = function (event, ui) {
    var toElement = event.toElement.parentNode
    // jQuery UI fires two events when moving an element from one container
    // to another. We need to handle the event from the new container.
    var isRightEvent = toElement.parentNode.parentNode === event.target

    if (isRightEvent) {
      var testCaseId  = toElement.parentNode.dataset.id
      var testSuiteId = event.target.parentNode.parentNode.dataset.id

      var data = {
        test_case: {
          test_suite_id: testSuiteId
        }
      }

      var params = {
        id:   testCaseId,
        data: data,
        done: function () {
          toElement.parentNode.getElementsByClassName('case-actions-edit')[0].dataset.test_suite_id = testSuiteId
        },
        fail: function () { console.log("Fail!") }
      }

      Redcaser.API.testCases.update(params)
    }
  }

  return self
})()
