var TestSuiteTree = (function () {
  'use strict';

  // self :: DOM
  var self = function (root) {
    this.root   = root;
    this.layout = null;

    this.initialize();
  };

  var def = self.prototype;

  def.initialize = function () {
    this.getTestSuiteData();
  };

  def.getTestSuiteData = function () {
    var request = $.ajax({
      dataType: 'json',
      method:   'GET',
      url:      'redcaser/testsuites'
    });

    request.done(this.createTestSuiteTree.bind(this));
    request.fail(this.handleTestSuiteError.bind(this));
  };

  // createTestSuiteTree :: Object
  def.createTestSuiteTree = function (response) {
    this.initializeLayout();

    var tree = this.buildTree(response);

    this.layout.appendChild(tree);
    this.root.appendChild(this.layout);
  };

  def.initializeLayout = function () {
    if (this.layout) {
      this.root.removeChild(this.layout);
    }

    this.layout = document.createElement('div');
    this.layout.classList.add('tree-layout');
  };

  // buildTree :: Object -> DOM
  def.buildTree = function (element) {
    var type = element.type;
    var node, suiteCases, suiteChildren;

    if (type === 'suite') {
      node = this.buildSuite(element);

      suiteCases    = node.getElementsByClassName('suite-cases')[0];
      suiteChildren = node.getElementsByClassName('suite-children')[0];

      element.children.forEach(function (child) {
        var childNode = this.buildTree(child);

        if (child.type === 'suite') {
          suiteChildren.appendChild(childNode);
        }
        else if (child.type === 'case') {
          suiteCases.appendChild(childNode);
        }
        else {
          console.log('Bad Child data:');
          console.log(child);
        }
      }.bind(this));
    }
    else if (type === 'case') {
      node = this.buildCase(element);
    }
    else {
      console.log('Bad Node data:');
      console.log(element);
    }

    return node;
  };

  // buildSuite :: Object
  def.buildSuite = function (element) {
    var node = document.createElement('div');
    node.classList.add('tree-suite');

    node.appendChild(this.buildSuiteTitle(element));
    node.appendChild(this.buildSuiteHeader(element));
    node.appendChild(this.buildSuiteCases(element));
    node.appendChild(this.buildSuiteFooter(element));
    node.appendChild(this.buildSuiteChildren(element));

    return node;
  };

  // buildSuiteTitle :: Object -> DOM
  def.buildSuiteTitle = function (element) {
    var node = document.createElement('div');
    node.classList.add('suite-title');

    var text = document.createTextNode(element.text);
    node.appendChild(text);

    return node;
  };

  // buildSuiteHeader :: Object -> DOM
  def.buildSuiteHeader = function (element) {
    var node = document.createElement('div');
    node.classList.add('suite-header');

    node.appendChild(this.buildSuiteHeaderDrag(element));
    node.appendChild(this.buildSuiteHeaderCheck(element));
    node.appendChild(this.buildSuiteHeaderId(element));
    node.appendChild(this.buildSuiteHeaderTitle(element));
    node.appendChild(this.buildSuiteHeaderActions(element));

    return node;
  };

  // buildSuiteHeaderDrag :: Object -> DOM
  def.buildSuiteHeaderDrag = function (element) {
    var node = document.createElement('span');
    node.classList.add('suite-drag');

    var text = document.createTextNode('D');
    node.appendChild(text);

    return node;
  };

  // buildSuiteHeaderCheck :: Object -> DOM
  def.buildSuiteHeaderCheck = function (element) {
    var node = document.createElement('span');
    node.classList.add('suite-check');

    var check  = document.createElement('input');
    check.type = 'checkbox';
    node.appendChild(check);

    return node;
  };

  // buildSuiteHeaderId :: Object -> DOM
  def.buildSuiteHeaderId = function (element) {
    var node = document.createElement('span');
    node.classList.add('suite-id');

    var text = document.createTextNode('ID');
    node.appendChild(text);

    return node;
  };

  // buildSuiteHeaderTitle :: Object -> DOM
  def.buildSuiteHeaderTitle = function (element) {
    var node = document.createElement('span');
    node.classList.add('suite-title');

    var text = document.createTextNode('Title');
    node.appendChild(text);

    return node;
  };

  // buildSuiteHeaderActions :: Object -> DOM
  def.buildSuiteHeaderActions = function (element) {
    var node = document.createElement('span');
    node.classList.add('suite-actions');

    var text = document.createTextNode('A');
    node.appendChild(text);

    return node;
  };

  // buildSuiteCases :: Object -> DOM
  def.buildSuiteCases = function (element) {
    var node = document.createElement('div');
    node.classList.add('suite-cases');

    return node;
  };

  // buildSuiteFooter :: Object -> DOM
  def.buildSuiteFooter = function (element) {
    var node = document.createElement('div');
    node.classList.add('suite-footer');

    var link    = document.createElement('a');
    link.href   = '/issues/new';
    link.target = '_blank';

    var text = document.createTextNode('Add test case stuff');

    link.appendChild(text);
    node.appendChild(link);

    return node;
  };

  // buildSuiteChildren :: Object -> DOM
  def.buildSuiteChildren = function (element) {
    var node = document.createElement('div');
    node.classList.add('suite-children');

    return node;
  };

  // buildCase :: Object
  def.buildCase = function (element) {
    var node = this.buildCaseNode(element);

    node.appendChild(this.buildCaseDrag(element));
    node.appendChild(this.buildCaseCheck(element));
    node.appendChild(this.buildCaseId(element));
    node.appendChild(this.buildCaseTitle(element));
    node.appendChild(this.buildCaseActions(element));

    return node;
  };

  // buildCaseNode :: Object -> DOM
  def.buildCaseNode = function (element) {
    var node = document.createElement('div');
    node.classList.add('tree-case');

    return node;
  };

  // buildCaseDrag :: Object -> DOM
  def.buildCaseDrag = function (element) {
    var node = document.createElement('span');
    node.classList.add('case-drag');

    var text = document.createTextNode('d');
    node.appendChild(text);

    return node;
  };

  // buildCaseCheck :: Object -> DOM
  def.buildCaseCheck = function (element) {
    var node = document.createElement('span');
    node.classList.add('case-check');

    var check  = document.createElement('input');
    check.type = 'checkbox';
    node.appendChild(check);

    return node;
  };

  // buildCaseId :: Object -> DOM
  def.buildCaseId = function (element) {
    var node = document.createElement('span');
    node.classList.add('case-id');

    var text = document.createTextNode(element.issue_id);
    node.appendChild(text);

    return node;
  };

  // buildCaseTitle :: Object -> DOM
  def.buildCaseTitle = function (element) {
    var node = document.createElement('span');
    node.classList.add('case-title');

    var link    = document.createElement('a');
    link.href   = '/issues/' + element.issue_id;
    link.target = '_blank';

    var text = document.createTextNode(element.text);

    link.appendChild(text);
    node.appendChild(link);

    return node;
  };

  // buildCaseActions :: Object -> DOM
  def.buildCaseActions = function (element) {
    var node = document.createElement('span');
    node.classList.add('case-actions');

    var text = document.createTextNode('a');
    node.appendChild(text);

    return node;
  };

  // buildTestSuiteTree :: Object
  def.handleTestSuiteError = function (response) {
    console.log('Error!');
  };

  return self;
})();
