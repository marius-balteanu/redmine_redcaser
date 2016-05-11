var Redcaser = Redcaser || {};

Redcaser.EnvironmentDialog = (function () {
  var self = {};

  // build :: -> DOM
  self.build = function () {
    var node = document.createElement('div');
    node.classList.add('environment-dialog');

    node.appendChild(this.buildNameFields());

    return node;
  };

  // buildNameFields :: -> DOM
  self.buildNameFields = function () {
    var node = document.createElement('div');
    node.classList.add('environment-dialog-name');

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

    object.dialog('option', 'title', 'Create Environment');
    object.dialog(
      'option',
      'buttons',
      [{
        class: 'environment-submit',
        text:  'OK',
        click: this.submitForCreate.bind(this)
      }]
    );
    object.dialog('open');
  };

  // forUpdate :: DOM
  self.forUpdate = function (dialog, target, data) {
    var object = $(dialog);
    var id     = target.dataset.id;

    $('.name-field').val(data.environment.name);

    object.dialog('option', 'title', 'Update Environment');
    object.dialog(
      'option',
      'buttons',
      [{
        class: 'environment-submit',
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

    Redcaser.API.environments.create(params);
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

    Redcaser.API.environments.update(params);
  }

  // gatherDataFrom :: DOM -> Object
  self.gatherDataFrom = function (target) {
    var root = $(target).closest('.ui-dialog');

    return {
      id: root.data('environment-id'),
      params: {
        environment: {
          name: root.find('.name-field').val(),
        }
      }
    };
  };

  return self;
})();
