var TestCase = (function () {
  'use strict';

  var self = {};

  // build :: Object -> DOM
  self.build = function (element) {
    var node = this.buildCaseNode(element);

    node.appendChild(this.buildCaseDrag(element));
    node.appendChild(this.buildCaseCheck(element));
    node.appendChild(this.buildCaseId(element));
    node.appendChild(this.buildCaseLink(element));
    node.appendChild(this.buildCaseActions(element));

    return node;
  };

  // buildCaseNode :: Object -> DOM
  self.buildCaseNode = function (element) {
    var node = document.createElement('div');
    node.classList.add('suite-case');

    return node;
  };

  // buildCaseDrag :: Object -> DOM
  self.buildCaseDrag = function (element) {
    var node = document.createElement('span');
    node.classList.add('case-drag');

    var text = document.createTextNode('d');
    node.appendChild(text);

    return node;
  };

  // buildCaseCheck :: Object -> DOM
  self.buildCaseCheck = function (element) {
    var node = document.createElement('span');
    node.classList.add('case-check');

    var check  = document.createElement('input');
    check.type = 'checkbox';
    node.appendChild(check);

    return node;
  };

  // buildCaseId :: Object -> DOM
  self.buildCaseId = function (element) {
    var node = document.createElement('span');
    node.classList.add('case-id');

    var text = document.createTextNode(element.issue_id);
    node.appendChild(text);

    return node;
  };

  // buildCaseLink :: Object -> DOM
  self.buildCaseLink = function (element) {
    var node = document.createElement('span');
    node.classList.add('case-link');


    node.appendChild(this.buildCaseLinkText(element));
    node.appendChild(this.buildCaseLinkEdit(element));

    return node;
  };

  self.buildCaseLinkText = function (element) {
    var node    = document.createElement('a');
    node.href   = '/issues/' + element.issue_id;
    node.target = '_blank';

    var text = document.createTextNode(element.text);

    node.appendChild(text);

    return node;
  };

  self.buildCaseLinkEdit = function (element) {
    var node = document.createElement('button');
    node.classList.add('case-link-edit');

    var text = document.createTextNode('Edit');

    node.appendChild(text);

    return node;
  };

  // buildCaseActions :: Object -> DOM
  self.buildCaseActions = function (element) {
    var node = document.createElement('span');
    node.classList.add('case-actions');

    node.appendChild(this.buildCaseActionEdit());
    node.appendChild(this.buildCaseActionDelete());
    node.appendChild(this.buildCaseActionView());

    return node;
  };

  self.buildCaseActionEdit = function (element) {
    var node = document.createElement('button');
    node.classList.add('case-actions-edit');

    var text = document.createTextNode('Edit');

    node.appendChild(text);

    return node;
  };

  self.buildCaseActionDelete = function (element) {
    var node = document.createElement('button');
    node.classList.add('case-actions-delete');

    var text = document.createTextNode('Delete');

    node.appendChild(text);

    return node;
  };

  self.buildCaseActionView = function (element) {
    var node = document.createElement('button');
    node.classList.add('case-actions-view');

    var text = document.createTextNode('View');

    node.appendChild(text);

    return node;
  };

  return self;
})();
