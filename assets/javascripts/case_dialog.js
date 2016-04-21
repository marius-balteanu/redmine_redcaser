var CaseDialog = (function () {
  var self = {};

  self.create = function (parent) {
    var dialog = this.buildDialog();

    parent.appendChild(dialog);

    this.initialize();
  };

  self.update = function () {

  };

  self.buildDialog = function () {
    var node = document.createElement('div');
    node.classList.add('case-dialog');

    return node;
  };

  self.initialize = function () {
    var params = {
      autoOpen: true,
      height:   300,
      width:    350,
      modal:    true
    };

    $('.case-dialog').dialog(params);
  };

  return self;
})();
