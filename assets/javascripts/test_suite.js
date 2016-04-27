var TestSuite = (function () {
  'use strict';

  // self :: Object
  var self = function (data) {
    this.id       = data.id;
    this.name     = data.name;
    this.node     = data.node;
    this.children = data.children;
  }
})();
