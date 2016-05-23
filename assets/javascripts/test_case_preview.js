var Redcaser = Redcaser || {}

Redcaser.TestCasePreview = (function () {
  var self = {}

  // build :: Object -> DOM
  self.build = function (element, statuses) {
    var selectedId, testCaseStatusId

    if (element.status) {
      selectedId       = element.status.id
      testCaseStatusId = element.status.test_case_status_id
    }

    return DOMBuilder.div({
      classes:  ['case-preview'],
      children: [
        DOMBuilder.div({
          classes:  ['case-header'],
          children: [DOMBuilder.text(element.name)]
        }),
        DOMBuilder.div({
          classes:  ['case-body'],
          children: [
            DOMBuilder.div({
              classes:  ['case-preconditions'],
              children: [DOMBuilder.text('Preconditions: ' + element.preconditions)]
            }),
            DOMBuilder.div({
              classes:  ['case-steps'],
              children: [DOMBuilder.text('Steps: ' + element.steps)]
            }),
            DOMBuilder.div({
              classes:  ['case-expected'],
              children: [DOMBuilder.text('Expected results: ' + element.expected_results)]
            })
          ]
        }),
        DOMBuilder.div({
          classes:  ['case-footer'],
          children: [
            DOMBuilder.textInput({classes: ['case-footer-comment']}),
            DOMBuilder.select({
              classes:  ['case-footer-select'],
              children: DOMBuilder.options({
                data:       statuses,
                selected:   selectedId,
                valueField: 'id',
                textField:  'name'
              })
            }),
            DOMBuilder.submit({
              classes: ['case-footer-submit'],
              dataset: {
                id:                  element.id,
                test_case_status_id: testCaseStatusId
              }
            })
          ]
        })
      ]
    })
  }

  return self
})();
