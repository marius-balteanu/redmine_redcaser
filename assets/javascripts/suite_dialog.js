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
    var node = document.createElement('input');
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

  self.forCreate = function (dialog) {
    var object = $(dialog);

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

  self.forUpdate = function (dialog) {
    var object = $(dialog);

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

  self.submitForCreate = function (event) {
    console.log('Create');
  }

  self.submitForUpdate = function (event) {
    console.log('Update');
  }

  return self;
})();
