var Redcaser = Redcaser || {};

Redcaser.ExecutionDialog = (function () {
  var TestCaseSelector    = Redcaser.TestCaseSelector;
  var EnvironmentSelector = Redcaser.EnvironmentSelector;

  var self = {};

  // build :: -> DOM
  self.build = function () {
    return DOMBuilder.div({
      classes:  ['execution-dialog'],
      children: [
        DOMBuilder.div({
          classes:  ['execution-dialog-name'],
          children: [
            DOMBuilder.label({children: [DOMBuilder.text('Name')]}),
            DOMBuilder.textInput({classes: ['name-field']})
          ]
        }),
        DOMBuilder.div({
          classes:  ['execution-dialog-version'],
          children: [
            DOMBuilder.label({children: [DOMBuilder.text('Version')]}),
            DOMBuilder.select({classes: ['version-field']})
          ]
        }),
        DOMBuilder.div({classes: ['execution-dialog-environment']}),
        DOMBuilder.div({classes: ['execution-dialog-queries']})
      ]
    })
  }

  self.initialize = function (dialog) {
    var params = {
      autoOpen: false,
      height:   300,
      width:    350,
      modal:    true
    };

    $(dialog).dialog(params);
  };

  // forCreate :: DOM
  self.forCreate = function (target, data) {
    var object, child;

    object = $(Redcaser.executionEditDialog);

    object.parent().data('execution-id', null);
    $('.name-field').val('');

    child = $('.version-field');
    child.empty();

    data.versions.forEach(function (element) {
      child.append('<option value="' + element.id + '">' + element.name + '</option>');
    }.bind(this));

    child = $('.execution-dialog-environment');
    child.empty();

    var environmentSelector = new EnvironmentSelector(data.environments);
    child.append(environmentSelector.root);

    child = $('.execution-dialog-queries');
    child.empty();

    var testCaseSelector = new TestCaseSelector(data.queries);
    child.append(testCaseSelector.root);

    object.dialog('option', 'title', 'Create Execution Suite');
    object.dialog(
      'option',
      'buttons',
      [{
        class: 'execution-submit',
        text:  'OK',
        click: this.submitForCreate.bind(this)
      }]
    );
    object.dialog('open');
  };

  // forUpdate :: DOM
  self.forUpdate = function (target, data) {
    var object = $(Redcaser.executionEditDialog);
    var id     = target.dataset.id;

    var execution_suite = data.execution_suite;

    object.parent().data('execution-id', execution_suite.id);
    $('.name-field').val(execution_suite.name);

    select = $('.version-field');
    select.empty();

    data.versions.forEach(function (element) {
      if (element.id == execution_suite.version_id) {
        select.append('<option value="' + element.id + '" selected="selected">' + element.name + '</option>');
      }
      else {
        select.append('<option value="' + element.id + '">' + element.name + '</option>');
      }
    }.bind(this));

    select = $('.execution-dialog-environment');
    select.empty();

    var environmentSelector = new EnvironmentSelector(data.environments, data.execution_suite);
    select.append(environmentSelector.root);

    select = $('.execution-dialog-queries');
    select.empty();

    var testCaseSelector = new TestCaseSelector(data.queries, execution_suite);
    testCaseSelector.getTestCaseList(execution_suite.query_id);

    select.append(testCaseSelector.root);

    object.dialog('option', 'title', 'Update Execution Suite');
    object.dialog(
      'option',
      'buttons',
      [{
        class: 'execution-submit',
        text:  'OK',
        click: this.submitForUpdate.bind(this)
      }]
    );
    object.dialog('open');
  };

  //submitForCreate :: Event
  self.submitForCreate = function (event) {
    var data = this.gatherDataFrom(event.target);

    console.log(event);
    console.log('Create');

    var params = {
      data: data.params,
      done: function () { location.reload(true); },
      fail: function (response) { console.log(response); }
    };

    console.log(params);

    Redcaser.API.executionSuites.create(params);
  }

  // submitForUpdate :: Event
  self.submitForUpdate = function (event) {
    var data = this.gatherDataFrom(event.target);

    console.log(event);
    console.log('Update');

    var params = {
      id:   data.id,
      data: data.params,
      done: function () { location.reload(true); },
      fail: function (response) { console.log(response); }
    };

    console.log(params);

    Redcaser.API.executionSuites.update(params);
  }

  // gatherDataFrom :: DOM -> Object
  self.gatherDataFrom = function (target) {
    var root = $(target).closest('.ui-dialog');

    var testCases = root
      .find('.case-element input:checked')
      .map(function (index, element) { return element.value; })
      .get();

    return {
      id: root.data('execution-id'),
      params: {
        execution_suite: {
          environment_id: root.find('.environment-select').val(),
          name:           root.find('.name-field').val(),
          query_id:       root.find('.queries-select').val(),
          test_cases:     testCases,
          version_id:     root.find('.version-field').val()
        }
      }
    };
  };

  return self;
})();
