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

    this.makeSuiteCasesSortable();
  };

  def.initializeBody = function () {
    if (this.body) {
      $('.suite-cases').sortable('destroy');
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
      node = TestSuite.build(element);

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
      node = TestCase.build(element);
    }
    else {
      console.log('Bad Node data:');
      console.log(element);
    }

    return node;
  };

  def.makeSuiteCasesSortable = function () {
    var cases = $('.suite-cases');

    cases.sortable({
      connectWith: '.suite-cases',
      handle:      '.case-drag',
      placeholder: 'suite-case-placeholder'
    });
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
