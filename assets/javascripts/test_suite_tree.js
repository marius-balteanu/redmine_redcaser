var Redcaser = Redcaser || {}

Redcaser.TestSuiteTree = (function () {
  'use strict'

  // self :: DOM
  var self = function (root) {
    this.root = root
    this.tree = this.build()

    this.root.appendChild(this.tree)

    this.getTestSuiteData()

    TreeEvents.attach(this)
  }

  var def = self.prototype

  // build :: -> DOM
  def.build = function () {
    this.header = DOMBuilder.div({
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

    this.body = DOMBuilder.div({classes:  ['tree-body']})

    return DOMBuilder.div({
      classes:  ['tree-root'],
      children: [this.header, this.body]
    })
  }

  // buildTree :: Object -> DOM
  def.buildTree = function (data) {
    var nodes = []

    var elements = data.test_suites

    elements.forEach(function (element) {
      nodes.push(this.buildNode(element, data))
    }.bind(this))

    return nodes
  }

  def.buildNode = function (element, data) {
    var type = element.type
    var node, suiteCases, suiteChildren

    if (type === 'suite') {
      node = Redcaser.TestSuite.build(element, data)

      suiteCases    = node.getElementsByClassName('suite-cases')[0]
      suiteChildren = node.getElementsByClassName('suite-children')[0]

      element.children.forEach(function (child) {
        var childNode = this.buildNode(child, data)

        if (child.type === 'suite') {
          suiteChildren.appendChild(childNode)
        }
        else if (child.type === 'case') {
          suiteCases.appendChild(childNode)
        }
        else {
          console.log('Bad Child data:')
          console.log(child)
        }
      }.bind(this))
    }
    else if (type === 'case') {
      node = Redcaser.TestCase.build(element)
    }
    else {
      console.log('Bad Node data:')
      console.log(element)
    }

    return node
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
    var nodes = this.buildTree(response)

    nodes.forEach(function (element) {
      this.body.appendChild(element)
    }.bind(this))

    this.makeSuiteCasesSortable()
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
