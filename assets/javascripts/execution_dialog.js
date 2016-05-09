var Redcaser = Redcaser || {};

Redcaser.ExecutionDialog = (function () {
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

    return node;
  };

  // buildEnvironmentLabel :: -> DOM
  self.buildEnvironmentLabel = function () {
    var node = document.createElement('label');

    var text = document.createTextNode('Environment');
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

    node.appendChild(this.buildQueriesLabel());
    node.appendChild(this.buildQueriesInput());

    return node;
  };

  // buildQueriesLabel :: -> DOM
  self.buildQueriesLabel = function () {
    var node = document.createElement('label');

    var text = document.createTextNode('Queries');
    node.appendChild(text);

    return node;
  };

  // buildQueriesInput :: -> DOM
  self.buildQueriesInput = function () {
    var node = document.createElement('select');
    node.classList.add('queries-field');

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
    var object = $(dialog);

    $('.name-field').val('');

    // var select = $('.version-field');
    // select.empty();
    //
    // select.append('<option value=""></option>');
    // data.execution_suites.forEach(function (element) {
    //   if (element.id == 0) {
    //     select.append('<option value="' + element.id + '" selected="selected">' + element.name + '</option>');
    //   }
    //   else {
    //     select.append('<option value="' + element.id + '">' + element.name + '</option>');
    //   }
    // }.bind(this));

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

    $('.name-field').val(data.test_suite.name);

    // var select = $('.parent-field');
    // select.empty();
    //
    // select.append('<option value=""></option>');
    // data.test_suites.forEach(function (element) {
    //   if (element.id == 0) {
    //     select.append('<option value="' + element.id + '" selected="selected">' + element.name + '</option>');
    //   }
    //   else {
    //     select.append('<option value="' + element.id + '">' + element.name + '</option>');
    //   }
    // }.bind(this));


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
      fail: function () { console.log('Fail!'); }
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
      fail: function () { console.log('Fail!'); }
    };

    console.log(params);

    Redcaser.API.executionSuites.update(params);
  }

  // gatherDataFrom :: DOM -> Object
  self.gatherDataFrom = function (target) {
    var root = $(target).closest('.ui-dialog');

    return {
      id: root.data('execution-id'),
      params: {
        execution_suite: {
          name:       root.find('.name-field').val(),
          version_id: root.find('.version-field').val()
        }
      }
    };
  };

  return self;
})();
