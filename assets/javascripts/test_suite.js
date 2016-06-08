var Redcaser = Redcaser || {}

Redcaser.TestSuite = (function () {
  'use strict'

  // self :: Object
  var self = function (suiteData, requestData) {
    this.fields     = {}
    this.node       = this.build(suiteData, requestData)
    this.id         = suiteData.id
    this.name       = suiteData.name
    this.parent_id  = suiteData.parent_id
    this.testSuites = []
    this.testCases  = []
  }

  var def = self.prototype

  // build :: Object, Object -> DOM
  def.build = function (element, data) {
    this.childSuitesNode = DOMBuilder.div({classes: ['suite-children']})
    this.sortDisabled    = DOMBuilder.tr({
      classes:  ['sort-disabled'],
      children: [
        DOMBuilder.td({
          colSpan:  '5',
          children: [DOMBuilder.text('There are no test cases added to this suite')]
        })
      ]
    })
    this.childCasesNode  = DOMBuilder.tbody({
      classes:  ['suite-cases'],
      children: [this.sortDisabled]
    })
    this.fields.name = DOMBuilder.text(element.name)

    return DOMBuilder.div({
      classes:  ['tree-suite'],
      dataset:  {id: element.id},
      children: [
        DOMBuilder.div({
          classes:  ['suite-title'],
          children: [
            DOMBuilder.span({
              children: [this.fields.name]
            }),
            DOMBuilder.span({
              classes:  ['suite-actions'],
              children: [
                DOMBuilder.link({
                  classes:  ['suite-actions-edit', 'icon-only', 'icon-edit'],
                  href:     '#',
                  title:    'Edit Suite',
                  dataset:  {id: element.id, parent_id: element.parent_id},
                  children: [DOMBuilder.text('Edit')]
                }),
                DOMBuilder.link({
                  classes:  ['suite-actions-delete', 'icon-only', 'icon-del'],
                  href:     '#',
                  title:    'Delete Suite',
                  dataset:  {id: element.id},
                  children: [DOMBuilder.text('Delete')]
                })
              ]
            }),
          ]
        }),
        DOMBuilder.table({
          classes:  ['suite-table', 'list', 'test-cases'],
          children: [
            DOMBuilder.tr({
              classes:  ['suite-header'],
              children: [
                DOMBuilder.th({
                  classes:  ['drag'],
                  children: [DOMBuilder.text('')]
                }),
                DOMBuilder.th({
                  classes:  ['checkbox'],
                }),
                DOMBuilder.th({
                  classes:  ['suite-id'],
                  children: [DOMBuilder.text('ID')]
                }),
                DOMBuilder.th({
                  classes:  ['suite-link'],
                  children: [DOMBuilder.text('Title')]
                }),
                DOMBuilder.th({
                  classes:  ['suite-actions'],
                })
              ]
            }),
            this.childCasesNode
          ]
        }),
        DOMBuilder.div({
          classes:  ['suite-footer'],
          children: [
            DOMBuilder.link({
              children: [DOMBuilder.text('Add test case')],
              href:     '/projects/'
                + data.project.identifier
                + '/issues/new/?issue[tracker_id]='
                + Redcaser.tracker_id
                + '&test_suite[id]='
                + element.id,
              target: '_blank'
            }),
            DOMBuilder.text(' | '),
            DOMBuilder.link({
              classes:  ['suite-create'],
              dataset:  {parent_id: element.id},
              href:     '#',
              children: [DOMBuilder.text('Add test suite')]
            })
          ]
        }),
        this.childSuitesNode
      ]
    })
  }

  return self
})()
