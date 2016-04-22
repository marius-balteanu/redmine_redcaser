var SuiteDialog = (function () {
  var self = {};

  // build :: -> DOM
  self.build = function () {
    var node = document.createElement('div');
    node.classList.add('suite-dialog');

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

    this.openDialog(dialog);
  };

  self.forUpdate = function (dialog) {

    this.showDialog(dialog);
  };

  self.openDialog = function (dialog) {
    $(dialog).dialog('open');
  }

  return self;
})();
