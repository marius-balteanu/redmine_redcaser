var SuiteDialog = (function () {
  var self = {};

  // build :: -> DOM
  self.build = function () {
    var node = document.createElement('div');
    node.classList.add('suite-dialog');

    node.appendChild(this.buildNameFields());
    node.appendChild(this.buildParentFields());

    return node;
  };

  // buildNameFields :: -> DOM
  self.buildNameFields = function () {
    var node = document.createElement('div');
    node.classList.add('suite-dialog-name');

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
  }

  // buildNameInput :: -> DOM
  self.buildNameInput = function () {
    var node  = document.createElement('input');
    node.classList.add('name-field');
    node.type = 'text'

    return node;
  }

  // buildParentFields :: -> DOM
  self.buildParentFields = function () {
    var node = document.createElement('div');
    node.classList.add('suite-dialog-parent');

    node.appendChild(this.buildParentLabel());
    node.appendChild(this.buildParentInput());

    return node;
  };

  // buildParentLabel :: -> DOM
  self.buildParentLabel = function () {
    var node = document.createElement('label');

    var text = document.createTextNode('Parent');
    node.appendChild(text);

    return node;
  }

  // buildParentInput :: -> DOM
  self.buildParentInput = function () {
    var node = document.createElement('select');
    node.classList.add('parent-field');

    return node;
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
  self.forCreate = function (dialog, data) {
    var object = $(dialog);

    object.parent().data('suite-id', null);

    var select = $('.parent-field');
    select.empty();

    select.append('<option value=""></option>');
    data.test_suites.forEach(function (element) {
      select.append('<option value="' + element.id + '">' + element.name + '</option>');
    }.bind(this));

    object.dialog('option', 'title', 'Create Test Suite');
    object.dialog(
      'option',
      'buttons',
      [{
        class: 'suite-submit',
        text:  'OK',
        click: this.submitForCreate.bind(this)
      }]
    );
    object.dialog('open');
  };

  // forUpdate :: DOM
  self.forUpdate = function (dialog, id) {
    var object = $(dialog);

    object.parent().data('suite-id', id);

    object.dialog('option', 'title', 'Update Test Suite');
    object.dialog(
      'option',
      'buttons',
      [{
        class: 'suite-submit',
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
      fail: function () { console.log("Fail!"); }
    };

    console.log(params);

    Redcaser.API.testSuites.create(params);
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
      fail: function () { console.log("Fail!"); }
    };

    console.log(params);

    Redcaser.API.testSuites.update(params);
  }

  // gatherDataFrom :: DOM -> Object
  self.gatherDataFrom = function (target) {
    var root = $(target).closest('.ui-dialog');

    return {
      id: root.data('suite-id'),
      params: {
        test_suite: {
          name:      root.find('.name-field').val(),
          parent_id: root.find('.parent-field').val()
        }
      }
    };
  };

  return self;
})();
