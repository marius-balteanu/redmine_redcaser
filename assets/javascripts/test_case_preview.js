var Redcaser = Redcaser || {}

Redcaser.TestCasePreview = (function () {
  var self = {}

  var m = DOMBuilder

  // build :: Object -> DOM
  self.build = function (element, journals, statuses) {
    var selectedId, testCaseStatusId

    if (element.status) {
      selectedId       = element.status.id
      testCaseStatusId = element.status.test_case_status_id
    }

    var node = m.div({
      classes:  ['case-preview', 'box'],
      children: [
        m.div({
          classes:  ['case-header'],
          children: [
            m.span({
              children: [
                m.text("#" + element.issue_id + ": " + element.subject)
              ]
            }
          )]
        }),
        m.div({
          classes:  ['case-body'],
          children: [
            m.div({
              classes:  ['attributes']
            }),
            m.div({
              classes:  ['case-preconditions'],
              children: [
                m.p({
                  classes:  ['section'],
                  children: [m.text('Preconditions:')]
                }),
                m.div({
                    classes:    ['wiki'],
                    insertHTML: ['afterbegin', element.preconditions]
                })
              ]
            }),
            m.div({
              classes:  ['case-steps'],
              children: [
                m.p({
                  classes:  ['section'],
                  children: [m.text('Steps:')]
                }),
                m.div({
                    classes:    ['wiki'],
                    insertHTML: ['afterbegin', element.steps]
                })
              ]
            }),
            m.div({
              classes:  ['case-expected'],
              children: [
                m.p({
                  classes:  ['section'],
                  children: [m.text('Expected result:')]
                }),
                m.div({
                    classes:    ['wiki'],
                    insertHTML: ['afterbegin', element.expected_results]
                })
              ]
            })
          ]
        }),
        m.div({
          classes:  ['case-footer'],
          children: [
            m.div({
              classes: ['tabs'],
              children: [
                m.ul ({
                  classes: [],
                  children: [
                    m.li ({
                      children: [
                        m.link({
                          classes:  ['selected','execution-tab'],
                          href:     '#',
                          dataset:  { tab: "results" },
                          children: [m.text('Results & History')]
                        })
                      ]
                    }),
                    m.li ({
                      children: [
                        m.link({
                          href:     '#',
                          classes:  ['execution-tab'],
                          dataset:  { tab: "related" },
                          children: [m.text('Related Issues')]
                        })
                      ]
                    })
                  ]
                })
              ]
            }),
            m.div({
              classes: ['tab-results', 'tab-content'],
              children: [
                m.textarea({classes: ['case-footer-comment']}),
                m.select({
                  classes: element.status ? ['case-footer-select', element.status.name.split(" ").join("_").toLowerCase()] : ['case-footer-select'],
                  children: m.options({
                    blankOption:  m.option({value: ' ', children: [m.text('Not run')]}),
                    data:         statuses,
                    includeBlank: element.status ? false : true,
                    selected:     selectedId,
                    valueField:   'id',
                    textField:    'name'
                  })
                }),
                m.button({
                  classes: ['case-footer-submit'],
                  dataset: {
                    id:                  element.id,
                    test_case_status_id: testCaseStatusId
                  },
                  children: [m.text('Submit')]
                })
              ]
            }),
            m.div({
              classes: ['tab-related', 'hidden', 'tab-content']
            })
          ]
        }),
      ]
    })

    var relatedNode = m.div({
      children: [
        m.select({
          classes:  ['case-footer-related-select'],
          children: m.options({
            data:   [
              {value: 'relates', text: 'Related to'},
              {value: 'blocked', text: 'Blocked by'}
            ],
            includeBlank: true
          })
        }),
        m.button({
          classes:  ['case-footer-related-submit'],
          dataset:  {
            id:                  element.id,
            test_case_status_id: testCaseStatusId
          },
          children: [m.text('Create related issue')]
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
