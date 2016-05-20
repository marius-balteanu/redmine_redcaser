var Redcaser = Redcaser || {}

Redcaser.EnvironmentDialog = (function () {
  var self = {}

  // build :: -> DOM
  self.build = function () {
    return DOMBuilder.div({
      classes:  ['environment-dialog'],
      children: [
        DOMBuilder.div({
          classes:  ['environment-dialog-name'],
          children: [
            DOMBuilder.label({children: [DOMBuilder.text('Name')]}),
            DOMBuilder.textInput({classes: ['name-field']})
          ]
        })
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
    var object = $(Redcaser.environmentEditDialog);

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
  self.forUpdate = function (target, data) {
    var object = $(Redcaser.environmentEditDialog);
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

    var params = {
      data: data.params,
      done: function () { location.reload(true); },
      fail: function (response) { console.log(response); }
    };

    Redcaser.API.environments.create(params);
  }

  // submitForUpdate :: Event
  self.submitForUpdate = function (event) {
    var data = this.gatherDataFrom(event.target);

    var params = {
      id:   data.id,
      data: data.params,
      done: function () { location.reload(true); },
      fail: function (response) { console.log(response); }
    };

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
