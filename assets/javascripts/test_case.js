var Redcaser = Redcaser || {};

Redcaser.TestCase = (function () {
  'use strict';

  // self :: Object
  var self = function (data) {
    this.id         = data.id;
    this.parent_id  = data.parent_id;
    this.project_id = data.project_id;
    this.issue_id   = data.issue_id;
    this.node       = data.node;
  };

  return self;
})();
