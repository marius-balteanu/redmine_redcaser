var Redcaser = Redcaser || {};

Redcaser.SuiteTree = (function () {
  'use strict';

  var self = function (data) {
    this.project_id = data.project_id;
    this.children   = data.children;
  };

  var def = self.prototype;

  // find :: String, Integer -> Object
  def.find = function (type, id) {

  }

  // create :: String, Object -> Object
  def.create = function (type, data) {

  }

  // update :: String, Integer, Object -> Object
  def.update = function (type, id, data) {

  }

  // delete :: String, Integer -> Object
  def.delete = function (type, data) {

  }

  return self;
})();
