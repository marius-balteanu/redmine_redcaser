var Redcaser = Redcaser || {}

Redcaser.TestCase = (function () {
  'use strict'

  // self :: Object
  var self = function (data) {
    this.id         = data.id
    this.parent_id  = data.parent_id
    this.project_id = data.project_id
    this.issue_id   = data.issue_id
    this.node       = data.node
  };

  // build :: Object -> DOM
  self.build = function (element) {
    return DOMBuilder.tr({
      classes:  ['suite-case'],
      dataset:  {id: element.id},
      children: [
        DOMBuilder.td({
          classes:  ['case-drag', 'sort-handle'],
          children: [DOMBuilder.text('')]
        }),
        DOMBuilder.td({
          classes:  ['case-check'],
          children: [DOMBuilder.checkbox({classes: ['case-checkbox']})]
        }),
        DOMBuilder.td({
          classes:  ['case-id'],
          children: [DOMBuilder.text(element.id)]
        }),
        DOMBuilder.td({
          classes:  ['case-link'],
          children: [
            DOMBuilder.link({
              href:    '/issues/' + element.issue_id,
              target:  '_blank',
              children: [DOMBuilder.text(element.name)]
            })
          ]
        }),
        DOMBuilder.td({
          classes:  ['case-actions'],
          children: [
            DOMBuilder.button({
              classes:  ['case-actions-edit'],
              dataset:  {
                issue_id:      element.issue_id,
                test_suite_id: element.test_suite_id
              },
              children: [DOMBuilder.text('Edit')]
            })
          ]
        })
      ]
    })
  }

  return self
})()
