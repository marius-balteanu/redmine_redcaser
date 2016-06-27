var Redcaser = Redcaser || {}

Redcaser.TestCasePreview = (function () {
  var self = {}

  // build :: Object -> DOM
  self.build = function (element, journals, statuses) {
    var selectedId, testCaseStatusId

    if (element.status) {
      selectedId       = element.status.id
      testCaseStatusId = element.status.test_case_status_id
    }

    var node = DOMBuilder.div({
      classes:  ['case-preview', 'box'],
      children: [
        DOMBuilder.div({
          classes:  ['case-header'],
          children: [DOMBuilder.span({
            children: [ DOMBuilder.text("#" + element.issue_id + ": " + element.subject) ]
          })]
        }),
        DOMBuilder.div({
          classes:  ['case-body'],
          children: [
            DOMBuilder.div({
              classes:  ['attributes']
            }),
            DOMBuilder.div({
              classes:  ['case-preconditions'],
              children: [
                DOMBuilder.p({
                  classes:  ['section'],
                  children: [DOMBuilder.text('Preconditions:')]
                }),
                DOMBuilder.div({
                    classes: ['wiki'],
                    insertHTML: ['afterbegin', element.preconditions]
                })
              ]
            }),
            DOMBuilder.div({
              classes:  ['case-steps'],
              children: [
                DOMBuilder.p({
                  classes:  ['section'],
                  children: [DOMBuilder.text('Steps:')]
                }),
                DOMBuilder.div({
                    classes: ['wiki'],
                    insertHTML: ['afterbegin', element.steps]
                })
              ]
            }),
            DOMBuilder.div({
              classes:  ['case-expected'],
              children: [
                DOMBuilder.p({
                  classes:  ['section'],
                  children: [DOMBuilder.text('Expected result:')]
                }),
                DOMBuilder.div({
                    classes: ['wiki'],
                    insertHTML: ['afterbegin', element.expected_results]
                })
              ]
            })
          ]
        }),
        DOMBuilder.div({
          classes:  ['case-footer'],
          children: [
            DOMBuilder.div({
              classes: ['tabs'],
              children: [
                DOMBuilder.ul ({
                  classes: [],
                  children: [
                    DOMBuilder.li ({
                      children: [
                        DOMBuilder.link({
                          classes:  ['selected','execution-tab'],
                          href:     '#',
                          dataset:  { tab: "results" },
                          children: [DOMBuilder.text('Results & History')]
                        })
                      ]
                    }),
                    DOMBuilder.li ({
                      children: [
                        DOMBuilder.link({
                          href:     '#',
                          classes:  ['execution-tab'],
                          dataset:  { tab: "related" },
                          children: [DOMBuilder.text('Related Issues')]
                        })
                      ]
                    })
                  ]
                })
              ]
            }),
            DOMBuilder.div({
              classes: ['tab-results', 'tab-content'],
              children: [
                DOMBuilder.textarea({classes: ['case-footer-comment']}),
                DOMBuilder.select({
                  classes: element.status ? ['case-footer-select', element.status.name.split(" ").join("_").toLowerCase()] : ['case-footer-select'],
                  children: DOMBuilder.options({
                    blankOption:  DOMBuilder.option({value: ' ', children: [DOMBuilder.text('Not run')]}),
                    data:         statuses,
                    includeBlank: element.status ? false : true,
                    selected:     selectedId,
                    valueField:   'id',
                    textField:    'name'
                  })
                }),
                DOMBuilder.button({
                  classes: ['case-footer-submit'],
                  dataset: {
                    id:                  element.id,
                    test_case_status_id: testCaseStatusId
                  },
                  children: [DOMBuilder.text('Submit')]
                })
              ]
            }),
            DOMBuilder.div({
              classes: ['tab-related', 'hidden', 'tab-content']
            })
          ]
        }),
      ]
    })

    var relatedNode = DOMBuilder.div({
      children: [
        DOMBuilder.select({
          classes:  ['case-footer-related-select'],
          children: DOMBuilder.options({
            data:   [
              {value: 'relates', text: 'Related to'},
              {value: 'blocked', text: 'Blocked by'}
            ],
            includeBlank: true
          })
        }),
        DOMBuilder.button({
          classes:  ['case-footer-related-submit'],
          dataset:  {
            id:                  element.id,
            test_case_status_id: testCaseStatusId
          },
          children: [DOMBuilder.text('Create related issue')]
        })
      ]
    })

    if (element.status) {
      node.getElementsByClassName("tab-results")[0].appendChild(relatedNode)
    }

    return node
  }

  return self
})();
