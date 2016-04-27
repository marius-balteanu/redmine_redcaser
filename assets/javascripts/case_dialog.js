var CaseDialog = (function () {
  var self = {};

  // build :: -> DOM
  self.build = function () {
    var node = document.createElement('div');
    node.classList.add('case-dialog');

    node.appendChild(this.buildNameFields());
    node.appendChild(this.buildParentFields());

    return node;
  };

  // buildNameFields :: -> DOM
  self.buildNameFields = function () {
    var node = document.createElement('div');
    node.classList.add('case-dialog-name');

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
    node.classList.add('case-dialog-parent');

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
    var node = document.createElement('input');
    node.classList.add('parent-field');
    node.type = 'text'

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
  self.forCreate = function (dialog) {
    var object = $(dialog);

    object.parent().data('suite-id', null);

    object.dialog('option', 'title', 'Create Test Case');
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

  // forUpdate :: DOM, Integer
  self.forUpdate = function (dialog, id) {
    var object = $(dialog);

    object.parent().data('suite-id', id);

    object.dialog('option', 'title', 'Update Test Case');
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

  self.submitForCreate = function (event) {
    var data = this.gatherDataFrom(event.target);

    console.log(event);
    console.log('Create');

    var params = {
      id:   data.id,
      data: data.params,
      done: function () { console.log("Done!"); },
      fail: function () { console.log("Fail!"); }
    };

    Redcaser.api.testCases.create(params);
  }

  self.submitForUpdate = function (event) {
    var data = this.gatherDataFrom(event.target);

    console.log(event);
    console.log('Update');

    var params = {
      id:   data.id,
      data: data.params,
      done: function () { console.log("Done!"); },
      fail: function () { console.log("Fail!"); }
    };

    console.log(params);

    Redcaser.api.testCases.update(params);
  }

  // gatherDataFrom :: DOM -> Object
  self.gatherDataFrom = function (target) {
    var root = $(target).closest('.ui-dialog');

    return {
      id: root.data('.case-id'),
      params: {
        test_case: {
          test_suite_id: root.find('.parent-field').val(),
          issue: {
            subject: root.find('.name-field').val()
          }
        }
      }
    };
  };

  return self;
})();
