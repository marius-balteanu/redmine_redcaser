var Redcaser = Redcaser || {};

Redcaser.ExecutionDialog = (function () {
  var TestCaseSelector    = Redcaser.TestCaseSelector;
  var EnvironmentSelector = Redcaser.EnvironmentSelector;

  var self = {};

  // build :: -> DOM
  self.build = function () {
    var node = document.createElement('div');
    node.classList.add('execution-dialog');

    node.appendChild(this.buildNameFields());
    node.appendChild(this.buildVersionFields());
    node.appendChild(this.buildEnvironmentFields());
    node.appendChild(this.buildQueriesFields());

    return node;
  };

  // buildNameFields :: -> DOM
  self.buildNameFields = function () {
    var node = document.createElement('div');
    node.classList.add('execution-dialog-name');

    node.appendChild(this.buildNameLabel());
    node.appendChild(this.buildNameInput());

    return node;
  };

  // buildNameLabel :: -> DOM
  self.buildNameLabel = function () {
    var node = document.createElement('label');

    var text = document.createTextNode('Name');
    node.appendChild(text);

    return node;
  };

  // buildNameInput :: -> DOM
  self.buildNameInput = function () {
    var node  = document.createElement('input');
    node.classList.add('name-field');
    node.type = 'text'

    return node;
  };

  // buildVersionFields :: -> DOM
  self.buildVersionFields = function () {
    var node = document.createElement('div');
    node.classList.add('execution-dialog-version');

    node.appendChild(this.buildVersionLabel());
    node.appendChild(this.buildVersionInput());

    return node;
  };

  // buildVersionLabel :: -> DOM
  self.buildVersionLabel = function () {
    var node = document.createElement('label');

    var text = document.createTextNode('Version');
    node.appendChild(text);

    return node;
  };

  // buildVersionInput :: -> DOM
  self.buildVersionInput = function () {
    var node = document.createElement('select');
    node.classList.add('version-field');

    return node;
  };

  // buildEnvironmentFields :: -> DOM
  self.buildEnvironmentFields = function () {
    var node = document.createElement('div');
    node.classList.add('execution-dialog-environment');

    node.appendChild(this.buildEnvironmentLabel());
    node.appendChild(this.buildEnvironmentInput());
    node.appendChild(this.buildEnvironmentAddButton());

    return node;
  };

  // buildEnvironmentLabel :: -> DOM
  self.buildEnvironmentLabel = function () {
    var node = document.createElement('label');

    node.appendChild(document.createTextNode('Environment'));

    return node;
  };

  // buildEnvironmentAddButton :: -> DOM
  self.buildEnvironmentAddButton = function () {
    var node = document.createElement('a');
    node.classList.add('environment-create');
    node.href = '#';

    var text = document.createTextNode('Add environment');
    node.appendChild(text);

    return node;
  };

  // buildEnvironmentInput :: -> DOM
  self.buildEnvironmentInput = function () {
    var node = document.createElement('select');
    node.classList.add('environment-field');

    return node;
  };

  // buildQueriesFields :: -> DOM
  self.buildQueriesFields = function () {
    var node = document.createElement('div');
    node.classList.add('execution-dialog-queries');

    return node;
  };

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
  self.forCreate = function (dialog, target, data) {
    var object, select;

    object = $(dialog);

    object.parent().data('execution-id', null);
    $('.name-field').val('');

    select = $('.version-field');
    select.empty();

    data.versions.forEach(function (element) {
      select.append('<option value="' + element.id + '">' + element.name + '</option>');
    }.bind(this));

    select = $('.environment-field');
    select.empty();

    var environmentSelector = EnvironmentSelector(data.environments, execution_suite);
    select.append(environmentSelector.root);

    select = $('.execution-dialog-queries');
    select.empty();

    var testCaseSelector = new TestCaseSelector(data.queries);

    select.append(testCaseSelector.root);

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
  self.forUpdate = function (dialog, target, data) {
    var object = $(dialog);
    var id       = target.dataset.id;

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

    select = $('.environment-field');
    select.empty();

    var environmentSelector = EnvironmentSelector(data.environments, execution_suite);
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
          environment_id: root.find('.environment-field').val(),
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
