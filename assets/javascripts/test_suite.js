var Redcaser = Redcaser || {}

Redcaser.TestSuite = (function () {
  'use strict'

  // self :: Object
  var self = function (data) {
    this.id       = data.id
    this.name     = data.name
    this.node     = data.node
    this.children = data.children
  }

  // build :: Object, Object -> DOM
  self.build = function (element, data) {
    return DOMBuilder.div({
      classes:  ['tree-suite'],
      dataset:  {id: element.id},
      children: [
        DOMBuilder.div({
          classes:  ['suite-title'],
          children: [DOMBuilder.text(element.name)]
        }),
        DOMBuilder.div({
          classes:  ['suite-table'],
          children: [
            DOMBuilder.div({
              classes:  ['suite-header'],
              children: [
                DOMBuilder.span({
                  classes:  ['suite-drag'],
                  children: [DOMBuilder.text('D')]
                }),
                DOMBuilder.span({
                  classes:  ['suite-check'],
                  children: [DOMBuilder.checkbox({classes: ['suite-checkbox']})]
                }),
                DOMBuilder.span({
                  classes:  ['suite-id'],
                  children: [DOMBuilder.text('ID')]
                }),
                DOMBuilder.span({
                  classes:  ['suite-link'],
                  children: [DOMBuilder.text('Title')]
                }),
                DOMBuilder.span({
                  classes:  ['suite-actions'],
                  children: [
                    DOMBuilder.button({
                      classes:  ['suite-actions-edit'],
                      dataset:  {id: element.id, parent_id: element.parent_id},
                      children: [DOMBuilder.text('Edit')]
                    }),
                    DOMBuilder.button({
                      classes:  ['suite-actions-delete'],
                      dataset:  {id: element.id},
                      children: [DOMBuilder.text('Delete')]
                    })
                  ]
                })
              ]
            }),
            DOMBuilder.div({classes: ['suite-cases']})
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
        DOMBuilder.div({classes: ['suite-children']})
      ]
    })
  }

  return self
})()
