var Redcaser = Redcaser || {}

Redcaser.TestCase = (function () {
  'use strict'

  // self :: Object
  var self = function (caseData) {
    this.node          = this.build(caseData)
    this.id            = caseData.id
    this.subject       = caseData.subject
    this.issue_id      = caseData.issue_id
    this.test_suite_id = caseData.test_suite_id
  }

  var def = self.prototype

  // build :: Object -> DOM
  def.build = function (element) {
    return DOMBuilder.tr({
      classes:  ['suite-case'],
      dataset:  {id: element.id},
      children: [
        DOMBuilder.td({
          classes:  ['drag'],
          children: [
            DOMBuilder.span({
              classes:  ['case-drag', 'sort-handle'],
            })
          ]
        }),
        DOMBuilder.td({
          classes:  ['checkbox'],
          children: [DOMBuilder.checkbox({classes: ['case-checkbox']})]
        }),
        DOMBuilder.td({
          classes:  ['case-id'],
          children: [DOMBuilder.text(element.issue_id)]
        }),
        DOMBuilder.td({
          classes:  ['case-link'],
          children: [
            DOMBuilder.link({
              href:    '/issues/' + element.issue_id,
              target:  '_blank',
              children: [DOMBuilder.text(element.subject)]
            })
          ]
        }),
        DOMBuilder.td({
          classes:  ['case-actions'],
          children: [
            DOMBuilder.link({
              classes:  ['case-actions-edit', 'icon', 'icon-edit'],
              href   :  "#",
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
