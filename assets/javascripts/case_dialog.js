var CaseDialog = (function () {
  var self = {};

  // build :: -> DOM
  self.build = function () {
    var node = document.createElement('div');
    node.classList.add('case-dialog');

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

  self.forCreate = function (dialog) {
    var object = $(dialog);

    object.dialog('option', 'title', 'Create Test Case');
    object.dialog('open');
  };

  self.forUpdate = function (dialog) {
    var object = $(dialog);

    object.dialog('option', 'title', 'Update Test Case');
    object.dialog('open');
  };


  return self;
})();
