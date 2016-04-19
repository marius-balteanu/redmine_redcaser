var TestSuiteTree = (function () {
  'use strict';

  // self :: DOM
  var self = function (root) {
    this.root   = root;
    this.header = null;
    this.body   = null;

    this.initialize();
  };

  var def = self.prototype;

  def.initialize = function () {
    this.createTestSuiteHeader();
    this.getTestSuiteData();
    this.addEventHandlers();
  };

  def.createTestSuiteHeader = function () {
    this.initializeHeader();

    var title   = this.buildHeaderTitle();
    var actions = this.buildHeaderActions();

    this.header.appendChild(title);
    this.header.appendChild(actions);
    this.root.appendChild(this.header);
  };

  // buildHeaderTitle :: -> DOM
  def.buildHeaderTitle = function () {
    var node = document.createElement('div');
    node.classList.add('tree-title');

    var text = document.createTextNode('Test Cases');
    node.appendChild(text);

    return node;
  };

  // buildHeaderActions :: -> DOM
  def.buildHeaderActions = function () {
    var node = document.createElement('div');
    node.classList.add('tree-actions');

    var text = document.createTextNode('Actions');
    node.appendChild(text);

    return node;
  };

  def.initializeHeader = function () {
    if (this.header) {
      this.root.removeChild(this.header);
    }

    this.header = document.createElement('div');
    this.header.classList.add('tree-header');
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
    this.initializeBody();

    var tree = this.buildTree(response);

    this.body.appendChild(tree);
    this.root.appendChild(this.body);
  };

  def.initializeBody = function () {
    if (this.body) {
      this.root.removeChild(this.body);
    }

    this.body = document.createElement('div');
    this.body.classList.add('tree-body');
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
    node.appendChild(this.buildSuiteHeaderLink(element));
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

  // buildSuiteHeaderLink :: Object -> DOM
  def.buildSuiteHeaderLink = function (element) {
    var node = document.createElement('span');
    node.classList.add('suite-link');

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

    var text = document.createTextNode('Add test case');

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
    node.appendChild(this.buildCaseLink(element));
    node.appendChild(this.buildCaseActions(element));

    return node;
  };

  // buildCaseNode :: Object -> DOM
  def.buildCaseNode = function (element) {
    var node = document.createElement('div');
    node.classList.add('suite-case');

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

  // buildCaseLink :: Object -> DOM
  def.buildCaseLink = function (element) {
    var node = document.createElement('span');
    node.classList.add('case-link');

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

  def.addEventHandlers = function () {
    var handlers = this.eventHandlers();

    handlers.forEach(this.addEventHandler.bind(this));
  };

  // eventHandlers :: -> [[String, String, (DOM -> *)]]
  def.eventHandlers = function () {
    return [
      ['click', 'suite-title', this.handleClick]
    ];
  }

  // addEventHandler :: [String, String, (DOM -> *)]
  def.addEventHandler = function (config) {
    this.root.addEventListener(config[0], function (event) {
      if (event.target.classList.contains(config[1])) {
        config[2].bind(this)(event);
      }
    }.bind(this))
  }

  def.handleClick = function (event) {
    var content = event.target.textContent;
    console.log(content);
  };

  return self;
})();
