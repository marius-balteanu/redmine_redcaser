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
          // children: [DOMBuilder.text(element.name)]
          children: [
            DOMBuilder.span({
              children: [DOMBuilder.text(element.name)]
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
          classes:  ['suite-table'],
          children: [
            DOMBuilder.tr({
              classes:  ['suite-header'],
              children: [
                DOMBuilder.th({
                  children: [DOMBuilder.text('')]
                }),
                DOMBuilder.th({
                  classes:  ['suite-check'],
                  //children: [DOMBuilder.checkbox({classes: ['suite-checkbox']})]
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
                  //children: [DOMBuilder.text('Title')]
                })
              ]
            }),
            DOMBuilder.tbody({
              classes:  ['suite-cases'],
              children: [
                DOMBuilder.tr({
                  classes:  ['sort-disabled'],
                  children: [DOMBuilder.td()]
                })
              ]
            })
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
