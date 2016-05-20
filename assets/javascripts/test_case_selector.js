var Redcaser = Redcaser || {};

Redcaser.TestCaseSelector = (function () {
  'use strict';

  var TestCaseSelectorEvents = Redcaser.TestCaseSelectorEvents;

  var self = function (queries, executionSuite) {
    var selectedId = executionSuite ? executionSuite.query_id : null;

    this.root = self.build(queries, selectedId);
    this.caseContainer = null;
    this.executionSuite = executionSuite;

    this.testCases = {};

    this.addEventHandlers();
  };

  var def = self.prototype;

  self.build = function (data, selectedId) {
    return DOMBuilder.div({
      children: [
        DOMBuilder.label({children: [DOMBuilder.text('Queiries')]}),
        DOMBuilder.select({
          classes:  ['queries-select'],
          children: DOMBuilder.options({
            data:         data,
            includeBlank: true,
            selected:     selectedId,
            valueField:   'id',
            textField:    'name'
          })
        })
      ]
    })
  }

  self.buildCaseList = function (data, selected) {
    return DOMBuilder.div({
      classes:  ['case-list'],
      children: data.map(function (element) {
        return DOMBuilder.div({
          classes:  ['case-element'],
          children: [
            DOMBuilder.checkbox({
              value:   element.id,
              checked: selected.includes(element.id)
            }),
            DOMBuilder.text(element.name)
          ]
        })
      })
    })
  }

  def.addEventHandlers = function () {
    TestCaseSelectorEvents.attach(this);
  };

  def.getTestCaseList = function (id) {
    var executionId = this.executionSuite ? this.executionSuite.id : null;

    if (id) {
      var params = {
        id:   id,
        data: {execution_suite_id: executionId},
        done: this.displayTestCases.bind(this),
        fail: function (response) { console.log(response); }
      };

      Redcaser.API.queryTestCases.show(params);
    }
    else {
      this.root.removeChild(this.caseContainer);
    }
  };

  def.displayTestCases = function (response) {
    if (this.caseContainer && this.caseContainer.parentNode === this.root) {
      this.root.removeChild(this.caseContainer);
    }

    this.testCases = response.test_cases;

    this.caseContainer = self.buildCaseList(this.testCases, response.selected)

    this.root.appendChild(this.caseContainer);
  };

  return self;
})();
